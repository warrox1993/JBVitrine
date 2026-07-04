const fs = require("fs");

// Lire le fichier
const filePath = "src/lib/pricing/features.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Pattern problématique : description se termine par d', puis explanation insérée au mauvais endroit
// Exemple: description: "texte d',\n      explanation: `...`suite du texte",

const problemPattern =
  /description:\s*"([^"]*d'),\s*explanation:\s*`([^`]+)`([^"]*)",/g;

let fixedCount = 0;
content = content.replace(
  problemPattern,
  (match, desc1, explanation, desc2) => {
    fixedCount++;
    // Reconstruire correctement : description complète, puis explanation
    const fullDesc = desc1 + desc2;
    return `description: "${fullDesc}",\n        explanation: \`${explanation}\`,`;
  },
);

// Écrire le fichier corrigé
fs.writeFileSync(filePath, content, "utf-8");

console.log(`✅ Fixed ${fixedCount} syntax errors in features.ts`);
console.log("Please run TypeScript compiler to verify all errors are fixed.");
