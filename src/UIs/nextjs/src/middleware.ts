import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  "/admin",
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
 */
export function middleware(request: NextRequest) {
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

  // 4. Add security headers to response
  const response = NextResponse.next();

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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)",
  ],
};
