const fs = require("fs");
const path = require("path");

// Read the blog articles
const filePath = path.join(__dirname, "../src/data/blogArticles.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Find the AISO article (first one)
const aisoArticle = data.articles[0];

if (aisoArticle.slug !== "ai-search-optimization-chatgpt-perplexity-2025") {
  console.error("First article is not the AISO article!");
  process.exit(1);
}

// Read the complete add script
const originalScriptPath = path.join(__dirname, "add-aiso-article.js");
const originalScript = fs.readFileSync(originalScriptPath, "utf8");

// Extract content between `content: ` and `, tableOfContents:`
// Using a more robust approach with capturing groups
const contentStart = originalScript.indexOf("content: `") + 10; // Skip "content: `"
const contentEnd = originalScript.indexOf("`,\n  tableOfContents:");

if (contentStart === -1 || contentEnd === -1) {
  console.error("Could not find content boundaries in add-aiso-article.js");
  process.exit(1);
}

let properContent = originalScript.substring(contentStart, contentEnd);

// Remove emojis with comprehensive pattern
const emojiPattern =
  /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{2B55}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23EC}]|[\u{23F0}]|[\u{23F3}]|[\u{25FD}-\u{25FE}]|[\u{2614}-\u{2615}]|[\u{2648}-\u{2653}]|[\u{267F}]|[\u{2693}]|[\u{26A1}]|[\u{26AA}-\u{26AB}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26CE}]|[\u{26D4}]|[\u{26EA}]|[\u{26F2}-\u{26F3}]|[\u{26F5}]|[\u{26FA}]|[\u{26FD}]|[\u{2705}]|[\u{270A}-\u{270B}]|[\u{2728}]|[\u{274C}]|[\u{274E}]|[\u{2753}-\u{2755}]|[\u{2757}]|[\u{2795}-\u{2797}]|[\u{27B0}]|[\u{27BF}]|[\u{2B1B}-\u{2B1C}]/gu;

properContent = properContent.replace(emojiPattern, "").trim();

// Remove the Claude Code signature lines
properContent = properContent.replace(
  /\n*Generated with \[Claude Code\]\(https:\/\/claude\.com\/claude-code\)\n*Co-Authored-By: Claude <noreply@anthropic\.com>\n*/g,
  "",
);

// Update the article content
aisoArticle.content = properContent;

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log("✓ Markdown fixed for AISO article!");
console.log(`  Content length: ${properContent.length} characters`);
console.log(
  `  Line breaks preserved: ${(properContent.match(/\n/g) || []).length} newlines`,
);
console.log(`  Emojis removed: Complete`);
console.log(`  First 100 chars: ${properContent.substring(0, 100)}...`);
console.log(
  `  Last 100 chars: ...${properContent.substring(properContent.length - 100)}`,
);
