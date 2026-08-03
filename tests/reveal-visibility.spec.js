import { test, expect } from "@playwright/test";

/**
 * Non-régression : le contenu enveloppé dans <Reveal> doit finir VISIBLE.
 *
 * Reveal masque son contenu en CSS (`opacity: 0` sur `.reveal` et sur
 * `.stagger > *`) et ne le dévoile qu'en ajoutant la classe `.in` quand un
 * IntersectionObserver se déclenche. L'observateur utilisait `threshold: 0.12`.
 * Or `threshold` est une fraction de l'ÉLÉMENT observé, pas de la fenêtre : un
 * bloc plus haut qu'environ 8x la fenêtre ne peut jamais l'atteindre. En
 * production, la grille de /blog mesurait 7457 px sur un écran de 390x844 —
 * ratio plafonné à 0.104, donc sous le seuil de 0.12 — et les 12 cartes
 * d'articles restaient invisibles même après avoir scrollé toute la page.
 *
 * Le test descend chaque page par paliers, comme un lecteur, puis vérifie que
 * chaque enveloppe Reveal a bien été révélée et que rien ne reste illisible.
 * Il tourne en mobile ET en desktop : le bug ne se voyait qu'en mobile (en
 * 1440x900 la grille tenait sous les 8x, le seuil était atteint, et un test
 * desktop seul serait passé sans rien attraper).
 */

/**
 * URL de base. Par défaut le `npm run start` local piloté par
 * playwright.config.ts (même cible que browser-errors.spec.js) ; surchargeable
 * pour viser la production :
 *   PLAYWRIGHT_BASE_URL=https://smidjan.be npx playwright test tests/reveal-visibility.spec.js
 */
const BASE_URL = (
  process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Les classes sont hachées par CSS Modules (`Reveal-module__Pv9JGW__reveal`,
 * et le hash change à chaque build) : on cible donc par sous-chaîne stable.
 */
const REVEAL_SELECTOR = '[class*="Reveal-module"]';

/**
 * La classe révélée du même module (`Reveal-module__<hash>__in`), qui bascule
 * l'opacité à 1. Son absence EST le bug, indépendamment de ce que le CSS de la
 * page fait par ailleurs.
 */
const IN_CLASS_PATTERN = "^Reveal-module__[A-Za-z0-9_-]+__in$";

/**
 * Seuils d'opacité.
 *
 * La règle demandée est « aucun contenu sous une opacité calculée de 1 ». Prise
 * au pied de la lettre elle épinglerait aussi les nuances assumées par le
 * design (`.availability` du hero est à `opacity: .85` dans Hero.module.css :
 * du texte secondaire, parfaitement lisible, sur une enveloppe déjà révélée).
 * On distingue donc deux cas :
 *
 *   - RÉGRESSION : l'enveloppe Reveal n'a jamais reçu sa classe `in` (le
 *     mécanisme est resté bloqué — le bug du threshold), OU l'opacité rend le
 *     contenu illisible (< LISIBILITE_MIN) alors que tout devrait être stable.
 *   - NUANCE ASSUMÉE : opacité < 1 mais enveloppe révélée et contenu lisible.
 *     Journalisée à chaque exécution, jamais masquée en silence.
 *
 * La tolérance est délibérément ÉTROITE : elle n'excuse que ce qui reste
 * lisible sur un mécanisme d'animation qui a bien fonctionné.
 */
const OPACITE_PLEINE = 0.99;
const LISIBILITE_MIN = 0.5;

/** Attente entre deux paliers de scroll, pour laisser l'observateur réagir. */
const PALIER_MS = 220;

/**
 * Attente finale : la transition CSS dure 0.62 s et le stagger ajoute jusqu'à
 * 0.52 s de `transition-delay` sur le 8e enfant, soit ~1.15 s. On arrondit.
 */
const TRANSITION_MS = 1500;

/** Nombre de blocs détaillés dans le message d'échec avant de résumer. */
const MAX_DETAIL = 6;

/**
 * Routes du site public qui utilisent <Reveal> (locale FR servie sans préfixe,
 * cf. src/i18n/routing.ts). /contact en utilise aussi mais dépend de
 * NEXT_PUBLIC_RECAPTCHA_SITE_ID : elle est déjà couverte par
 * browser-errors.spec.js et reste hors de ce test pour ne pas dépendre de l'env.
 */
const pages = [
  { url: "/", name: "Accueil" },
  { url: "/blog", name: "Journal" },
  // Un article : c'est la page la plus HAUTE du site, donc la plus exposée au
  // bug. Même slug que browser-errors.spec.js ; s'il disparaît, l'attente d'un
  // 200 fait échouer le test bruyamment plutôt que de le vider en silence.
  { url: "/blog/securiser-application-web-owasp-belgique", name: "Article" },
  { url: "/projets", name: "Projets" },
  { url: "/cv", name: "CV" },
  { url: "/services", name: "Services" },
  { url: "/agence", name: "Agence" },
  { url: "/conformite-nis2", name: "Conformité NIS2" },
  { url: "/maintenant", name: "Maintenant" },
];

const viewports = [
  // Le bug ne se manifestait qu'ici : iPhone 12/13/14, la taille la plus
  // courante en mobile — et celle où les grilles sont les plus hautes.
  { name: "mobile 390x844", width: 390, height: 844 },
  { name: "desktop 1440x900", width: 1440, height: 900 },
];

/**
 * Descend la page par paliers de 70 % de la fenêtre, comme un lecteur.
 * `behavior: "instant"` neutralise le `scroll-behavior: smooth` global
 * (src/app/globals.css) qui rendrait la position imprévisible entre deux pas.
 * La boucle est bornée : du contenu chargé paresseusement peut allonger la page
 * pendant la descente.
 */
async function lirePageEnEntier(page) {
  for (let palier = 0; palier < 200; palier += 1) {
    const arriveEnBas = await page.evaluate(() => {
      const avant = window.scrollY;
      window.scrollTo({
        top: avant + Math.round(window.innerHeight * 0.7),
        behavior: "instant",
      });
      const doc = document.documentElement;
      return (
        window.scrollY === avant ||
        window.scrollY + window.innerHeight >= doc.scrollHeight - 2
      );
    });
    await page.waitForTimeout(PALIER_MS);
    if (arriveEnBas) break;
  }
  // Laisser la dernière vague de transitions se jouer jusqu'au bout.
  await page.waitForTimeout(TRANSITION_MS);
}

/**
 * Relève l'état des enveloppes Reveal et de leurs enfants directs.
 * Sont écartés : ce qui n'est pas rendu (display:none, visibility:hidden,
 * taille nulle — masquages responsive délibérés) et ce qui ne porte aucun
 * contenu (ni texte, ni média) : cacher du vide n'est pas une régression.
 */
async function releverEtatDesReveals(page, options) {
  return page.evaluate(
    ({ selector, inPattern, opacitePleine, lisibiliteMin }) => {
      const estRevelee = (el) => {
        const regex = new RegExp(inPattern);
        return Array.from(el.classList).some((c) => regex.test(c));
      };

      const enveloppes = Array.from(document.querySelectorAll(selector));
      const candidats = [];
      for (const enveloppe of enveloppes) {
        candidats.push({ el: enveloppe, estEnveloppe: true });
        for (const enfant of enveloppe.children) {
          candidats.push({ el: enfant, estEnveloppe: false });
        }
      }

      const regressions = [];
      const nuances = [];

      for (const { el, estEnveloppe } of candidats) {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const texte = (el.textContent || "").replace(/\s+/g, " ").trim();
        const media = el.querySelector("img, picture, video, canvas, svg");
        if (!texte && !media) continue;

        const opacite = Number.parseFloat(style.opacity);
        const enveloppe = el.closest(selector);
        const revelee = !!enveloppe && estRevelee(enveloppe);

        const fiche = {
          balise: el.tagName.toLowerCase(),
          classe:
            typeof el.className === "string"
              ? el.className
              : (el.getAttribute("class") ?? ""),
          opacite: style.opacity,
          largeur: Math.round(rect.width),
          hauteur: Math.round(rect.height),
          texte:
            texte.slice(0, 120) ||
            `(média : <${media.tagName.toLowerCase()}>)`,
        };

        // 1) L'enveloppe n'a jamais été révélée : le mécanisme est bloqué.
        //    Signalé sur l'enveloppe elle-même, pour ne pas répéter la même
        //    cause sur chacun de ses enfants.
        if (estEnveloppe && !revelee) {
          regressions.push({
            ...fiche,
            raison: "enveloppe jamais révélée (classe `in` absente)",
          });
          continue;
        }

        if (!Number.isFinite(opacite) || opacite >= opacitePleine) continue;

        // 2) Opacité si basse que le contenu est illisible, alors que le
        //    mécanisme a fonctionné : anomalie réelle, quelle qu'en soit la
        //    cause.
        if (opacite < lisibiliteMin) {
          regressions.push({
            ...fiche,
            raison: `opacité ${style.opacity} : contenu illisible`,
          });
          continue;
        }

        // 3) Nuance assumée par le CSS de la page : journalisée, non bloquante.
        nuances.push(fiche);
      }

      return { total: enveloppes.length, regressions, nuances };
    },
    options,
  );
}

/** Message d'échec : quoi, où, à quelle taille — un échec muet ne sert à rien. */
function decrireLechec(regressions, name, url, viewportName) {
  const lignes = regressions.slice(0, MAX_DETAIL).map((el, i) => {
    const classes = el.classe || "(sans classe)";
    return (
      `  ${i + 1}. <${el.balise} class="${classes}"> — ${el.raison}\n` +
      `     ${el.largeur}x${el.hauteur} px — texte : « ${el.texte} »`
    );
  });

  const reste = regressions.length - lignes.length;
  if (reste > 0) lignes.push(`  … et ${reste} autre(s) bloc(s) dans le même cas.`);

  return (
    `${regressions.length} bloc(s) Reveal resté(s) invisible(s) sur ${name} (${url}) ` +
    `en ${viewportName}, après avoir scrollé toute la page :\n` +
    `${lignes.join("\n")}\n` +
    `Cause historique : IntersectionObserver avec un threshold > 0 dans ` +
    `src/components/ui/Reveal/Reveal.tsx — un bloc plus haut que ~8x la fenêtre ` +
    `ne peut jamais atteindre ce ratio et reste à opacity:0 pour toujours.`
  );
}

viewports.forEach(({ name: viewportName, width, height }) => {
  test.describe(`Reveal — ${viewportName}`, () => {
    test.use({
      viewport: { width, height },
      // Explicite : sous `prefers-reduced-motion: reduce`, Reveal court-circuite
      // l'observateur et tout est visible d'office. Le test passerait alors à
      // vide, sans jamais exercer le chemin buggé.
      reducedMotion: "no-preference",
    });

    pages.forEach(({ url, name }) => {
      test(`${name} (${url}) — aucun bloc ne reste invisible`, async ({ page }) => {
        const response = await page.goto(`${BASE_URL}${url}`, {
          waitUntil: "networkidle",
          timeout: 30000,
        });

        expect(response.status(), `${name} (${url}) n'a pas répondu 200`).toBe(200);

        await lirePageEnEntier(page);

        const { total, regressions, nuances } = await releverEtatDesReveals(page, {
          selector: REVEAL_SELECTOR,
          inPattern: IN_CLASS_PATTERN,
          opacitePleine: OPACITE_PLEINE,
          lisibiliteMin: LISIBILITE_MIN,
        });

        // Garde-fou : si le hachage CSS Modules change et que le sélecteur ne
        // matche plus rien, le test passerait toujours sans rien vérifier.
        expect(
          total,
          `Aucune enveloppe Reveal trouvée sur ${name} (${url}) avec ${REVEAL_SELECTOR} : ` +
            `le sélecteur ne correspond plus au nommage CSS Modules, ce test ne vérifie plus rien.`,
        ).toBeGreaterThan(0);

        console.log(
          `\n✅ ${name} (${url}) — ${viewportName}` +
            `\n   Enveloppes Reveal : ${total}` +
            `\n   Blocs invisibles : ${regressions.length}` +
            `\n   Nuances d'opacité assumées (lisibles, enveloppe révélée) : ${nuances.length}`,
        );
        nuances.forEach((el) =>
          console.log(`      [NUANCE] ${el.classe} — opacity ${el.opacite}`),
        );

        expect(
          regressions,
          decrireLechec(regressions, name, url, viewportName),
        ).toEqual([]);
      });
    });
  });
});
