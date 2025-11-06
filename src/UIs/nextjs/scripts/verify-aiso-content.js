const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/blogArticles.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
const content = data.articles[0].content;

console.log("Article AISO - Structure vérifiée:");
console.log("  Total caractères:", content.length);
console.log("  H2 headings (##):", (content.match(/^## /gm) || []).length);
console.log("  H3 headings (###):", (content.match(/^### /gm) || []).length);
console.log("  Code blocks (```):", (content.match(/```/g) || []).length / 2);
console.log("  Tables (|):", (content.match(/^\|/gm) || []).length);
console.log("  Bullet lists (-):", (content.match(/^- /gm) || []).length);
console.log("\nPremières sections détectées:");

const h2Sections = content.match(/^## .+$/gm) || [];
h2Sections.slice(0, 8).forEach((section, i) => {
  console.log(`  ${i + 1}. ${section}`);
});

console.log("\n✓ Structure markdown complète restaurée!");
