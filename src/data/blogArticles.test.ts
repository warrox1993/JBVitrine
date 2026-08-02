import { test } from "node:test";
import assert from "node:assert/strict";
import { validateBlogArticle } from "../lib/validation/blog-article";
import { markdownToHtml } from "../lib/markdown";
import blogData from "./blogArticles.json";

/**
 * Garde-fou sur le contenu, pas sur le code.
 *
 * Les articles sont écrits à la main (ou par des agents) directement dans le
 * JSON, sans passer par /api/admin/blog — donc sans jamais rencontrer
 * validateBlogArticle(). Un article mal formé n'échoue nulle part : il se
 * contente de mal s'afficher en production. Ce test applique au fichier les
 * mêmes règles que la route d'écriture, et vérifie en plus que le markdown
 * survit réellement au pipeline marked + sanitize-html du site.
 */

const articles = blogData.articles as Array<Record<string, unknown>>;

test("le fichier contient au moins un article", () => {
  assert.ok(articles.length > 0);
});

for (const article of articles) {
  const slug = String(article.slug);

  test(`${slug} — passe le validateur de la route d'écriture`, () => {
    const result = validateBlogArticle(article);
    assert.equal(result.ok, true, result.ok ? "" : `${slug} : ${result.error}`);
  });

  test(`${slug} — sommaire et ancres se correspondent`, () => {
    const content = String(article.content);
    const toc = article.tableOfContents as Array<{ id: string; title: string }>;

    // Les ancres du corps, hors blocs de code : un `# commentaire` en bash ou
    // un exemple `{#x}` dans un extrait ne sont pas des titres de section.
    let inCode = false;
    const anchors: string[] = [];
    for (const line of content.split("\n")) {
      if (/^\s*```/.test(line)) {
        inCode = !inCode;
        continue;
      }
      if (inCode) continue;
      const m = line.match(/^#{2,}\s+.*\{#([a-z0-9-]+)\}\s*$/);
      if (m) anchors.push(m[1]);
    }

    const tocIds = toc.map((t) => t.id);
    assert.deepEqual(
      anchors,
      tocIds,
      `${slug} : les ancres du corps et le sommaire divergent (ordre compris).\n` +
        `  corps   : ${anchors.join(", ")}\n  sommaire: ${tocIds.join(", ")}`,
    );
  });

  test(`${slug} — un seul H1`, () => {
    let inCode = false;
    let h1 = 0;
    for (const line of String(article.content).split("\n")) {
      if (/^\s*```/.test(line)) {
        inCode = !inCode;
        continue;
      }
      if (!inCode && /^#\s+/.test(line)) h1++;
    }
    assert.equal(h1, 1, `${slug} : ${h1} H1 hors blocs de code (attendu 1)`);
  });

  test(`${slug} — survit au pipeline de rendu`, () => {
    const html = markdownToHtml(String(article.content));
    assert.ok(html.length > 0, `${slug} : rendu vide`);

    // Chaque ancre du sommaire doit exister dans le HTML produit, sinon les
    // liens du sommaire pointent dans le vide.
    for (const entry of article.tableOfContents as Array<{ id: string }>) {
      assert.ok(
        html.includes(`id="${entry.id}"`),
        `${slug} : l'ancre #${entry.id} est absente du HTML rendu`,
      );
    }

    // sanitize-html retire ce qu'il n'autorise pas. Si du markdown brut se
    // retrouve dans le texte visible, c'est que la syntaxe n'a pas été
    // interprétée (le bug historique du renderer link()).
    const visible = html.replace(/<[^>]+>/g, "");
    assert.ok(!/\*\*[^*\n]{2,40}\*\*/.test(visible), `${slug} : gras markdown non interprété`);
  });
}
