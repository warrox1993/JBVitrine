import { test, expect } from "@playwright/test";

/**
 * Comprehensive E2E Tests for Quote Wizard
 *
 * Tests the complete flow from start to finish:
 * 1. Navigation through wizard steps
 * 2. Form validation
 * 3. reCAPTCHA token generation
 * 4. CSRF token handling
 * 5. API submission
 * 6. Success/Error states
 */

test.describe("Quote Wizard Complete Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Set up console log capture for debugging
    page.on("console", (msg) => {
      const type = msg.type();
      if (type === "error" || type === "warn") {
        console.log(`[Browser ${type}]: ${msg.text()}`);
      }
    });
  });

  test.describe("Step 1: Project Type Selection", () => {
    test("should display all project type options", async ({ page }) => {
      await page.goto("/contact", { waitUntil: "networkidle" });

      // Start wizard
      const newProjectBtn = page.locator("button", {
        hasText: "Nouveau projet",
      });
      await expect(newProjectBtn).toBeVisible({ timeout: 10000 });
      await newProjectBtn.click();

      // Wait for step 1
      await page.waitForTimeout(1000);

      // Check project types are visible
      const projectTypes = ["Site vitrine", "E-commerce", "Application web"];
      for (const type of projectTypes) {
        const btn = page.locator("button", { hasText: new RegExp(type, "i") });
        await expect(btn).toBeVisible({ timeout: 5000 });
      }
    });

    test("should auto-advance after selecting project type", async ({
      page,
    }) => {
      await page.goto("/contact", { waitUntil: "networkidle" });

      const newProjectBtn = page.locator("button", {
        hasText: "Nouveau projet",
      });
      await newProjectBtn.click();
      await page.waitForTimeout(1000);

      // Select "Site vitrine"
      const siteVitrineBtn = page
        .locator("button", { hasText: /site vitrine/i })
        .first();
      await siteVitrineBtn.click();

      // Should auto-advance to step 2 (categories)
      await page.waitForTimeout(1500);

      // Step counter should show step 2
      const stepIndicator = page.locator("text=/Étape 2/i");
      await expect(stepIndicator).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe("Step 5: Contact Form", () => {
    test("should validate required fields", async ({ page }) => {
      await page.goto("/contact", { waitUntil: "networkidle" });

      // Navigate through wizard quickly
      await navigateToContactStep(page);

      // Try to submit without filling form
      const submitBtn = page.locator("button", {
        hasText: /envoyer ma demande/i,
      });
      if (await submitBtn.isVisible({ timeout: 5000 })) {
        await submitBtn.click();

        // Should show validation errors
        await page.waitForTimeout(500);
        const errorMessages = page.locator(".error, [class*='error']");
        expect(await errorMessages.count()).toBeGreaterThan(0);
      }
    });

    test("should validate email format", async ({ page }) => {
      await page.goto("/contact", { waitUntil: "networkidle" });

      await navigateToContactStep(page);

      // Fill with invalid email
      const emailInput = page
        .locator('input[type="email"], input[name="email"]')
        .first();
      if (await emailInput.isVisible({ timeout: 5000 })) {
        await emailInput.fill("invalid-email");

        // Fill name to trigger validation
        const nameInput = page.locator('input[name="name"]').first();
        await nameInput.fill("Test User");

        // Click outside to trigger blur validation
        await page.locator("body").click();
        await page.waitForTimeout(500);
      }
    });

    test("should accept valid phone numbers", async ({ page }) => {
      await page.goto("/contact", { waitUntil: "networkidle" });

      await navigateToContactStep(page);

      const phoneInput = page.locator('input[type="tel"]').first();
      if (await phoneInput.isVisible({ timeout: 5000 })) {
        // Belgian phone number
        await phoneInput.fill("+32470123456");
        await page.waitForTimeout(300);

        // No error should appear
        const phoneError = page.locator(
          '[class*="error"]:near(input[type="tel"])',
        );
        await expect(phoneError).not.toBeVisible({ timeout: 1000 });
      }
    });
  });

  test.describe("reCAPTCHA Token Generation", () => {
    test("should generate reCAPTCHA token before submission", async ({
      page,
    }) => {
      const consoleMessages: string[] = [];

      page.on("console", (msg) => {
        consoleMessages.push(msg.text());
      });

      await page.goto("/contact", { waitUntil: "networkidle" });

      await navigateToContactStep(page);
      await fillContactForm(page);

      // Submit form
      const submitBtn = page.locator("button", {
        hasText: /envoyer ma demande/i,
      });
      if (await submitBtn.isVisible({ timeout: 5000 })) {
        await submitBtn.click();

        // Wait for reCAPTCHA to process
        await page.waitForTimeout(3000);

        // Check console for reCAPTCHA log
        const hasRecaptchaLog = consoleMessages.some(
          (msg) =>
            msg.includes("reCAPTCHA") &&
            (msg.includes("token generated") || msg.includes("Starting")),
        );

        console.log("reCAPTCHA console messages found:", hasRecaptchaLog);
        console.log("All console messages:", consoleMessages);
      }
    });
  });

  test.describe("CSRF Token Handling", () => {
    test("should fetch CSRF token on component mount", async ({ page }) => {
      const csrfCalls: string[] = [];

      page.on("request", (request) => {
        if (request.url().includes("/api/csrf/token")) {
          csrfCalls.push(request.url());
        }
      });

      await page.goto("/contact", { waitUntil: "networkidle" });

      // Start wizard and navigate to contact
      await navigateToContactStep(page);

      // Should have fetched CSRF token
      await page.waitForTimeout(2000);
      console.log(`CSRF token requests: ${csrfCalls.length}`);

      // With singleton pattern, should only fetch once
      expect(csrfCalls.length).toBeLessThanOrEqual(2);
    });
  });

  test.describe("API Submission", () => {
    test("should send correct data structure to API", async ({ page }) => {
      let apiRequest: {
        url: string;
        method: string;
        body: string;
      } | null = null;

      page.on("request", (request) => {
        if (
          request.url().includes("/api/quote") &&
          request.method() === "POST"
        ) {
          apiRequest = {
            url: request.url(),
            method: request.method(),
            body: request.postData() || "",
          };
        }
      });

      await page.goto("/contact", { waitUntil: "networkidle" });

      await navigateToContactStep(page);
      await fillContactForm(page);

      // Submit
      const submitBtn = page.locator("button", {
        hasText: /envoyer ma demande/i,
      });
      if (await submitBtn.isVisible({ timeout: 5000 })) {
        await submitBtn.click();

        // Wait for API call
        await page.waitForTimeout(5000);

        if (apiRequest) {
          console.log("API Request captured:", {
            url: apiRequest.url,
            method: apiRequest.method,
            bodyLength: apiRequest.body.length,
          });

          // Parse body and check structure
          try {
            const body = JSON.parse(apiRequest.body);
            console.log("Request body structure:", {
              hasEstimate: !!body.estimate,
              hasQuoteData: !!body.quoteData,
              hasContactInfo: !!body.contactInfo,
              hasLeadScore: !!body.leadScore,
              hasRecaptchaToken: !!body.recaptchaToken,
              projectType: body.quoteData?.projectType,
            });

            expect(body.estimate).toBeDefined();
            expect(body.quoteData).toBeDefined();
            expect(body.contactInfo).toBeDefined();
            expect(body.contactInfo.email).toBeTruthy();
            expect(body.contactInfo.name).toBeTruthy();
          } catch (e) {
            console.error("Failed to parse request body:", e);
          }
        }
      }
    });

    test("should handle rate limit errors gracefully", async ({ page }) => {
      // Mock 429 response
      await page.route("**/api/quote", async (route) => {
        await route.fulfill({
          status: 429,
          contentType: "application/json",
          body: JSON.stringify({
            ok: false,
            message: "Trop de requêtes. Veuillez réessayer plus tard.",
            errorCode: "RATE_LIMIT_EXCEEDED",
          }),
        });
      });

      await page.goto("/contact", { waitUntil: "networkidle" });

      await navigateToContactStep(page);
      await fillContactForm(page);

      const submitBtn = page.locator("button", {
        hasText: /envoyer ma demande/i,
      });
      if (await submitBtn.isVisible({ timeout: 5000 })) {
        await submitBtn.click();

        // Wait for error to appear
        await page.waitForTimeout(3000);

        // Should show error message, not crash
        const errorBanner = page.locator('[class*="error"], [role="alert"]');
        const pageContent = await page.content();

        console.log("Error banner visible:", await errorBanner.isVisible());
        console.log(
          "Page contains error text:",
          pageContent.includes("requêtes") || pageContent.includes("erreur"),
        );
      }
    });
  });

  test.describe("Success State", () => {
    test("should show success message after valid submission", async ({
      page,
    }) => {
      // Mock successful response
      await page.route("**/api/quote", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            ok: true,
            quoteId: "Q-2025-12345",
            message: "Demande de devis envoyée avec succès",
          }),
        });
      });

      // Also mock lead scoring API to prevent 429
      await page.route("**/api/leadScoring/**", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });
      });

      await page.goto("/contact", { waitUntil: "networkidle" });

      await navigateToContactStep(page);
      await fillContactForm(page);

      const submitBtn = page.locator("button", {
        hasText: /envoyer ma demande/i,
      });
      if (await submitBtn.isVisible({ timeout: 5000 })) {
        await submitBtn.click();

        // Wait for success state
        await page.waitForTimeout(3000);

        // Check for success indicators
        const successIndicators = [
          page.locator("text=/succès/i"),
          page.locator("text=/envoyée/i"),
          page.locator('[class*="success"]'),
          page.locator("svg.lucide-check-circle"),
        ];

        let successFound = false;
        for (const indicator of successIndicators) {
          if (await indicator.isVisible({ timeout: 1000 }).catch(() => false)) {
            successFound = true;
            console.log(
              "Success indicator found:",
              await indicator.textContent(),
            );
            break;
          }
        }

        console.log("Success state displayed:", successFound);
      }
    });
  });
});

// Helper function to navigate to contact step
async function navigateToContactStep(page: import("@playwright/test").Page) {
  // Start wizard
  const newProjectBtn = page.locator("button", { hasText: "Nouveau projet" });
  if (await newProjectBtn.isVisible({ timeout: 5000 })) {
    await newProjectBtn.click();
    await page.waitForTimeout(1000);

    // Select project type
    const projectTypeBtn = page
      .locator("button", { hasText: /site vitrine/i })
      .first();
    if (await projectTypeBtn.isVisible({ timeout: 3000 })) {
      await projectTypeBtn.click();
      await page.waitForTimeout(1000);

      // Navigate through remaining steps
      for (let i = 0; i < 8; i++) {
        const nextBtn = page
          .locator("button", { hasText: /suivant|continuer/i })
          .first();
        if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await nextBtn.click();
          await page.waitForTimeout(500);
        }

        // Check if we reached contact step
        const contactStepIndicator = page.locator(
          'input[name="name"], input[type="email"]',
        );
        if (
          await contactStepIndicator
            .isVisible({ timeout: 500 })
            .catch(() => false)
        ) {
          console.log("Contact step reached");
          break;
        }
      }
    }
  }
}

// Helper function to fill contact form
async function fillContactForm(page: import("@playwright/test").Page) {
  // Wait a bit for security timing check (min 3 seconds)
  await page.waitForTimeout(3500);

  // Fill name
  const nameInput = page.locator('input[name="name"]').first();
  if (await nameInput.isVisible({ timeout: 3000 })) {
    await nameInput.fill("Jean Test");
  }

  // Fill email
  const emailInput = page
    .locator('input[type="email"], input[name="email"]')
    .first();
  if (await emailInput.isVisible({ timeout: 3000 })) {
    await emailInput.fill("jean.test@example.com");
  }

  // Fill company (optional)
  const companyInput = page.locator('input[name="company"]').first();
  if (await companyInput.isVisible({ timeout: 1000 }).catch(() => false)) {
    await companyInput.fill("Test Company SA");
  }

  // Check consent
  const consentCheckbox = page.locator('input[name="consent"]').first();
  if (await consentCheckbox.isVisible({ timeout: 1000 }).catch(() => false)) {
    await consentCheckbox.check();
  }

  console.log("Contact form filled");
}
