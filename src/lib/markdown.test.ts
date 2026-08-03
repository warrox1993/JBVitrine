import { test } from "node:test";
import assert from "node:assert/strict";
import { markdownToHtml, stripLeadingH1 } from "./markdown";

/**
 * Ces tests verrouillent DEUX choses à la fois :
 *  1. la sanitization (marked + sanitize-html) — le seul endroit du site qui
 *     rend du contenu rédigé en HTML brut via dangerouslySetInnerHTML ;
 *  2. le rendu markdown de base — garde-fou de régression lors des montées de
 *     version de `marked` (v18 change le pipeline de rendu).
 */

test("supprime les balises script", () => {
  const out = markdownToHtml("Avant <script>alert(1)</script> après");
  assert.ok(!out.includes("<script"), out);
  assert.ok(!out.includes("alert(1)"), out);
});

test("retire les gestionnaires d'événements inline", () => {
  for (const payload of [
    '<img src=x onerror="alert(1)">',
    '<div onclick="alert(1)">x</div>',
    '<body onload="alert(1)">',
    '<img src="x" OnErRoR="alert(1)">',
  ]) {
    const out = markdownToHtml(payload);
    assert.ok(!/on\w+\s*=/i.test(out), `${payload} -> ${out}`);
  }
});

test("neutralise les schémas d'URL dangereux", () => {
  const js = markdownToHtml("[clic](javascript:alert(1))");
  assert.ok(!js.toLowerCase().includes("javascript:"), js);

  const data = markdownToHtml("[clic](data:text/html;base64,PHNjcmlwdD4=)");
  assert.ok(!data.toLowerCase().includes("data:text/html"), data);

  const vb = markdownToHtml("[clic](vbscript:msgbox(1))");
  assert.ok(!vb.toLowerCase().includes("vbscript:"), vb);
});

test("supprime iframe, style, form et svg", () => {
  const out = markdownToHtml(
    '<iframe src="https://evil.com"></iframe>' +
      "<style>body{display:none}</style>" +
      '<form action="/x"><input name="y"></form>' +
      "<svg onload=alert(1)></svg>",
  );
  for (const tag of ["<iframe", "<style", "<form", "<input", "<svg"]) {
    assert.ok(!out.includes(tag), `${tag} présent dans ${out}`);
  }
});

test("retire l'attribut style (CSS injection)", () => {
  const out = markdownToHtml('<span style="position:fixed;inset:0">x</span>');
  assert.ok(!out.includes("style="), out);
});

test("force rel=noopener noreferrer sur les liens", () => {
  const out = markdownToHtml('<a href="https://x.com" target="_blank">x</a>');
  assert.match(out, /rel="noopener noreferrer"/);
});

test("échappe le contenu des blocs de code", () => {
  const out = markdownToHtml("```\n<script>alert(1)</script>\n```");
  assert.ok(!out.includes("<script>"), out);
  assert.match(out, /&lt;script&gt;/);
});

test("contraint les ancres de titre personnalisées", () => {
  const ok = markdownToHtml("# Titre {#mon-id}");
  assert.match(ok, /id="mon-id"/);

  // La regex d'ancre n'accepte que [a-z0-9-]. Une tentative d'injection
  // d'attribut ne doit pas matcher : la propriété qui compte est que la balise
  // ouvrante reste SANS attribut (le payload finit en simple texte, inoffensif).
  const bad = markdownToHtml('# Titre {#"onmouseover="alert(1)}');
  const openingTag = bad.match(/<h1[^>]*>/)?.[0];
  assert.equal(openingTag, "<h1>", `attribut injecté dans ${openingTag}`);

  // Idem avec des majuscules et un espace, hors du jeu autorisé.
  const bad2 = markdownToHtml("# Titre {#Mon Id}");
  assert.equal(bad2.match(/<h1[^>]*>/)?.[0], "<h1>");
});

test("rend le markdown imbriqué dans le libellé d'un lien", () => {
  // Régression corrigée : `link()` interpolait le markdown brut, donc
  // `[**gras**](url)` affichait littéralement « **gras** ».
  const out = markdownToHtml("[**gras**](https://ok.com)");
  assert.match(out, /<strong>gras<\/strong>/, out);
  assert.ok(!out.includes("**gras**"), out);
});

test("rend correctement le markdown de base (garde-fou marked)", () => {
  assert.match(markdownToHtml("# Titre"), /<h1>Titre<\/h1>/);
  assert.match(markdownToHtml("**gras**"), /<strong>gras<\/strong>/);
  assert.match(markdownToHtml("*italique*"), /<em>italique<\/em>/);
  assert.match(markdownToHtml("- un\n- deux"), /<li>un<\/li>/);
  assert.match(markdownToHtml("[lien](https://ok.com)"), /href="https:\/\/ok\.com"/);
  assert.match(markdownToHtml("> citation"), /<blockquote>/);
  // GFM : tableaux activés via gfm: true
  assert.match(markdownToHtml("| a | b |\n|---|---|\n| 1 | 2 |"), /<table>/);
});

test("renvoie une chaîne vide sur entrée vide", () => {
  assert.equal(markdownToHtml(""), "");
});

/**
 * stripLeadingH1 — les articles répétaient leur propre titre en tête de corps,
 * en 80px alors que le vrai <h1> de la page en fait 44 : deux <h1> sur la même
 * page, et un déséquilibre visuel à l'ouverture de chaque article.
 */
test("stripLeadingH1 retire le titre en tête et les blancs qui suivent", () => {
  const out = stripLeadingH1("# Mon titre\n\n\nPremier paragraphe.\n");
  assert.equal(out, "Premier paragraphe.\n");
});

test("stripLeadingH1 ne touche qu'au PREMIER H1 et laisse les autres titres", () => {
  const out = stripLeadingH1("# Titre\n\n## Section {#section}\n\nTexte.\n# Autre\n");
  assert.equal(out, "## Section {#section}\n\nTexte.\n# Autre\n");
});

test("stripLeadingH1 ignore les # à l'intérieur d'un bloc de code", () => {
  // Un commentaire shell n'est pas un titre : le retirer casserait l'exemple.
  const src = "```bash\n# installe le paquet\napt install nginx\n```\n\n# Vrai titre\n\nTexte.\n";
  assert.equal(stripLeadingH1(src), "```bash\n# installe le paquet\napt install nginx\n```\n\nTexte.\n");
});

test("stripLeadingH1 laisse intact un contenu sans H1", () => {
  const src = "## Direct en section\n\nTexte.\n";
  assert.equal(stripLeadingH1(src), src);
});

test("stripLeadingH1 ne confond pas un ## avec un #", () => {
  const src = "## Pas un H1\n\nTexte.\n";
  assert.equal(stripLeadingH1(src), src);
});
