// Security Audit Script for API Keys
require("dotenv").config({ path: ".env.local" });

console.log("🔐 ========================================");
console.log("   API KEYS SECURITY AUDIT");
console.log("========================================\n");

const apiKeys = [
  // Email & Communication
  {
    name: "Resend API",
    envVar: "RESEND_API_KEY",
    shouldBePublic: false,
    required: true,
    usage: "Sending emails (contact form)",
    critical: true,
  },

  // Lead Enrichment
  {
    name: "Hunter.io API",
    envVar: "HUNTER_API_KEY",
    shouldBePublic: false, // ✅ PRIVATE
    required: false,
    usage: "Email validation and enrichment",
    critical: false,
  },
  {
    name: "Brandfetch API",
    envVar: "BRANDFETCH_API_KEY",
    shouldBePublic: false, // ✅ PRIVATE
    required: false,
    usage: "Company logos and brand info",
    critical: false,
  },

  // Database
  {
    name: "Database URL",
    envVar: "DATABASE_URL",
    shouldBePublic: false,
    required: true,
    usage: "PostgreSQL connection (Neon)",
    critical: true,
  },

  // Authentication
  {
    name: "NextAuth Secret",
    envVar: "NEXTAUTH_SECRET",
    shouldBePublic: false,
    required: true,
    usage: "JWT token encryption",
    critical: true,
  },

  // Google Services
  {
    name: "Google Maps ID",
    envVar: "NEXT_PUBLIC_GOOGLE_MAPS_ID",
    shouldBePublic: true, // ✅ OK - restricted by domain
    required: true,
    usage: "Embedded maps on contact page",
    critical: false,
  },

  // Security - reCAPTCHA
  {
    name: "reCAPTCHA Site ID",
    envVar: "NEXT_PUBLIC_RECAPTCHA_SITE_ID",
    shouldBePublic: true, // ✅ OK - public by design
    required: true,
    usage: "Anti-bot protection (client-side)",
    critical: false,
  },
  {
    name: "reCAPTCHA Secret",
    envVar: "RECAPTCHA_SECRET",
    shouldBePublic: false,
    required: true,
    usage: "Anti-bot verification (server-side)",
    critical: true,
  },

  // Security - Redis
  {
    name: "Upstash Redis URL",
    envVar: "UPSTASH_REDIS_REST_URL",
    shouldBePublic: false,
    required: false,
    usage: "Rate limiting and security logging",
    critical: false,
  },
  {
    name: "Upstash Redis Token",
    envVar: "UPSTASH_REDIS_REST_TOKEN",
    shouldBePublic: false,
    required: false,
    usage: "Redis authentication",
    critical: false,
  },

  // Company Verification
  {
    name: "CBE API Secret",
    envVar: "CBEAPI_SECRET",
    shouldBePublic: false,
    required: true,
    usage: "Belgian company verification",
    critical: true,
  },
];

let securityIssues = [];
let missingKeys = [];
let exposedKeys = [];
let goodKeys = [];

console.log("📋 Checking all API keys...\n");

apiKeys.forEach((key) => {
  const value = process.env[key.envVar];
  const isPublic = key.envVar.startsWith("NEXT_PUBLIC_");
  const isConfigured = !!value;

  let status = "";
  let emoji = "";

  if (!isConfigured && key.required) {
    emoji = "❌";
    status = "MISSING (REQUIRED)";
    missingKeys.push(key);
  } else if (!isConfigured && !key.required) {
    emoji = "⚠️";
    status = "NOT CONFIGURED (optional)";
  } else if (isPublic && !key.shouldBePublic) {
    emoji = "🚨";
    status = "EXPOSED (should be private!)";
    exposedKeys.push(key);
    securityIssues.push(key);
  } else if (!isPublic && key.shouldBePublic) {
    emoji = "⚠️";
    status = "PRIVATE (should be public)";
    securityIssues.push(key);
  } else {
    emoji = "✅";
    status = isPublic ? "Public (OK)" : "Private (OK)";
    goodKeys.push(key);
  }

  const valuePreview = value
    ? value.length > 30
      ? value.substring(0, 30) + "..."
      : value.substring(0, 20) + "..."
    : "NOT SET";

  console.log(`${emoji} ${key.name}`);
  console.log(`   Variable: ${key.envVar}`);
  console.log(`   Status: ${status}`);
  console.log(`   Value: ${isConfigured ? valuePreview : "NOT SET"}`);
  console.log(`   Usage: ${key.usage}`);
  if (key.critical) console.log(`   ⚠️ CRITICAL: Security-sensitive`);
  console.log("");
});

console.log("\n🔍 ========================================");
console.log("   SECURITY SUMMARY");
console.log("========================================\n");

console.log(`✅ Properly Configured: ${goodKeys.length}`);
console.log(`🚨 Security Issues: ${securityIssues.length}`);
console.log(`❌ Missing Required Keys: ${missingKeys.length}`);
console.log(`🔓 Exposed Private Keys: ${exposedKeys.length}`);

if (exposedKeys.length > 0) {
  console.log("\n\n🚨 CRITICAL SECURITY ISSUES:\n");
  exposedKeys.forEach((key) => {
    console.log(`❌ ${key.name} (${key.envVar})`);
    console.log(`   Problem: This key is PUBLIC but should be PRIVATE`);
    console.log(
      `   Risk: ${key.critical ? "HIGH - Can be abused by attackers" : "MEDIUM - May exceed API limits"}`,
    );
    console.log(
      `   Fix: Rename to ${key.envVar.replace("NEXT_PUBLIC_", "")} and move to API route`,
    );
    console.log("");
  });
}

if (missingKeys.length > 0) {
  console.log("\n\n❌ MISSING REQUIRED KEYS:\n");
  missingKeys.forEach((key) => {
    console.log(`❌ ${key.name} (${key.envVar})`);
    console.log(`   Usage: ${key.usage}`);
    console.log(`   Action: Add this key to .env.local`);
    console.log("");
  });
}

console.log("\n\n📊 API KEY SECURITY SCORE:\n");

const totalKeys = apiKeys.filter((k) => k.required).length;
const secureKeys = goodKeys.filter((k) => k.required).length;
const score = Math.round((secureKeys / totalKeys) * 100);

let scoreEmoji = "🔴";
if (score >= 90) scoreEmoji = "🟢";
else if (score >= 70) scoreEmoji = "🟡";

console.log(`${scoreEmoji} Overall Score: ${score}%`);
console.log(
  `   (${secureKeys}/${totalKeys} required keys properly configured)\n`,
);

if (exposedKeys.length === 0 && missingKeys.length === 0) {
  console.log("🎉 ========================================");
  console.log("   ALL API KEYS ARE SECURE!");
  console.log("========================================\n");
} else {
  console.log("⚠️  ========================================");
  console.log("   ACTION REQUIRED TO SECURE API KEYS");
  console.log("========================================\n");
}

console.log("📚 For more details, see: SECURITY.md\n");
