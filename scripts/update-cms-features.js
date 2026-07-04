const fs = require("fs");
const path = require("path");

const featuresPath = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "pricing",
  "features.ts",
);
let content = fs.readFileSync(featuresPath, "utf8");

// Find the start of cmsBlog features array
const startMarker = `  cmsBlog: {
    id: "cmsBlog",
    name: "CMS / Blog",
    description: "Solution CMS complète 100% configurée - Il ne reste qu'à définir votre design",
    icon: "📝",
    basePrice: 2500,
    estimatedTimelineWeeks: { min: 3, max: 12 },
    features: [`;

// New simplified features for CMS - just design questions
const newFeatures = `      // Préférences de design (design-preferences)
      {
        id: "design-style-modern",
        name: "Design moderne et épuré",
        description: "Style minimaliste, espacements généreux, typographie moderne",
        category: "design-preferences",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "design-style-classic",
        name: "Design classique et professionnel",
        description: "Style traditionnel, structure formelle, police serif",
        category: "design-preferences",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "design-style-creative",
        name: "Design créatif et audacieux",
        description: "Couleurs vibrantes, animations, mise en page originale",
        category: "design-preferences",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "design-style-corporate",
        name: "Design corporate et sobre",
        description: "Style entreprise, couleurs neutres, mise en page structurée",
        category: "design-preferences",
        selected: true,
        mutuallyExclusive: true,
      },`;

const endMarker = `    ],
  },
};`;

// Find the positions
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Start marker not found");
  process.exit(1);
}

const searchStartIdx = startIdx + startMarker.length;
const endIdx = content.indexOf(endMarker, searchStartIdx);
if (endIdx === -1) {
  console.error("End marker not found");
  process.exit(1);
}

// Replace everything between startMarker and endMarker
const before = content.substring(0, searchStartIdx);
const after = content.substring(endIdx);

const newContent = before + "\n" + newFeatures + "\n" + after;

fs.writeFileSync(featuresPath, newContent, "utf8");
console.log("✓ CMS features updated successfully");
