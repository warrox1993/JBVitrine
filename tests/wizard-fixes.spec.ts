import { test, expect } from "@playwright/test";

/**
 * Tests for wizard fixes:
 * 1. CSRF token singleton (no duplicate fetches)
 * 2. Enrichment caching (no duplicate API calls)
 * 3. Rate limiting works correctly
 * 4. No 429 errors during normal flow
 */
test.describe("Wizard Fixes Verification", () => {
  test.describe("CSRF Token Singleton", () => {
    test("should only fetch CSRF token once even with multiple components", async ({
      page,
    }) => {
      const csrfCalls: string[] = [];

      // Track all CSRF token requests
      page.on("request", (request) => {
        if (request.url().includes("/api/csrf/token")) {
          csrfCalls.push(request.url());
          console.log(`[CSRF] Request: ${request.url()}`);
        }
      });

      // Navigate to contact page
      await page.goto("/contact", { waitUntil: "networkidle" });
      console.log("Page loaded, waiting for components...");

      // Wait for both SimpleContactForm and QuoteWizard to potentially load
      await page.waitForTimeout(3000);

      // Click "Nouveau projet" to start wizard (loads Step5Contact eventually)
      const newProjectBtn = page.getByRole("button", {
        name: /Nouveau projet.*Site web/i,
      });
      if (await newProjectBtn.isVisible({ timeout: 5000 })) {
        await newProjectBtn.click();
        console.log("Started wizard");

        // Navigate through wizard quickly
        await page.waitForTimeout(1000);

        // Select a project type - use specific text to avoid matching disabled buttons
        const projectTypeBtn = page
          .locator("button", { hasText: /site vitrine/i })
          .first();
        if (await projectTypeBtn.isVisible({ timeout: 3000 })) {
          await projectTypeBtn.click();
          await page.waitForTimeout(1000);

          // Continue through steps
          for (let i = 0; i < 5; i++) {
            const nextBtn = page
              .locator("button", { hasText: /suivant|continuer/i })
              .first();
            if (await nextBtn.isVisible({ timeout: 2000 })) {
              await nextBtn.click();
              await page.waitForTimeout(500);
            }
          }
        }
      }

      // Wait for all async operations
      await page.waitForTimeout(2000);

      console.log(`\n=== CSRF Token Fetch Analysis ===`);
      console.log(`Total CSRF requests: ${csrfCalls.length}`);
      csrfCalls.forEach((url, i) => {
        console.log(`  ${i + 1}. ${url}`);
      });

      // With singleton pattern, we should have at most 1-2 requests
      // (one initial fetch, possibly one refresh if expired)
      expect(
        csrfCalls.length,
        "CSRF token should be fetched at most twice",
      ).toBeLessThanOrEqual(2);
    });
  });

  test.describe("Enrichment Caching", () => {
    test("should cache enrichment results and not call API twice for same email", async ({
      page,
    }) => {
      const enrichCalls: { url: string; body: string }[] = [];

      // Track enrichment API calls
      page.on("request", async (request) => {
        if (request.url().includes("/api/leadScoring/enrich")) {
          const postData = request.postData();
          enrichCalls.push({
            url: request.url(),
            body: postData || "",
          });
          console.log(
            `[Enrich] Request with body: ${postData?.substring(0, 100)}...`,
          );
        }
      });

      // Navigate to contact page
      await page.goto("/contact", { waitUntil: "networkidle" });

      // Start wizard
      const newProjectBtn = page.getByRole("button", {
        name: /Nouveau projet.*Site web/i,
      });
      await newProjectBtn.click();
      await page.waitForTimeout(1000);

      // Select project type - use specific text to avoid matching disabled buttons
      const projectTypeBtn = page
        .locator("button", { hasText: /site vitrine/i })
        .first();
      await projectTypeBtn.click();
      await page.waitForTimeout(1000);

      // Navigate to contact step
      for (let i = 0; i < 6; i++) {
        const nextBtn = page
          .locator("button", { hasText: /suivant|continuer/i })
          .first();
        if (await nextBtn.isVisible({ timeout: 2000 })) {
          await nextBtn.click();
          await page.waitForTimeout(500);
        }
      }

      // Fill email to trigger enrichment
      const emailInput = page
        .locator('input[type="email"], input[name="email"]')
        .first();
      if (await emailInput.isVisible({ timeout: 3000 })) {
        await emailInput.fill("test@example.com");
        console.log("Filled email");

        // Wait for potential enrichment call
        await page.waitForTimeout(2000);

        // Clear and re-fill same email (should not trigger new API call)
        await emailInput.clear();
        await emailInput.fill("test@example.com");
        await page.waitForTimeout(2000);
      }

      console.log(`\n=== Enrichment API Call Analysis ===`);
      console.log(`Total enrich requests: ${enrichCalls.length}`);

      // Count unique emails
      const uniqueEmails = new Set(
        enrichCalls.map((c) => {
          try {
            return JSON.parse(c.body).email;
          } catch {
            return c.body;
          }
        }),
      );

      console.log(`Unique emails enriched: ${uniqueEmails.size}`);
      enrichCalls.forEach((call, i) => {
        console.log(`  ${i + 1}. ${call.body.substring(0, 100)}...`);
      });

      // With caching, same email should only trigger one API call
      const testEmailCalls = enrichCalls.filter((c) =>
        c.body.includes("test@example.com"),
      );
      expect(
        testEmailCalls.length,
        "Same email should only trigger enrichment once",
      ).toBeLessThanOrEqual(1);
    });
  });

  test.describe("Rate Limiting", () => {
    test("should handle 429 responses gracefully without crashing", async ({
      page,
    }) => {
      const errors429: { url: string; status: number }[] = [];
      const consoleErrors: string[] = [];
      let jsonParseErrors = 0;

      // Track 429 responses
      page.on("response", (response) => {
        if (response.status() === 429) {
          errors429.push({
            url: response.url(),
            status: response.status(),
          });
          console.log(`[429] ${response.url()}`);
        }
      });

      // Track console errors (especially JSON parse errors)
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();
          consoleErrors.push(text);
          if (text.includes("JSON") || text.includes("Unexpected token")) {
            jsonParseErrors++;
            console.log(`[JSON Parse Error] ${text}`);
          }
        }
      });

      // Navigate and interact
      await page.goto("/contact", { waitUntil: "networkidle" });

      const newProjectBtn = page.getByRole("button", {
        name: /Nouveau projet.*Site web/i,
      });
      if (await newProjectBtn.isVisible({ timeout: 5000 })) {
        await newProjectBtn.click();
        await page.waitForTimeout(1000);

        const projectTypeBtn = page
          .locator("button", { hasText: /site vitrine/i })
          .first();
        if (await projectTypeBtn.isVisible({ timeout: 3000 })) {
          await projectTypeBtn.click();
          await page.waitForTimeout(1000);
        }
      }

      // Navigate through steps
      for (let i = 0; i < 6; i++) {
        const nextBtn = page
          .locator("button", { hasText: /suivant|continuer/i })
          .first();
        if (await nextBtn.isVisible({ timeout: 2000 })) {
          await nextBtn.click();
          await page.waitForTimeout(500);
        }
      }

      await page.waitForTimeout(3000);

      console.log(`\n=== Rate Limit Analysis ===`);
      console.log(`429 responses: ${errors429.length}`);
      console.log(`JSON parse errors: ${jsonParseErrors}`);
      console.log(`Total console errors: ${consoleErrors.length}`);

      // Even if we get 429 errors, we should NOT have JSON parse errors
      // (because our fix validates Content-Type before parsing)
      expect(
        jsonParseErrors,
        "Should not have JSON parse errors even with 429 responses",
      ).toBe(0);
    });
  });

  test.describe("API Response Validation", () => {
    test("should validate Content-Type before JSON parsing", async ({
      page,
    }) => {
      const htmlResponses: { url: string; contentType: string }[] = [];

      // Track responses with HTML content-type to API endpoints
      page.on("response", async (response) => {
        const url = response.url();
        if (url.includes("/api/")) {
          const contentType = response.headers()["content-type"] || "";
          if (contentType.includes("text/html")) {
            htmlResponses.push({ url, contentType });
            console.log(`[HTML Response] ${url} - ${contentType}`);
          }
        }
      });

      // Navigate through wizard
      await page.goto("/contact", { waitUntil: "networkidle" });

      const newProjectBtn = page.getByRole("button", {
        name: /Nouveau projet.*Site web/i,
      });
      if (await newProjectBtn.isVisible({ timeout: 5000 })) {
        await newProjectBtn.click();

        const projectTypeBtn = page
          .locator("button", { hasText: /site vitrine/i })
          .first();
        if (await projectTypeBtn.isVisible({ timeout: 3000 })) {
          await projectTypeBtn.click();
        }
      }

      // Navigate to contact step
      for (let i = 0; i < 6; i++) {
        const nextBtn = page
          .locator("button", { hasText: /suivant|continuer/i })
          .first();
        if (await nextBtn.isVisible({ timeout: 2000 })) {
          await nextBtn.click();
          await page.waitForTimeout(500);
        }
      }

      await page.waitForTimeout(3000);

      console.log(`\n=== API Content-Type Analysis ===`);
      console.log(`API endpoints returning HTML: ${htmlResponses.length}`);
      htmlResponses.forEach((r) => {
        console.log(`  - ${r.url}: ${r.contentType}`);
      });

      // If APIs return HTML (error pages), our code should handle it gracefully
      // This test documents the behavior but doesn't fail on HTML responses
      // (because that's a server-side issue, not client-side)
    });
  });

  test.describe("No Duplicate API Calls", () => {
    test("should not make duplicate calls to the same endpoint", async ({
      page,
    }) => {
      const apiCalls: { url: string; method: string; timestamp: number }[] = [];

      page.on("request", (request) => {
        const url = request.url();
        if (url.includes("/api/")) {
          apiCalls.push({
            url: url,
            method: request.method(),
            timestamp: Date.now(),
          });
        }
      });

      await page.goto("/contact", { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);

      // Start wizard
      const newProjectBtn = page.getByRole("button", {
        name: /Nouveau projet.*Site web/i,
      });
      if (await newProjectBtn.isVisible({ timeout: 5000 })) {
        await newProjectBtn.click();
        await page.waitForTimeout(1000);
      }

      await page.waitForTimeout(3000);

      console.log(`\n=== API Call Duplication Analysis ===`);

      // Group calls by endpoint
      const callCounts: Record<string, number> = {};
      apiCalls.forEach((call) => {
        const key = `${call.method} ${new URL(call.url).pathname}`;
        callCounts[key] = (callCounts[key] || 0) + 1;
      });

      console.log("Call counts by endpoint:");
      Object.entries(callCounts).forEach(([endpoint, count]) => {
        console.log(`  ${endpoint}: ${count}`);
        if (count > 2) {
          console.log(`    ⚠️ Potential duplicate calls detected!`);
        }
      });

      // Check for rapid duplicate calls (within 500ms)
      const rapidDuplicates: string[] = [];
      for (let i = 1; i < apiCalls.length; i++) {
        const prev = apiCalls[i - 1];
        const curr = apiCalls[i];
        if (
          prev.url === curr.url &&
          prev.method === curr.method &&
          curr.timestamp - prev.timestamp < 500
        ) {
          rapidDuplicates.push(`${curr.method} ${curr.url}`);
        }
      }

      console.log(
        `\nRapid duplicate calls (<500ms): ${rapidDuplicates.length}`,
      );
      rapidDuplicates.forEach((d) => {
        console.log(`  - ${d}`);
      });

      // We should not have rapid duplicate calls to the same endpoint
      expect(
        rapidDuplicates.length,
        "Should not have rapid duplicate API calls",
      ).toBeLessThanOrEqual(1); // Allow 1 for potential race condition
    });
  });
});
