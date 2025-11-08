const fs = require("fs");

const content = fs.readFileSync("src/lib/pricing/features.ts", "utf-8");

// Find features without explanation
const featureBlocks = content.split(/\{\s*\n\s*id:/g);
let found = 0;

console.log("Sample of features WITHOUT explanation:\n");

featureBlocks.forEach((block, index) => {
  if (found >= 20 || index === 0) return;

  const idMatch = block.match(/["']([^"']+)["']/);
  const nameMatch = block.match(/name:\s*["']([^"']+)["']/);
  const descMatch = block.match(/description:\s*["']([^"']+)["']/);
  const categoryMatch = block.match(/category:\s*["']([^"']+)["']/);
  const hasExplanation = block.includes("explanation:");

  if (nameMatch && !hasExplanation) {
    console.log(
      `[${categoryMatch ? categoryMatch[1] : "N/A"}] ${idMatch ? idMatch[1] : "unknown"}`,
    );
    console.log(`  Name: ${nameMatch[1]}`);
    console.log(`  Desc: ${descMatch ? descMatch[1] : "N/A"}`);
    console.log("");
    found++;
  }
});

console.log(
  `\n\nTotal features without explanation: ${featureBlocks.filter((block, i) => i > 0 && !block.includes("explanation:")).length}`,
);
