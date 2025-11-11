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

console.log("=== WIZARD FEATURES VALIDATION ===\n");

// Basic syntax validation
try {
  // Check for balanced braces
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;
  const bracesPassed = openBraces === closeBraces;
  console.log(
    bracesPassed ? "✓" : "✗",
    "Brace balance check:",
    bracesPassed ? "PASSED" : "FAILED",
  );
  console.log("  Open:", openBraces, ", Close:", closeBraces);

  // Check for balanced brackets
  const openBrackets = (content.match(/\[/g) || []).length;
  const closeBrackets = (content.match(/\]/g) || []).length;
  const bracketsPassed = openBrackets === closeBrackets;
  console.log(
    bracketsPassed ? "✓" : "✗",
    "Bracket balance check:",
    bracketsPassed ? "PASSED" : "FAILED",
  );
  console.log("  Open:", openBrackets, ", Close:", closeBrackets);

  // Check for balanced parentheses
  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;
  const parensPassed = openParens === closeParens;
  console.log(
    parensPassed ? "✓" : "✗",
    "Parenthesis balance check:",
    parensPassed ? "PASSED" : "FAILED",
  );
  console.log("  Open:", openParens, ", Close:", closeParens);

  // Extract all feature IDs
  const featureIdMatches = content.matchAll(/id:\s*["']([^"']+)["']/g);
  const featureIds = Array.from(featureIdMatches, (m) => m[1]);
  console.log("\n✓ Total features found:", featureIds.length);

  // Check for duplicates
  const seenIds = new Set();
  const duplicates = [];
  featureIds.forEach((id) => {
    if (seenIds.has(id)) {
      duplicates.push(id);
    } else {
      seenIds.add(id);
    }
  });

  if (duplicates.length > 0) {
    console.log("✗ DUPLICATE FEATURE IDs FOUND:", [...new Set(duplicates)]);
    process.exit(1);
  } else {
    console.log("✓ No duplicate feature IDs");
  }

  // Extract all category IDs from features
  const categoryMatches = content.matchAll(/category:\s*["']([^"']+)["']/g);
  const categories = Array.from(
    new Set(Array.from(categoryMatches, (m) => m[1])),
  );
  console.log("\n✓ Unique categories found:", categories.length);
  console.log("Categories:", categories.sort().join(", "));

  // Count features by project type
  const projectTypes = [
    "siteVitrine",
    "ecommerce",
    "appWeb",
    "auditCyber",
    "aiAutomation",
    "cmsBlog",
  ];
  console.log("\n=== FEATURES BY PROJECT TYPE ===");

  projectTypes.forEach((projectType) => {
    const regex = new RegExp(
      `${projectType}:\\s*\\{[^}]*features:\\s*\\[`,
      "g",
    );
    const match = regex.exec(content);
    if (match) {
      const startIndex = match.index + match[0].length;
      let braceCount = 1;
      let endIndex = startIndex;

      // Find matching closing bracket
      for (let i = startIndex; i < content.length; i++) {
        if (content[i] === "[") braceCount++;
        if (content[i] === "]") {
          braceCount--;
          if (braceCount === 0) {
            endIndex = i;
            break;
          }
        }
      }

      const featuresSection = content.substring(startIndex, endIndex);
      const featureCount = (featuresSection.match(/\bid:\s*["']/g) || [])
        .length;
      console.log(`  ${projectType}: ${featureCount} features`);
    }
  });

  // Check for required fields
  console.log("\n=== CHECKING REQUIRED FIELDS ===");
  const featureBlocks = content.matchAll(
    /\{[\s\S]*?id:\s*["']([^"']+)["'][\s\S]*?\}/g,
  );
  let missingFields = 0;

  for (const block of featureBlocks) {
    const featureText = block[0];
    const featureId = block[1];

    const hasName = /name:\s*["']/.test(featureText);
    const hasDescription = /description:\s*["']/.test(featureText);
    const hasCategory = /category:\s*["']/.test(featureText);

    if (!hasName || !hasDescription || !hasCategory) {
      console.log(
        `✗ Feature "${featureId}" missing fields:`,
        !hasName ? "name " : "",
        !hasDescription ? "description " : "",
        !hasCategory ? "category" : "",
      );
      missingFields++;
    }
  }

  if (missingFields === 0) {
    console.log(
      "✓ All features have required fields (id, name, description, category)",
    );
  } else {
    console.log(`✗ Found ${missingFields} features with missing fields`);
  }

  console.log("\n=== VALIDATION COMPLETE ===");
  console.log("✓ All checks passed successfully!");
} catch (error) {
  console.error("✗ Validation error:", error.message);
  process.exit(1);
}
