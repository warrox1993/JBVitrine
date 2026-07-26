/**
 * NextAuth Configuration (v4)
 * Provides authentication for admin routes
 */

import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as bcrypt from "bcryptjs";
import {
  loginLimiter,
  getClientIdentifierFromHeaders,
} from "@/lib/rate-limit-redis";
import { headers } from "next/headers";

let _sql: NeonQueryFunction<false, false> | null = null;
function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");
  _sql = neon(url);
  return _sql;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "sales" | "viewer";
  isActive: boolean;
}

/**
 * SECURITY (V-W6): constant dummy bcrypt hash (of a random string) used to run
 * an equivalent bcrypt.compare when the account does not exist, so that
 * response timing does not reveal whether an email is registered (account
 * enumeration via timing side-channel). This is a real bcrypt hash that no user
 * password will ever match.
 *
 * It MUST use the same cost as real password hashes (see BCRYPT_COST in
 * ./bcrypt-cost). At cost 10 against real hashes at cost 12, the "unknown
 * account" path ran ~4x faster and the timing channel it was meant to close
 * stayed wide open. Regenerate with:
 *   node -e "const b=require('bcryptjs');console.log(b.hashSync(require('crypto').randomBytes(32).toString('hex'),12))"
 */
const DUMMY_BCRYPT_HASH =
  "$2b$12$d.YNce6UO3dqVoQS6xbs7OPZAyNtaTWN4ew8ayq3tLP6Of8jkJoIi";

/**
 * How often (ms) to re-validate the user's is_active/role against the DB inside
 * the JWT callback. Guards against a DB hit on every request while still
 * revoking access shortly after an account is deactivated/downgraded.
 */
const JWT_REVALIDATE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Apply rate limiting.
        // SECURITY (V-W6): fail CLOSED. The "too many attempts" case must
        // bubble up. Any OTHER failure (e.g. Redis unreachable) must ALSO stop
        // authentication instead of silently proceeding — otherwise an attacker
        // who can knock out Redis would disable brute-force protection.
        try {
          const headersList = await headers();
          // AVAILABILITY (bug 429): resolve the identifier through the shared
          // helper. The previous `|| "unknown"` fallback funnelled EVERY
          // unattributable attempt into the single bucket
          // `smidjan_v3_login:login_unknown` (5 per 15 min for the whole
          // world), so once six such attempts landed, the admin was refused
          // "Trop de tentatives" on their very first try. The helper hands out a
          // per-request bucket instead of a shared constant one.
          const ip = getClientIdentifierFromHeaders((name) =>
            headersList.get(name),
          );

          const { success } = await loginLimiter.limit(`login_${ip}`);

          if (!success) {
            throw new Error("Trop de tentatives de connexion. Veuillez patienter 15 minutes.");
          }
        } catch (rateError: any) {
          if (rateError?.message?.includes("Trop de tentatives")) {
            throw rateError; // Bubble up for NextAuth (429-style)
          }
          // Non-rate-limit error (Redis down, etc.): FAIL CLOSED.
          console.error("Rate limit check failed (failing closed):", rateError);
          throw new Error(
            "Service d'authentification temporairement indisponible. Veuillez réessayer.",
          );
        }

        try {
          // Fetch user from database
          const users = await getSql()`
            SELECT id, email, name, password_hash, role, is_active
            FROM users
            WHERE email = ${credentials.email}
          `;

          if (users.length === 0) {
            console.log("❌ User not found:", credentials.email);
            // SECURITY (V-W6): run an equivalent bcrypt.compare against a
            // constant dummy hash so the "user not found" path takes roughly
            // the same time as the "wrong password" path. Prevents account
            // enumeration via response-timing side-channel.
            await bcrypt.compare(
              credentials.password as string,
              DUMMY_BCRYPT_HASH,
            );
            return null;
          }

          const user = users[0];

          // Verify password FIRST.
          // SECURITY: the is_active check used to short-circuit here, returning
          // without running bcrypt.compare. That made a deactivated account
          // answer ~100 ms faster than a wrong password, which is enough to
          // enumerate deactivated accounts by timing. Always pay the bcrypt
          // cost before branching on account state.
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password_hash as string,
          );

          if (!isValid) {
            console.log("❌ Invalid password for:", credentials.email);
            return null;
          }

          // Check if user is active (after the constant-cost password check).
          if (!user.is_active) {
            console.log("❌ User is inactive:", credentials.email);
            return null;
          }

          // Update last login
          await getSql()`
            UPDATE users
            SET last_login = NOW()
            WHERE id = ${user.id}
          `;

          console.log("✅ User authenticated:", credentials.email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isActive: user.is_active,
          } as any;
        } catch (error) {
          console.error("❌ Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, seed the token from the authorized user.
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.isActive = (user as any).isActive;
        token.revalidatedAt = Date.now();
        return token;
      }

      // SECURITY (V-W6): periodically re-read is_active/role from the DB so
      // that a deactivated or downgraded account loses access without waiting
      // for the whole token to expire. Guarded by a timestamp so we do at most
      // one DB hit per JWT_REVALIDATE_INTERVAL_MS, not one per request.
      const lastCheck = (token.revalidatedAt as number) || 0;
      if (token.id && Date.now() - lastCheck > JWT_REVALIDATE_INTERVAL_MS) {
        try {
          const rows = await getSql()`
            SELECT role, is_active
            FROM users
            WHERE id = ${token.id as string}
          `;
          if (rows.length === 0) {
            // Account no longer exists → mark inactive; requireAuth rejects.
            token.isActive = false;
          } else {
            token.role = rows[0].role;
            token.isActive = rows[0].is_active;
          }
          token.revalidatedAt = Date.now();
        } catch (error) {
          // DB transiently unavailable: keep existing claims and retry on the
          // next request (do NOT advance the timestamp). Avoids logging
          // everyone out on a blip; requireAuth still enforces role/isActive.
          console.error("JWT revalidation failed (keeping prior claims):", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user info to session
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).isActive = token.isActive as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    // SECURITY (V-W6): reduced from 24h to 2h to shrink the window in which a
    // revoked/deactivated account could keep a valid session, complementing the
    // periodic JWT revalidation above.
    maxAge: 2 * 60 * 60, // 2 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy: Record<string, number> = {
    viewer: 1,
    sales: 2,
    admin: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Get current user from session (for server components)
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  return session?.user as User | null;
}

/**
 * Require authentication (throws if not authenticated)
 */
export async function requireAuth(
  requiredRole: string = "viewer",
): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized: No active session");
  }

  // SECURITY (V-W6): reject sessions whose backing account has been
  // deactivated (kept fresh by the periodic JWT revalidation).
  if (!user.isActive) {
    throw new Error("Unauthorized: account inactive");
  }

  if (!hasRole(user.role, requiredRole)) {
    throw new Error(
      `Forbidden: Requires ${requiredRole} role, but user has ${user.role}`,
    );
  }

  return user;
}
