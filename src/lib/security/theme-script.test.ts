import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { THEME_INIT_SCRIPT, themeScriptCspHash } from "./theme-script";

/**
 * Ces tests protègent un couplage silencieux : le script de thème est injecté
 * inline dans app/layout.tsx et autorisé par un `'sha256-…'` dans le script-src
 * construit par src/proxy.ts. Si les deux divergent, le navigateur refuse le
 * script — pas d'erreur serveur, pas de test rouge, juste un flash de thème
 * clair chez les visiteurs en sombre. D'où l'épinglage.
 */

test("le hash CSP correspond exactement au script", () => {
  const expected = createHash("sha256")
    .update(THEME_INIT_SCRIPT, "utf8")
    .digest("base64");
  assert.equal(themeScriptCspHash(), `'sha256-${expected}'`);
});

test("le hash a la forme attendue par la CSP", () => {
  // 'sha256-' + 44 caractères base64 (32 octets), apostrophes incluses.
  assert.match(themeScriptCspHash(), /^'sha256-[A-Za-z0-9+/]{43}='$/);
});

test("le script ne contient ni saut de ligne ni espace en bordure", () => {
  // Le digest doit couvrir le texte EXACTEMENT tel qu'il apparaît entre les
  // balises <script>. Un espace ou un retour à la ligne ajouté par un
  // formateur changerait le hash calculé par le navigateur, mais pas celui-ci.
  assert.equal(THEME_INIT_SCRIPT, THEME_INIT_SCRIPT.trim());
  assert.ok(!/[\r\n]/.test(THEME_INIT_SCRIPT), "le script doit tenir sur une ligne");
});

test("le script fait ce qu'il annonce", () => {
  // Exécution réelle dans un faux DOM minimal : on vérifie qu'il lit la clé
  // attendue, applique un choix stocké valide et retombe sur "light" sinon.
  const run = (stored: string | null) => {
    let applied: string | null = null;
    const sandbox = {
      localStorage: { getItem: (k: string) => (k === "smidjan-theme" ? stored : null) },
      document: {
        documentElement: {
          setAttribute: (name: string, value: string) => {
            if (name === "data-theme") applied = value;
          },
        },
      },
    };
    // new Function() est ici volontaire et sûr : le corps est THEME_INIT_SCRIPT,
    // une constante littérale de ce dépôt, jamais une entrée externe et sans
    // aucune interpolation. C'est le seul moyen d'exécuter réellement le script
    // tel qu'il sera servi, plutôt que de tester une copie qui pourrait diverger.
    new Function("localStorage", "document", THEME_INIT_SCRIPT)(
      sandbox.localStorage,
      sandbox.document,
    );
    return applied;
  };

  assert.equal(run("dark"), "dark");
  assert.equal(run("light"), "light");
  assert.equal(run(null), "light", "aucun choix stocké → light");
  assert.equal(run("bogus"), "light", "valeur invalide → light");
});
