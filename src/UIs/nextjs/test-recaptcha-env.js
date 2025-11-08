// Test script to verify reCAPTCHA environment variables
require("dotenv").config({ path: ".env.local" });

console.log("=== reCAPTCHA Configuration Test ===\n");

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const secretKey = process.env.RECAPTCHA_SECRET_KEY;

console.log(
  "✅ Site Key (public):",
  siteKey ? siteKey.substring(0, 20) + "..." : "❌ NOT FOUND",
);
console.log(
  "✅ Secret Key (private):",
  secretKey ? secretKey.substring(0, 20) + "..." : "❌ NOT FOUND",
);

if (!siteKey) {
  console.log(
    "\n❌ ERROR: NEXT_PUBLIC_RECAPTCHA_SITE_KEY not found in .env.local",
  );
  console.log("Add this line to .env.local:");
  console.log(
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdhVQYsAAAAALXfJhZcRADizzXz_1tfndPyaUEi",
  );
}

if (!secretKey) {
  console.log("\n❌ ERROR: RECAPTCHA_SECRET_KEY not found in .env.local");
  console.log("Add this line to .env.local:");
  console.log("RECAPTCHA_SECRET_KEY=6LdhVQYsAAAAAFK3vpcH9uPmoRuPC7xgoz-RQ6Kt");
}

if (siteKey && secretKey) {
  console.log(
    "\n✅ All reCAPTCHA environment variables are properly configured!",
  );
  console.log("\n📋 Next steps:");
  console.log(
    "1. Go to: https://www.google.com/recaptcha/admin/site/" + siteKey,
  );
  console.log('2. Add "localhost" to allowed domains');
  console.log("3. Restart your dev server: npm run dev");
}

console.log("\n=== End of Test ===");
