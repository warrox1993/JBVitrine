import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Console errors that CANNOT be avoided when running against a local
 * `next start`, and which therefore say nothing about the code under test.
 *
 * Vercel serves /_vercel/insights/script.js and /_vercel/speed-insights/script.js
 * from its own edge; locally they 404, the 404 HTML is then rejected as a
 * script, and `upgrade-insecure-requests` in the CSP retries the URL over https
 * on a plain-http dev server. All three are environment artifacts — Vercel's own
 * message even says "deploy again".
 *
 * The list is deliberately NARROW: anything else (hydration mismatches, CSP
 * violations, real runtime errors) must still fail the suite. Widening it would
 * silently disarm the only check that would catch, say, a broken CSP nonce.
 */
const LOCALHOST_ONLY_ERRORS = [
  /_vercel\/(insights|speed-insights)\/script\.js/,
  /Refused to execute script from '[^']*\/_vercel\//,
  /net::ERR_SSL_PROTOCOL_ERROR/,
];

/**
 * URLs whose failure is expected locally. Needed because Chrome's generic
 * "Failed to load resource: the server responded with a status of 404" message
 * carries no URL — only `msg.location()` does. Matching on the location keeps
 * the filter tied to those two specific endpoints: a 404 on any real asset
 * still fails the suite.
 */
const LOCALHOST_ONLY_URLS = [/\/_vercel\/(insights|speed-insights)\//];

/** True when this console error is a known local-environment artifact. */
function isLocalhostArtifact(text, url = "") {
  return (
    LOCALHOST_ONLY_ERRORS.some((re) => re.test(text)) ||
    (!!url && LOCALHOST_ONLY_URLS.some((re) => re.test(url)))
  );
}

/**
 * Some pages cannot render at all without server configuration:
 *   /admin/login  → next-auth throws NO_SECRET without NEXTAUTH_SECRET (500)
 *   /contact      → the reCAPTCHA loader logs an error without
 *                   NEXT_PUBLIC_RECAPTCHA_SITE_ID
 *
 * They are SKIPPED (not filtered) when no local env file is present, with the
 * reason printed. A test that cannot run is not a test that failed — and a gate
 * that is permanently red is a gate everyone learns to bypass. With a real
 * .env.local these pages run under the exact same strict assertions as the rest.
 */
const hasLocalEnv =
  existsSync(resolve(process.cwd(), ".env.local")) ||
  existsSync(resolve(process.cwd(), ".env"));

const pages = [
  { url: "/", name: "Homepage" },
  { url: "/contact", name: "Contact", needsEnv: "NEXT_PUBLIC_RECAPTCHA_SITE_ID" },
  { url: "/blog", name: "Blog" },
  { url: "/services", name: "Services" },
  { url: "/admin/login", name: "Admin Login", needsEnv: "NEXTAUTH_SECRET" },
  { url: "/blog/securiser-application-web-owasp-belgique", name: "Blog Article" },
];

pages.forEach(({ url, name, needsEnv }) => {
  test(`${name} (${url}) - Should load without console errors`, async ({
    page,
  }) => {
    test.skip(
      !!needsEnv && !hasLocalEnv,
      `Nécessite ${needsEnv} : aucun .env.local / .env trouvé. Copiez .env.example et renseignez-le pour exécuter ce test.`,
    );

    const errors = [];
    const warnings = [];
    const ignored = [];

    // Capture console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        const url = msg.location()?.url ?? "";
        if (isLocalhostArtifact(text, url)) {
          ignored.push(`[IGNORED] ${text} @ ${url}`);
        } else {
          errors.push(`[ERROR] ${text}${url ? ` @ ${url}` : ""}`);
        }
      }
      if (msg.type() === "warning") {
        warnings.push(`[WARN] ${msg.text()}`);
      }
    });

    // Capture page errors — never filtered: an uncaught exception is always real.
    page.on("pageerror", (error) => {
      errors.push(`[PAGE ERROR] ${error.message}`);
    });

    // Navigate to page
    const response = await page.goto(`http://localhost:3000${url}`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Check HTTP status
    expect(response.status()).toBe(200);

    // Wait a bit for any lazy-loaded scripts
    await page.waitForTimeout(2000);

    // Report results
    console.log(`\n✅ ${name} (${url})`);
    console.log(`   Status: ${response.status()}`);
    console.log(`   Errors: ${errors.length}`);
    console.log(`   Warnings: ${warnings.length}`);
    console.log(`   Ignorées (artefacts localhost): ${ignored.length}`);

    if (errors.length > 0) {
      console.log(`\n   ❌ Console Errors:`);
      errors.forEach((err) => console.log(`      ${err}`));
    }

    if (warnings.length > 0) {
      console.log(`\n   ⚠️  Warnings:`);
      warnings.forEach((warn) => console.log(`      ${warn}`));
    }

    // Fail test if there are errors
    expect(
      errors.length,
      `Found ${errors.length} console errors on ${name}`,
    ).toBe(0);
  });
});
