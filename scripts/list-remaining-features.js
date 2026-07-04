const fs = require("fs");

const content = fs.readFileSync("src/lib/pricing/features.ts", "utf-8");

// Trouver toutes les features avec regex
const featureRegex =
  /\{\s*id:\s*["']([^"']+)["'][^}]*?name:\s*["']([^"']+)["'][^}]*?\}/gs;
const matches = [...content.matchAll(featureRegex)];

const missing = [];
matches.forEach((match) => {
  const fullMatch = match[0];
  const id = match[1];
  const name = match[2];

  if (!fullMatch.includes("explanation:")) {
    missing.push({ id, name });
  }
});

console.log(`Total features without explanation: ${missing.length}\n`);
console.log("Next 50 features to add:\n");
missing.slice(0, 50).forEach((f, i) => {
  console.log(`${i + 1}. ${f.id} - ${f.name}`);
});
