import { test, expect } from '@playwright/test';

test.describe('Contact Page Audit', () => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const apiErrors: { url: string; status: number }[] = [];

  test.beforeEach(async ({ page }) => {
    // Capture console errors and warnings
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    // Capture failed network requests
    page.on('response', (response) => {
      if (response.status() >= 400) {
        apiErrors.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });
  });

  test('should load contact page and capture all errors', async ({ page }) => {
    console.log('🔍 Starting contact page audit...');

    // Navigate to contact page
    await page.goto('https://smidjan.be/contact', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for page to be fully loaded
    await page.waitForTimeout(3000);

    // Log all captured errors
    console.log('\n📋 AUDIT RESULTS:\n');

    console.log('❌ Console Errors:', errors.length);
    errors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.substring(0, 200)}`);
    });

    console.log('\n⚠️  Console Warnings:', warnings.length);
    warnings.forEach((warn, i) => {
      console.log(`  ${i + 1}. ${warn.substring(0, 200)}`);
    });

    console.log('\n🌐 Failed API Calls:', apiErrors.length);
    apiErrors.forEach((api, i) => {
      console.log(`  ${i + 1}. [${api.status}] ${api.url}`);
    });

    // Take screenshot for visual inspection
    await page.screenshot({
      path: 'contact-page-audit.png',
      fullPage: true,
    });

    console.log('\n📸 Screenshot saved: contact-page-audit.png');

    // Group errors by type
    const cspErrors = errors.filter((e) => e.includes('Content Security Policy'));
    const rateLimitErrors = apiErrors.filter((e) => e.status === 429);
    const blockedResources = errors.filter((e) => e.includes('ERR_BLOCKED_BY_CLIENT'));

    console.log('\n📊 Error Breakdown:');
    console.log(`  - CSP Violations: ${cspErrors.length}`);
    console.log(`  - Rate Limit (429): ${rateLimitErrors.length}`);
    console.log(`  - Blocked Resources: ${blockedResources.length}`);

    // Export detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalErrors: errors.length,
        totalWarnings: warnings.length,
        totalApiFailures: apiErrors.length,
        cspViolations: cspErrors.length,
        rateLimitErrors: rateLimitErrors.length,
        blockedResources: blockedResources.length,
      },
      details: {
        errors,
        warnings,
        apiErrors,
      },
    };

    // Write report to file
    const fs = require('fs');
    fs.writeFileSync(
      'contact-audit-report.json',
      JSON.stringify(report, null, 2)
    );

    console.log('\n📄 Detailed report saved: contact-audit-report.json');
  });

  test('should test quote wizard flow', async ({ page }) => {
    console.log('🧙 Testing quote wizard flow...');

    await page.goto('https://smidjan.be/contact', {
      waitUntil: 'networkidle',
    });

    // Click on "Nouveau projet" button
    const newProjectBtn = page.locator('button:has-text("Nouveau projet")');
    if (await newProjectBtn.isVisible({ timeout: 5000 })) {
      await newProjectBtn.click();
      console.log('✅ Clicked "Nouveau projet"');

      // Wait for wizard to load
      await page.waitForTimeout(2000);

      // Check for 429 errors after wizard load
      const wizardApiErrors = apiErrors.filter((e) => e.status === 429);
      console.log(`\n429 errors after wizard load: ${wizardApiErrors.length}`);
      wizardApiErrors.forEach((api) => {
        console.log(`  - ${api.url}`);
      });
    }

    await page.screenshot({
      path: 'wizard-state.png',
      fullPage: true,
    });
  });
});
