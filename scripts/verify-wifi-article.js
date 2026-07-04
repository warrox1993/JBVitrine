const data = require("../src/data/blogArticles.json");
const article = data.articles.find(
  (a) => a.slug === "securite-wifi-controle-parental-education",
);
console.log("Article found:", !!article);
if (article) {
  console.log("Title:", article.title);
  console.log("Category:", article.category);
  console.log("URL:", "/blog/" + article.slug);
}
