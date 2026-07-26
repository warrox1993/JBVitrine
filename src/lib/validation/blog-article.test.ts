import { test } from "node:test";
import assert from "node:assert/strict";
import { validateBlogArticle } from "./blog-article";

const valid = {
  slug: "nis2-en-belgique",
  title: "NIS2 en Belgique",
  excerpt: "Ce que la directive change pour les PME.",
  publishedAt: "2026-07-25T10:00:00.000Z",
  category: "Conformité",
  readTime: "8 min",
  content: "# Titre\n\nDu contenu markdown.",
  tableOfContents: [{ title: "Titre", id: "titre" }],
};

test("accepte un article valide", () => {
  const result = validateBlogArticle(valid);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.article.slug, "nis2-en-belgique");
    assert.deepEqual(result.article.tableOfContents, [
      { title: "Titre", id: "titre" },
    ]);
  }
});

test("rejette les types non-chaîne (le bug corrigé)", () => {
  // Une annotation `BlogArticle` est effacée à la compilation : ces payloads
  // atteignaient le JSON stocké tels quels.
  assert.equal(validateBlogArticle({ ...valid, slug: { a: 1 } }).ok, false);
  assert.equal(validateBlogArticle({ ...valid, title: ["a", "b"] }).ok, false);
  assert.equal(validateBlogArticle({ ...valid, content: 42 }).ok, false);
});

test("rejette une date de publication invalide", () => {
  // C'est la valeur dont dépend le tri de /blog : NaN cassait la page.
  const bad = validateBlogArticle({ ...valid, publishedAt: "pas-une-date" });
  assert.equal(bad.ok, false);
  if (!bad.ok) assert.match(bad.error, /publishedAt/);
});

test("rejette un slug non conforme", () => {
  assert.equal(validateBlogArticle({ ...valid, slug: "Avec Majuscules" }).ok, false);
  assert.equal(validateBlogArticle({ ...valid, slug: "../../etc/passwd" }).ok, false);
  assert.equal(validateBlogArticle({ ...valid, slug: "-commence-par-tiret" }).ok, false);
});

test("rejette les champs inconnus", () => {
  const bad = validateBlogArticle({ ...valid, isAdmin: true });
  assert.equal(bad.ok, false);
  if (!bad.ok) assert.match(bad.error, /isAdmin/);
});

test("borne la taille du contenu", () => {
  const bad = validateBlogArticle({ ...valid, content: "x".repeat(200 * 1024 + 1) });
  assert.equal(bad.ok, false);
});

test("valide la table des matières", () => {
  assert.equal(
    validateBlogArticle({ ...valid, tableOfContents: "pas-un-tableau" }).ok,
    false,
  );
  assert.equal(
    validateBlogArticle({
      ...valid,
      tableOfContents: [{ title: "T", id: "id avec espaces" }],
    }).ok,
    false,
  );
  assert.equal(
    validateBlogArticle({
      ...valid,
      tableOfContents: Array.from({ length: 101 }, (_, i) => ({
        title: `T${i}`,
        id: `t${i}`,
      })),
    }).ok,
    false,
  );
  // tableOfContents absente = tableau vide, pas une erreur.
  const withoutToc = { ...valid };
  delete (withoutToc as Partial<typeof valid>).tableOfContents;
  const ok = validateBlogArticle(withoutToc);
  assert.equal(ok.ok, true);
  if (ok.ok) assert.deepEqual(ok.article.tableOfContents, []);
});

test("n'accepte qu'un chemin local pour coverImage", () => {
  const ok = validateBlogArticle({ ...valid, coverImage: "/images/blog/nis2.jpg" });
  assert.equal(ok.ok, true);
  assert.equal(
    validateBlogArticle({ ...valid, coverImage: "https://evil.com/x.jpg" }).ok,
    false,
  );
  assert.equal(
    validateBlogArticle({ ...valid, coverImage: "/images/../../secret" }).ok,
    false,
  );
});

test("rejette une URL protocol-relative en coverImage (le bug corrigé)", () => {
  // "//evil.com/x.jpg" commence par "/" et ne contient pas "..", donc la
  // première version de la regex l'acceptait : le navigateur la résout en
  // https://evil.com/x.jpg.
  for (const payload of [
    "//evil.com/x.jpg",
    "////evil.com/x.jpg",
    "//evil.com",
  ]) {
    assert.equal(
      validateBlogArticle({ ...valid, coverImage: payload }).ok,
      false,
      `payload accepté : ${payload}`,
    );
  }
});

test("rejette un corps qui n'est pas un objet", () => {
  assert.equal(validateBlogArticle(null).ok, false);
  assert.equal(validateBlogArticle("chaîne").ok, false);
  assert.equal(validateBlogArticle([valid]).ok, false);
});
