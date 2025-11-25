import { test, expect } from '@playwright/test';

test.describe('Full Quote Wizard E2E Test', () => {
  const errors: string[] = [];
  const apiErrors: { url: string; status: number; method: string }[] = [];

  test.beforeEach(async ({ page }) => {
    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Capture all API responses
    page.on('response', (response) => {
      if (response.status() >= 400) {
        apiErrors.push({
          url: response.url(),
          status: response.status(),
          method: response.request().method(),
        });
      }
    });
  });

  test('should complete full e-commerce wizard without 429 errors', async ({ page }) => {
    console.log('🧙 Starting full e-commerce wizard test...\n');

    // Navigate to contact page
    await page.goto('https://smidjan.be/contact', {
      waitUntil: 'networkidle',
    });

    console.log('✅ Page loaded');
    await page.waitForTimeout(2000);

    // Click "Nouveau projet" to start wizard
    const newProjectBtn = page.locator('button', { hasText: 'Nouveau projet' });
    await expect(newProjectBtn).toBeVisible({ timeout: 10000 });
    await newProjectBtn.click();
    console.log('✅ Clicked "Nouveau projet"');
    
    await page.waitForTimeout(1000);

    // Step 1: Select e-commerce project type
    const ecommerceBtn = page.locator('button', { hasText: /e-commerce/i }).first();
    await expect(ecommerceBtn).toBeVisible({ timeout: 10000 });
    await ecommerceBtn.click();
    console.log('✅ Selected E-commerce project type');
    
    await page.waitForTimeout(1000);

    // Click next/continue
    const nextBtn = page.locator('button', { hasText: /suivant|continuer/i }).first();
    if (await nextBtn.isVisible({ timeout: 2000 })) {
      await nextBtn.click();
      console.log('✅ Clicked Next');
      await page.waitForTimeout(1000);
    }

    // Step 2: Fill features (if present)
    // Try to check some checkboxes or select options
    const checkboxes = page.locator('input[type="checkbox"]').first();
    if (await checkboxes.isVisible({ timeout: 2000 })) {
      await checkboxes.check();
      console.log('✅ Selected features');
      
      const nextBtn2 = page.locator('button', { hasText: /suivant|continuer/i }).first();
      if (await nextBtn2.isVisible({ timeout: 2000 })) {
        await nextBtn2.click();
        await page.waitForTimeout(1000);
      }
    }

    // Step 3-4: Continue through other steps
    // Try to advance through multiple steps
    for (let i = 0; i < 3; i++) {
      const continueBtn = page.locator('button', { hasText: /suivant|continuer/i }).first();
      if (await continueBtn.isVisible({ timeout: 2000 })) {
        await continueBtn.click();
        console.log(`✅ Advanced to next step (${i + 1})`);
        await page.waitForTimeout(1000);
      }
    }

    // Final step: Fill contact form
    console.log('📝 Filling contact information...');
    
    const nameInput = page.locator('input[name="name"], input[placeholder*="nom" i]').first();
    if (await nameInput.isVisible({ timeout: 2000 })) {
      await nameInput.fill('Test User Playwright');
      console.log('✅ Filled name');
    }

    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    if (await emailInput.isVisible({ timeout: 2000 })) {
      await emailInput.fill('test-playwright@example.com');
      console.log('✅ Filled email');
      await page.waitForTimeout(500);
    }

    const companyInput = page.locator('input[name="company"], input[placeholder*="entreprise" i]').first();
    if (await companyInput.isVisible({ timeout: 2000 })) {
      await companyInput.fill('Test Company');
      console.log('✅ Filled company');
    }

    const phoneInput = page.locator('input[type="tel"], input[name="phone"]').first();
    if (await phoneInput.isVisible({ timeout: 2000 })) {
      await phoneInput.fill('+32471234567');
      console.log('✅ Filled phone');
    }

    // Wait for reCAPTCHA and other async operations
    await page.waitForTimeout(3000);

    // Check for 429 errors before submission
    const rateLimitsBefore = apiErrors.filter((e) => e.status === 429);
    console.log(`\n📊 429 errors before submission: ${rateLimitsBefore.length}`);
    if (rateLimitsBefore.length > 0) {
      console.log('❌ FAILED: Got 429 errors before even submitting:');
      rateLimitsBefore.forEach((e) => {
        console.log(`  - [${e.method}] ${e.url}`);
      });
    }

    // Try to submit
    const submitBtn = page.locator('button[type="submit"], button', { hasText: /envoyer|valider|soumettre/i }).first();
    if (await submitBtn.isVisible({ timeout: 2000 })) {
      console.log('\n🚀 Submitting form...');
      await submitBtn.click();
      
      // Wait for submission to complete
      await page.waitForTimeout(5000);
      
      console.log('✅ Form submitted');
    } else {
      console.log('⚠️  Submit button not found or not visible');
    }

    // Final check for 429 errors
    const rateLimitsAfter = apiErrors.filter((e) => e.status === 429);
    console.log(`\n📊 Total 429 errors during entire flow: ${rateLimitsAfter.length}`);
    
    if (rateLimitsAfter.length > 0) {
      console.log('\n❌ RATE LIMIT ERRORS DETECTED:');
      rateLimitsAfter.forEach((e, i) => {
        console.log(`  ${i + 1}. [${e.status}] [${e.method}] ${e.url}`);
      });
    } else {
      console.log('\n✅ NO RATE LIMIT ERRORS - SUCCESS!');
    }

    // Check for other errors
    console.log(`\n📊 Total console errors: ${errors.length}`);
    console.log(`📊 Total API failures: ${apiErrors.length}`);

    // Take final screenshot
    await page.screenshot({
      path: 'wizard-submission-test.png',
      fullPage: true,
    });
    console.log('\n📸 Screenshot saved: wizard-submission-test.png');

    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      success: rateLimitsAfter.length === 0,
      summary: {
        rateLimitErrors: rateLimitsAfter.length,
        totalApiErrors: apiErrors.length,
        consoleErrors: errors.length,
      },
      details: {
        rateLimitErrors: rateLimitsAfter,
        allApiErrors: apiErrors,
        consoleErrors: errors,
      },
    };

    const fs = require('fs');
    fs.writeFileSync(
      'wizard-e2e-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('📄 Report saved: wizard-e2e-report.json');

    // Assert no 429 errors
    expect(rateLimitsAfter.length, '429 Rate Limit errors should be 0').toBe(0);
  });
});
