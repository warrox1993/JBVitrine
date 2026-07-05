import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// List of suspicious user agents (common bots, scanners)
const SUSPICIOUS_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "nmap",
  "masscan",
  "nessus",
  "metasploit",
  "burpsuite",
  "acunetix",
  "havij",
  "zgrab",
  "python-requests", // Often used by scrapers
  "scrapy",
  "curl", // Block raw curl in production (uncomment if needed)
];

// List of suspicious paths (common attack patterns)
const SUSPICIOUS_PATHS = [
  "/wp-admin",
  "/phpmyadmin",
  "/.env",
  // "/admin", - Removed, protected by authentication instead
  "/xmlrpc.php",
  "/.git",
  "/config",
  "/backup",
  "/sql",
  "eval(",
  "<script",
  "javascript:",
  "onload=",
  "onerror=",
];

/**
 * Security Middleware
 * Runs on every request to add security headers and block malicious traffic
 * Also handles authentication for admin routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  // 1. Block suspicious user agents
  const isSuspiciousAgent = SUSPICIOUS_USER_AGENTS.some((agent) =>
    userAgent.toLowerCase().includes(agent.toLowerCase()),
  );

  if (isSuspiciousAgent) {
    console.warn("Blocked suspicious user agent:", {
      userAgent,
      path: pathname,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    });
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Block suspicious paths (common attack vectors)
  const isSuspiciousPath = SUSPICIOUS_PATHS.some((pattern) =>
    pathname.toLowerCase().includes(pattern.toLowerCase()),
  );

  if (isSuspiciousPath) {
    console.warn("Blocked suspicious path:", {
      path: pathname,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: userAgent.substring(0, 100), // Limit logged UA length
    });
    return new NextResponse("Not Found", { status: 404 });
  }

  // 3. Block requests with suspicious query parameters
  const url = request.nextUrl;
  const queryString = url.search.toLowerCase();
  const hasSuspiciousQuery =
    queryString.includes("<script") ||
    queryString.includes("javascript:") ||
    queryString.includes("eval(") ||
    queryString.includes("base64_decode");

  if (hasSuspiciousQuery) {
    console.warn("Blocked suspicious query:", {
      query: queryString.substring(0, 200),
      path: pathname,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    });
    return new NextResponse("Bad Request", { status: 400 });
  }

  // 4. Authentication check for admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // Redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check role permissions
    if (pathname.startsWith("/admin/leads")) {
      const userRole = token.role as string;

      // Only admin and sales can access leads
      if (userRole === "viewer") {
        return new NextResponse(
          JSON.stringify({ error: "Forbidden: Insufficient permissions" }),
          { status: 403, headers: { "Content-Type": "application/json" } },
        );
      }
    }
  }

  // 5. Authentication check for admin API routes
  if (pathname.startsWith("/api/admin")) {
    // Skip digest endpoint (protected by CRON_SECRET)
    if (pathname === "/api/admin/leads/digest") {
      // Continue to next step
    } else {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        return new NextResponse(
          JSON.stringify({ error: "Unauthorized: Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      // Check role permissions for admin APIs
      const userRole = token.role as string;

      if (userRole === "viewer") {
        return new NextResponse(
          JSON.stringify({ error: "Forbidden: Insufficient permissions" }),
          { status: 403, headers: { "Content-Type": "application/json" } },
        );
      }
    }
  }

  // 6. Add security headers to response
  // Forward the pathname to Server Components (e.g. the admin layout) so
  // they can make routing decisions (like skipping the /admin/login route)
  // without relying on usePathname(), which is client-only.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add additional security headers not covered by next.config.ts
  response.headers.set("X-Request-ID", crypto.randomUUID());

  // Remove server information leakage
  response.headers.delete("X-Powered-By");

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest\\.json|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)",
  ],
};
