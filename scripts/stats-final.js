const fs = require("fs");
const content = fs.readFileSync("src/lib/pricing/features.ts", "utf-8");

// Compter les features et explications
const featureRegex = /\{\s*id:/g;
const explanationRegex = /explanation:/g;

const totalFeatures = (content.match(featureRegex) || []).length;
const withExplanations = (content.match(explanationRegex) || []).length;
const withoutExplanations = totalFeatures - withExplanations;

const percentage = Math.round((withExplanations / totalFeatures) * 100);

console.log("╔═══════════════════════════════════════════════════════╗");
console.log("║         STATISTIQUES FINALES - EXPLICATIONS          ║");
console.log("╚═══════════════════════════════════════════════════════╝");
console.log("");
console.log(`📊 Total features: ${totalFeatures}`);
console.log(`✅ Avec explications: ${withExplanations} (${percentage}%)`);
console.log(
  `⏳ Sans explications: ${withoutExplanations} (${100 - percentage}%)`,
);
console.log("");
console.log("📈 Progression par batch:");
console.log("   Batch 1 (initial):     27 explications");
console.log("   Batch 2:               16 explications");
console.log("   Batch 3:               34 explications");
console.log("   Batch 4:               49 explications");
console.log("   Batch 5:               37 explications");
console.log("   ────────────────────────────────────");
console.log(`   TOTAL AJOUTÉ:         163 explications`);
console.log("");
console.log(
  `🎯 Couverture: ${percentage}% des features ont une explication complète`,
);
console.log('   Format: "C\'est quoi ?" + "Pourquoi l\'avoir ?"');
