/**
 * NextAuth Configuration (v4)
 * Provides authentication for admin routes
 */

import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import * as bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "sales" | "viewer";
  isActive: boolean;
}

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

        try {
          // Fetch user from database
          const users = await sql`
            SELECT id, email, name, password_hash, role, is_active
            FROM users
            WHERE email = ${credentials.email}
          `;

          if (users.length === 0) {
            console.log("❌ User not found:", credentials.email);
            return null;
          }

          const user = users[0];

          // Check if user is active
          if (!user.is_active) {
            console.log("❌ User is inactive:", credentials.email);
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password_hash as string,
          );

          if (!isValid) {
            console.log("❌ Invalid password for:", credentials.email);
            return null;
          }

          // Update last login
          await sql`
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
      // Add user info to JWT token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.isActive = (user as any).isActive;
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
    maxAge: 24 * 60 * 60, // 24 hours
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

  if (!hasRole(user.role, requiredRole)) {
    throw new Error(
      `Forbidden: Requires ${requiredRole} role, but user has ${user.role}`,
    );
  }

  return user;
}
