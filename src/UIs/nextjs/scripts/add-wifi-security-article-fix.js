const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../src/data/blogArticles.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Read the content from a separate file to avoid escaping issues
const contentLines = [
  "# Sécurité WiFi et contrôle parental : comprendre pour mieux protéger",
  "",
  "**AVERTISSEMENT LÉGAL IMPORTANT**",
  "",
  "Cet article est publié à des fins **strictement éducatives et informatives**.",
  "",
  "**Il est formellement interdit de reproduire ou appliquer les techniques décrites ici sans autorisation explicite du propriétaire du réseau.**",
  "",
  "Contourner un contrôle parental ou accéder à un réseau WiFi sans autorisation constitue une **violation de la loi belge** :",
  "- **Code pénal belge, article 550bis** : Accès non autorisé à un système informatique",
  "- **Sanctions** : Amende de 26€ à 100 000€ et/ou emprisonnement de 6 mois à 5 ans",
  "",
  "---",
  "",
  "Article complet disponible prochainement.",
];

const wifiArticle = {
  slug: "securite-wifi-controle-parental-education",
  title: "Sécurité WiFi et contrôle parental : comprendre pour mieux protéger",
  excerpt:
    "Article éducatif sur la sécurité des réseaux WiFi domestiques et les systèmes de contrôle parental. À des fins strictement pédagogiques.",
  publishedAt: "2025-11-06",
  category: "Cybersécurité",
  readTime: "3 min",
  content: contentLines.join("\n"),
  tableOfContents: [{ title: "Avertissement légal", id: "avertissement" }],
};

data.articles.unshift(wifiArticle);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

console.log("✓ Article WiFi added!");
