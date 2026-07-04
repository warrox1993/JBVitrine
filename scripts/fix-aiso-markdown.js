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

// Get the original content from the add script (without emojis)
const originalScriptPath = path.join(__dirname, "add-aiso-article.js");
const originalScript = fs.readFileSync(originalScriptPath, "utf8");

// Extract the content from the script (it's between the quotes after content:)
const contentMatch = originalScript.match(/content:\s*`([^`]+)`/s);

if (!contentMatch) {
  console.error("Could not extract content from add-aiso-article.js");
  process.exit(1);
}

let properContent = contentMatch[1];

// Remove emojis from the extracted content
const emojiPattern =
  /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{2B55}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23EC}]|[\u{23F0}]|[\u{23F3}]|[\u{25FD}-\u{25FE}]|[\u{2614}-\u{2615}]|[\u{2648}-\u{2653}]|[\u{267F}]|[\u{2693}]|[\u{26A1}]|[\u{26AA}-\u{26AB}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26CE}]|[\u{26D4}]|[\u{26EA}]|[\u{26F2}-\u{26F3}]|[\u{26F5}]|[\u{26FA}]|[\u{26FD}]|[\u{2705}]|[\u{270A}-\u{270B}]|[\u{2728}]|[\u{274C}]|[\u{274E}]|[\u{2753}-\u{2755}]|[\u{2757}]|[\u{2795}-\u{2797}]|[\u{27B0}]|[\u{27BF}]|[\u{2B1B}-\u{2B1C}]/gu;

properContent = properContent.replace(emojiPattern, "");

// Now replace the malformed content
aisoArticle.content = properContent;

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log("Markdown fixed for AISO article!");
console.log(`Content length: ${properContent.length} characters`);
console.log(
  `Line breaks preserved: ${(properContent.match(/\n/g) || []).length} newlines`,
);
