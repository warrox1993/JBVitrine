import { test, expect } from "@playwright/test";

const pages = [
  { url: "/", name: "Homepage" },
  { url: "/contact", name: "Contact" },
  { url: "/blog", name: "Blog" },
  { url: "/services", name: "Services" },
  { url: "/admin/login", name: "Admin Login" },
  { url: "/blog/securiser-application-web-owasp-belgique", name: "Blog Article" },
];

pages.forEach(({ url, name }) => {
  test(`${name} (${url}) - Should load without console errors`, async ({
    page,
  }) => {
    const errors = [];
    const warnings = [];

    // Capture console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(`[ERROR] ${msg.text()}`);
      }
      if (msg.type() === "warning") {
        warnings.push(`[WARN] ${msg.text()}`);
      }
    });

    // Capture page errors
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
