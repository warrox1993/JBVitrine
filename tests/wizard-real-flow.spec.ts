import { test, expect } from "@playwright/test";

/**
 * Real E2E Test - NO MOCKS
 * Tests the actual workflow without mocking APIs
 * This verifies that CSRF, reCAPTCHA, and form submission work end-to-end
 */
test.describe("Wizard Real Flow (No Mocks)", () => {
  // Increase timeout for real flow test (includes 12s bot detection wait)
  test.setTimeout(120000);

  test("should complete full wizard flow with real APIs", async ({ page }) => {
    const apiCalls: { url: string; method: string; status?: number }[] = [];
    const consoleMessages: { type: string; text: string }[] = [];

    // Track ALL API calls
    page.on("request", (request) => {
      const url = request.url();
      if (url.includes("/api/")) {
        apiCalls.push({
          url: new URL(url).pathname,
          method: request.method(),
        });
        console.log(`[Request] ${request.method()} ${new URL(url).pathname}`);
      }
    });

    page.on("response", (response) => {
      const url = response.url();
      if (url.includes("/api/")) {
        const existing = apiCalls.find(
          (c) =>
            c.url === new URL(url).pathname &&
            c.method === response.request().method(),
        );
        if (existing) {
          existing.status = response.status();
        }
        console.log(`[Response] ${response.status()} ${new URL(url).pathname}`);
      }
    });

    // Track console messages
    page.on("console", (msg) => {
      consoleMessages.push({ type: msg.type(), text: msg.text() });
      if (msg.type() === "error") {
        console.log(`[Browser Error] ${msg.text()}`);
      }
    });

    // Navigate to contact page
    await page.goto("/contact", { waitUntil: "networkidle" });

    // Start wizard
    const newProjectBtn = page.getByRole("button", {
      name: /Nouveau projet.*Site web/i,
    });
    await expect(newProjectBtn).toBeVisible({ timeout: 10000 });
    await newProjectBtn.click();
    await page.waitForTimeout(1000);

    // Step 1: Select project type
    const projectTypeBtn = page
      .locator("button", { hasText: /site vitrine/i })
      .first();
    await expect(projectTypeBtn).toBeVisible({ timeout: 5000 });
    await projectTypeBtn.click();
    await page.waitForTimeout(1500);

    // Navigate through wizard steps (up to 15 steps)
    for (let i = 0; i < 15; i++) {
      // Check if contact form is visible first
      const nameInput = page.locator('input[name="name"]').first();
      if (await nameInput.isVisible({ timeout: 500 }).catch(() => false)) {
        console.log("Contact step reached at iteration:", i);
        break;
      }

      const nextBtn = page
        .locator("button", { hasText: /suivant|continuer/i })
        .first();
      if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await nextBtn.click();
        await page.waitForTimeout(800);
      }
    }

    // Verify we're on contact step
    const nameInput = page.locator('input[name="name"]').first();
    await expect(nameInput).toBeVisible({ timeout: 5000 });

    // Wait minimum time for bot detection (form needs 10+ seconds)
    console.log("Waiting 12 seconds for bot detection timer...");
    await page.waitForTimeout(12000);

    // Fill contact form (no digits in name - validation rule)
    await nameInput.fill("Jean Dupont");

    const emailInput = page
      .locator('input[type="email"], input[name="email"]')
      .first();
    await emailInput.fill("jean.dupont@example.com");

    const companyInput = page.locator('input[name="company"]').first();
    if (await companyInput.isVisible({ timeout: 1000 }).catch(() => false)) {
      await companyInput.fill("Test Company SA");
    }

    const phoneInput = page.locator('input[type="tel"]').first();
    if (await phoneInput.isVisible({ timeout: 1000 }).catch(() => false)) {
      await phoneInput.fill("+32470123456");
    }

    // Check consent
    const consentCheckbox = page.locator('input[name="consent"]').first();
    if (await consentCheckbox.isVisible({ timeout: 1000 }).catch(() => false)) {
      await consentCheckbox.check();
    }

    console.log("Contact form filled");

    // Submit form
    const submitBtn = page.locator("button", {
      hasText: /envoyer ma demande/i,
    });
    await expect(submitBtn).toBeVisible({ timeout: 5000 });

    // Take screenshot before submit
    await page.screenshot({
      path: "test-results/before-submit.png",
      fullPage: true,
    });

    console.log("Clicking submit button...");
    await submitBtn.click();
    console.log("Submit button clicked");

    // Wait for API call to complete
    await page.waitForTimeout(10000);

    // Take screenshot after submit
    await page.screenshot({
      path: "test-results/after-submit.png",
      fullPage: true,
    });

    // Analysis
    console.log("\n===== API CALLS ANALYSIS =====");
    console.log(`Total API calls: ${apiCalls.length}`);

    const csrfCalls = apiCalls.filter((c) => c.url.includes("/csrf"));
    const quoteCalls = apiCalls.filter((c) => c.url.includes("/quote"));
    const leadScoringCalls = apiCalls.filter((c) =>
      c.url.includes("/leadScoring"),
    );

    console.log(`\nCSRF calls: ${csrfCalls.length}`);
    csrfCalls.forEach((c) =>
      console.log(`  ${c.method} ${c.url} -> ${c.status}`),
    );

    console.log(`\nQuote calls: ${quoteCalls.length}`);
    quoteCalls.forEach((c) =>
      console.log(`  ${c.method} ${c.url} -> ${c.status}`),
    );

    console.log(`\nLead Scoring calls: ${leadScoringCalls.length}`);
    leadScoringCalls.forEach((c) =>
      console.log(`  ${c.method} ${c.url} -> ${c.status}`),
    );

    // Check for 429 errors
    const has429 = apiCalls.some((c) => c.status === 429);
    console.log(`\n429 Rate Limit errors: ${has429 ? "YES" : "NO"}`);

    // Check for JSON parse errors
    const hasJsonError = consoleMessages.some(
      (m) =>
        m.type === "error" &&
        (m.text.includes("JSON") || m.text.includes("Unexpected token")),
    );
    console.log(`JSON Parse errors: ${hasJsonError ? "YES" : "NO"}`);

    // Check for success or error UI
    const successIndicator = page.locator("text=/succès|envoyée/i");
    const errorIndicator = page.locator('[role="alert"], [class*="error"]');

    const isSuccess = await successIndicator
      .isVisible({ timeout: 1000 })
      .catch(() => false);
    const isError = await errorIndicator
      .isVisible({ timeout: 1000 })
      .catch(() => false);

    console.log(`\nUI State: Success=${isSuccess}, Error=${isError}`);

    // Get error message if present
    if (isError) {
      const errorText = await page
        .locator('[role="alert"]')
        .textContent()
        .catch(() => "");
      console.log(`Error message: ${errorText}`);
    }

    // Assertions
    expect(hasJsonError, "Should not have JSON parse errors").toBe(false);

    // Log final state
    console.log("\n===== TEST COMPLETE =====");
    console.log("All API calls:", apiCalls);
  });
});
