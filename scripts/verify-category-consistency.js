const fs = require("fs");
const path = require("path");

// Read the features.ts file
const filePath = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "pricing",
  "features.ts",
);
const content = fs.readFileSync(filePath, "utf-8");

console.log("=== CATEGORY CONSISTENCY VALIDATION ===\n");

// Extract categories used in features
const categoryMatches = content.matchAll(/category:\s*["']([^"']+)["']/g);
const usedCategories = new Set(Array.from(categoryMatches, (m) => m[1]));

console.log("✓ Categories used in features:", usedCategories.size);

// Extract categories from getCategoryName function
const getCategoryNameMatch = content.match(
  /export function getCategoryName[\s\S]*?^}/m,
);
if (!getCategoryNameMatch) {
  console.error("✗ Could not find getCategoryName function");
  process.exit(1);
}

const categoryNameSection = getCategoryNameMatch[0];
const categoryNameMatches = categoryNameSection.matchAll(
  /["']([a-z-]+)["']:\s*["']/g,
);
const namedCategories = new Set(Array.from(categoryNameMatches, (m) => m[1]));

console.log("✓ Categories in getCategoryName:", namedCategories.size);

// Extract categories from getCategoryDescription function
const getCategoryDescMatch = content.match(
  /export function getCategoryDescription[\s\S]*?^}/m,
);
if (!getCategoryDescMatch) {
  console.error("✗ Could not find getCategoryDescription function");
  process.exit(1);
}

const categoryDescSection = getCategoryDescMatch[0];
const categoryDescMatches = categoryDescSection.matchAll(
  /["']([a-z-]+)["']:\s*["']/g,
);
const describedCategories = new Set(
  Array.from(categoryDescMatches, (m) => m[1]),
);

console.log(
  "✓ Categories in getCategoryDescription:",
  describedCategories.size,
);

// Check for categories used in features but not in getCategoryName
console.log("\n=== MISSING IN getCategoryName ===");
const missingInName = [];
usedCategories.forEach((cat) => {
  if (!namedCategories.has(cat)) {
    missingInName.push(cat);
  }
});

if (missingInName.length > 0) {
  console.log("✗ Categories used in features but missing names:");
  missingInName.forEach((cat) => console.log("  -", cat));
} else {
  console.log("✓ All feature categories have names defined");
}

// Check for categories used in features but not in getCategoryDescription
console.log("\n=== MISSING IN getCategoryDescription ===");
const missingInDesc = [];
usedCategories.forEach((cat) => {
  if (!describedCategories.has(cat)) {
    missingInDesc.push(cat);
  }
});

if (missingInDesc.length > 0) {
  console.log("✗ Categories used in features but missing descriptions:");
  missingInDesc.forEach((cat) => console.log("  -", cat));
} else {
  console.log("✓ All feature categories have descriptions defined");
}

// Check for categories defined but not used
console.log("\n=== UNUSED CATEGORIES ===");
const unusedInName = [];
namedCategories.forEach((cat) => {
  if (!usedCategories.has(cat)) {
    unusedInName.push(cat);
  }
});

if (unusedInName.length > 0) {
  console.log(
    "⚠ Categories defined in getCategoryName but not used in features:",
  );
  unusedInName.forEach((cat) => console.log("  -", cat));
} else {
  console.log("✓ All named categories are used");
}

// Summary
console.log("\n=== SUMMARY ===");
if (missingInName.length === 0 && missingInDesc.length === 0) {
  console.log("✓ Category consistency check PASSED");
  console.log(
    `✓ All ${usedCategories.size} categories have both names and descriptions`,
  );
} else {
  console.log("✗ Category consistency check FAILED");
  console.log(`Missing names: ${missingInName.length}`);
  console.log(`Missing descriptions: ${missingInDesc.length}`);
  process.exit(1);
}
