const fs = require("fs");

const filePath = "src/lib/pricing/features.ts";
let content = fs.readFileSync(filePath, "utf-8");

let fixedCount = 0;

// Fix 1: Double comma puis explanation sur même ligne
// Pattern: description: "...",, explanation: `...`
content = content.replace(
  /description:\s*"([^"]+)",\s*,\s*explanation:\s*`([^`]+)`/g,
  (match, desc, expl) => {
    fixedCount++;
    return `description: "${desc}",\n        explanation: \`${expl}\`,`;
  },
);

// Fix 2: Explanation sans virgule avant category
content = content.replace(
  /explanation:\s*`([^`]+)`\s+category:/g,
  (match, expl) => {
    return `explanation: \`${expl}\`,\n        category:`;
  },
);

// Fix 3: Double virgules simples
content = content.replace(/,,/g, ",");

fs.writeFileSync(filePath, content, "utf-8");

console.log(`✅ Fixed ${fixedCount}+ syntax errors`);
console.log("Verifying with TypeScript...");
