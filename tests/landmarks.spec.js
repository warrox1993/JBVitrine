import { test, expect } from "@playwright/test";

/**
 * Garde-fou sur les repères de navigation.
 *
 * Deux défauts réels, trouvés en production, motivent ce fichier :
 *
 *  1. Le composant SectionRail avait une valeur par défaut `ariaLabel =
 *     "Sommaire"`, chaîne française codée en dur. Six pages ne passaient pas la
 *     prop : les versions néerlandaise et anglaise annonçaient donc « Sommaire »
 *     à leurs lecteurs d'écran. Rien ne l'attrapait — le site s'affichait
 *     parfaitement.
 *
 *  2. Sur les articles, le rail ET le sommaire en ligne portaient tous deux
 *     « Sommaire de l'article ». Un lecteur d'écran listant les repères de la
 *     page en affichait donc deux, identiques et indistinguables.
 *
 * Ces deux erreurs sont invisibles à l'œil et au build. Elles ne se voient qu'en
 * lisant l'arbre d'accessibilité, ce que fait ce test.
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

const PAGES = [
  { url: "/", langue: "fr" },
  { url: "/projets", langue: "fr" },
  { url: "/services", langue: "fr" },
  { url: "/agence", langue: "fr" },
  { url: "/maintenant", langue: "fr" },
  { url: "/conformite-nis2", langue: "fr" },
  { url: "/blog/cyfun-vs-iso-27001-nis2-que-choisir", langue: "fr" },
  { url: "/en", langue: "en" },
  { url: "/en/projets", langue: "en" },
  { url: "/nl", langue: "nl" },
  { url: "/nl/projets", langue: "nl" },
];

/**
 * Mots dont la présence dans un nom de repère trahit une locale non traduite.
 * Volontairement courte et sans ambiguïté : « navigation » est identique en
 * français et en anglais, il n'a donc rien à faire ici.
 */
const MOTS_FRANCAIS = ["sommaire", "sections de la page", "aller au contenu", "pied de page"];

test.describe("Repères de navigation", () => {
  for (const { url, langue } of PAGES) {
    test(`${url} — noms uniques et dans la bonne langue`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${url}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      expect(response.status(), `${url} n'a pas répondu 200`).toBe(200);

      const releve = await page.evaluate(() => {
        const noms = [...document.querySelectorAll("nav")].map((n) => {
          const parEtiquette = n.getAttribute("aria-labelledby");
          const nom =
            n.getAttribute("aria-label") ||
            (parEtiquette ? document.getElementById(parEtiquette)?.textContent?.trim() : null);
          return nom || "(sans nom)";
        });
        return { noms, langue: document.documentElement.lang };
      });

      expect(releve.langue, `${url} : attribut lang inattendu`).toBe(langue);

      // 1. Aucun repère de navigation nommé deux fois.
      const compte = new Map();
      for (const nom of releve.noms) {
        if (nom === "(sans nom)") continue;
        compte.set(nom, (compte.get(nom) ?? 0) + 1);
      }
      const doublons = [...compte].filter(([, n]) => n > 1);
      expect(
        doublons,
        `${url} : plusieurs <nav> partagent le même nom accessible, ils sont ` +
          `indistinguables au lecteur d'écran — ${doublons
            .map(([nom, n]) => `« ${nom} » ×${n}`)
            .join(", ")}`,
      ).toEqual([]);

      // 2. Aucun nom français sur une page qui ne l'est pas.
      if (langue !== "fr") {
        const fuites = releve.noms.filter((nom) =>
          MOTS_FRANCAIS.some((mot) => nom.toLowerCase().includes(mot)),
        );
        expect(
          fuites,
          `${url} (lang="${langue}") : nom(s) de repère restés en français — ` +
            `${fuites.map((f) => `« ${f} »`).join(", ")}`,
        ).toEqual([]);
      }
    });
  }
});
