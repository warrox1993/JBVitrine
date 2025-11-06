const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../src/data/blogArticles.json");
const contentPath = path.join(__dirname, "wifi-article-content-extended.md");

// Read files
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const fullContent = fs.readFileSync(contentPath, "utf-8");

// Find the WiFi article
const articleIndex = data.articles.findIndex(
  (a) => a.slug === "securite-wifi-controle-parental-education",
);

if (articleIndex === -1) {
  console.error("❌ Article not found!");
  process.exit(1);
}

// Define complete table of contents with new sections
const tableOfContents = [
  {
    title: "Mon histoire : comment la curiosité m'a mené à la cybersécurité",
    id: "histoire",
  },
  {
    title: "Pourquoi ce sujet est important en 2025",
    id: "importance",
  },
  {
    title: "Comment fonctionnent les contrôles parentaux",
    id: "fonctionnement",
  },
  {
    title: "Les techniques que les jeunes utilisent (éducation parentale)",
    id: "techniques",
  },
  {
    title:
      "Les outils de test de sécurité WiFi (comprendre pour mieux protéger)",
    id: "outils",
  },
  {
    title: "Pratiquer la cybersécurité légalement",
    id: "pratique-legale",
  },
  {
    title: "Comment tester la sécurité de VOTRE réseau",
    id: "test-propre-reseau",
  },
  {
    title: "Comment sécuriser correctement votre réseau WiFi",
    id: "securisation",
  },
  {
    title: "L'approche recommandée : dialogue + technique",
    id: "approche",
  },
  {
    title: "Mon message aux jeunes qui lisent cet article",
    id: "message-jeunes",
  },
  {
    title: "Mon message aux parents",
    id: "message-parents",
  },
  {
    title: "Conclusion : la sécurité par l'éducation",
    id: "conclusion",
  },
];

// Update the article
data.articles[articleIndex] = {
  ...data.articles[articleIndex],
  content: fullContent,
  readTime: "18 min",
  excerpt:
    "Guide complet sur la sécurité WiFi et les contrôles parentaux : comprendre les outils (Aircrack-ng, Wireshark, Hashcat), les vulnérabilités, et comment protéger votre réseau familial. Avec références TryHackMe pour pratique légale.",
  tableOfContents: tableOfContents,
};

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

console.log("✓ WiFi security article updated with extended content!");
console.log(`  Content length: ${fullContent.length} characters`);
console.log(`  Read time: 18 min`);
console.log(`  Table of contents: ${tableOfContents.length} sections`);
console.log(`  New sections added:`);
console.log(`    - Les outils de test de sécurité WiFi`);
console.log(`    - Pratiquer la cybersécurité légalement (TryHackMe)`);
console.log(`    - Comment tester la sécurité de VOTRE réseau`);
console.log(
  `\n  View at: http://localhost:3000/blog/securite-wifi-controle-parental-education`,
);
