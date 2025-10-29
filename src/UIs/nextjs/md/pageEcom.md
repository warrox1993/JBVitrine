# PROMPT MAÎTRE — Génération **Page Produit** pour SMIDJAN CMS e‑commerce (parité design 100 %)

> Objectif : produire **une page produit complète** pour le CMS e‑commerce SMIDJAN, **identique visuellement** au reste du site (sidebar, navbar, header, footer, cards, typographies, tokens, espacements, boutons…). Le code doit **réutiliser** les composants et styles existants. Pas de nouveaux patterns visuels.

---

## 1) Rôle & posture de l’IA de code

Tu es **Codex/Dev senior front-end**. Tu dois livrer **du code production-ready**, soigné, **strictement cohérent** avec l’existant. Tu raisonnes avant d’écrire, tu références les composants existants, tu n’introduis **aucun** nouveau style global.

---

## 2) Contexte projet (à déduire automatiquement)

* Détecte automatiquement le **stack** et les **conventions** du repo (ex. Next.js, React, Router, CSS Modules, tokens CSS, etc.).
* **Réutilise** les composants globaux (ex. `Sidebar`, `Navbar`, `Header`, `Footer`, `Card`, `Section`, `Container`, `Button`).
* **Réutilise** les **variables/tokens** (couleurs, radius, ombres, spacing), la grille responsive et les utilitaires existants.
* Si un composant n’existe pas, **crée un thin-wrapper** qui **compose** les composants existants (pas de nouveau design).

> Règle d’or : **parité visuelle 100 %**. Même layout, même densité, mêmes rayons, mêmes ombres, mêmes focus states.

---

## 3) Livrable attendu

* **Une page produit dédiée** au CMS e‑commerce :

  * **Route** : `/produits/cms-ecommerce` (et alias `/cms-ecommerce`).
  * **Fichier** : respecte la structure du projet (ex. `app/produits/cms-ecommerce/page.tsx` ou `pages/produits/cms-ecommerce.tsx`).
  * **Composant** par défaut exporté.
  * **Aucune** régression sur la `Sidebar`, `Navbar`, `Footer` (importer les mêmes composants que la Home/About).
  * **SEO** complet : `metadata`, Open Graph, Twitter cards, canonical, `robots`.
  * **JSON‑LD** : `Product` + `SoftwareApplication` minimal.
  * i18n FR (fr-BE) par défaut.

---

## 4) Structure de contenu (sections obligatoires)

Respecte cet ordre. Chaque section **réutilise** les mêmes composants de section/cartes que la Home.

1. **Hero Produit**

   * Titre : « SMIDJAN CMS — e‑commerce modulaire, performant et sécurisé »
   * Sous-texte orienté valeur : « Gérez produits, services ou les deux. Performance front, sécurité back, automatisations prêtes. »
   * CTA primaire « Demander une démo », CTA secondaire « Voir les plans » (anchor `#plans`).
   * Illustration : mockup/cover (mêmes styles que tes autres visuels). Placeholder autorisé.

2. **Preuves rapides (3–4 badges)**

   * « Performance Core Web Vitals »
   * « Sécurité intégrée (OWASP, headers, secrets) »
   * « Intégrations Stripe / n8n / emailing »
   * « Multi‑catalogue produits & services »

3. **Bénéfices clés (grid de 6)**

   * Vitesse de mise en ligne
   * Admin simple et documenté
   * SEO technique & accessibilité
   * Scalabilité (architecture propre)
   * Automatisations n8n (CRM, facturation)
   * Observabilité & logs

4. **Fonctionnalités (groupées par modules)**

   * Catalogue : produits, services, variantes, attributs, catégories, SKU, inventaire.
   * Paiements & facturation : Stripe, virement, facture EU.
   * Commandes & logistique : statuts, notifications, transporteurs.
   * CMS & contenu : pages, blog/ressources, SEO, media.
   * Sécurité : auth, gestion secrets, headers, DAST/SAST (si pack pro/premium).
   * Analytics & reporting : tableaux, exports CSV.

5. **Plans & tarifs (MVP / Pro / Premium)** — **même style de cartes que Home**

   * MVP : base e‑commerce opérationnelle (produits OU services, panier, paiement, factures, SEO de base).
   * Pro : + sécurité CI/CD, + automatisations n8n, + optimisation perf & SEO, + monitoring.
   * Premium : + scalabilité avancée, + catalogue mixte produits & services, + intégrations sur mesure, + SLA.
   * Boutons : « Demander un devis » (→ `/contact`) et « Voir le détail du plan » (anchors internes `#mvp`, `#pro`, `#premium`).

6. **Intégrations** (logos + liste) : Stripe, n8n, email, hébergement/cloud (placeholder), Key Vault/KMS.

7. **Captures & démos** (carousel ou grid) — placeholders acceptés.

8. **Cas client / Étude rapide** (même composant que Home) — chiffres synthétiques.

9. **FAQ** (accordéons réutilisés)** : licence, personnalisation, délais, SEO, sécurité, propriété du code, formation.

10. **CTA final** : « Prêt à lancer ? » + bouton vers `/contact`.

---

## 5) Contraintes de design & accessibilité

* **Aucun nouveau style global**. Réutilise classnames/variables existants.
* Respect **focus states**, contrastes, aria‑labels, `alt` sur images.
* Responsive : mobile‑first, breakpoints identiques au reste du site.
* Pas d’images externes bloquantes ; utiliser `next/image` ou équivalent du projet.

---

## 6) SEO & données structurées (exemple à adapter)

* Title : « SMIDJAN CMS e‑commerce — rapide, sécurisé, modulaire »
* Description : « CMS e‑commerce pour produits, services ou les deux : performance, sécurité OWASP, Stripe, n8n, SEO, facturation EU. »
* Canonical : `/produits/cms-ecommerce`
* JSON‑LD `Product` + `SoftwareApplication` minimal (nom, description, brand « SMIDJAN », offers `"price": "Sur devis"`).

---

## 7) Formulaires & liens

* Tous les CTA « Demander une démo / devis » pointent vers `/contact` (ou endpoint existant).
* Si un formulaire inline est prévu, **réutilise** le composant formulaire de la Home (mêmes validations, messages d’erreur, antispam).

---

## 8) Qualité, tests et perfs

* Lint/Typecheck sans erreur.
* Aucune console.warn/error au runtime.
* Import **arbres** (pas de grosses libs inutiles).
* **Audit rapide** : LCP, INP, CLS conformes aux pages existantes.
* Tests légers (si test framework présent) : rendu de la page, présence des sections clés, anchors fonctionnels.

---

## 9) Plan d’implémentation — étapes exécutives

1. Scanner le repo → lister composants réutilisables (sidebar, navbar, footer, section, card, button, accordion, tabs).
2. Créer la route `/produits/cms-ecommerce` + page.
3. Composer la page avec les **mêmes** conteneurs/layouts.
4. Ajouter métadonnées SEO + JSON‑LD.
5. Brancher les CTA vers `/contact` + anchors internes.
6. Ajouter placeholders d’images/démos.
7. Vérifier responsive, a11y, tokens.
8. Lancer tests rapides et corriger.

---

## 10) Format de sortie

* Fournis :

  * Les **fichiers créés/modifiés** avec leur chemin.
  * Le **code complet** de la page et des wrappers éventuels.
  * Les blocs `metadata`/`head` et le JSON‑LD.
  * Une **checklist de validation** finale (5–8 points) que je peux cocher.

---

## 11) Contenu rédactionnel initial (tu peux l’injecter tel quel)

* Hero :

  * H1 : « SMIDJAN CMS — e‑commerce modulaire, performant et sécurisé »
  * P : « Lancez une boutique produits, services, ou hybride. Architecture propre, sécurité intégrée, automations prêtes à l’emploi. »
  * CTA1 « Demander une démo », CTA2 « Voir les plans ».
* Bénéfices (6 items) et Fonctionnalités (modules) : reprendre la liste du §4.
* Plans : 3 cartes « MVP / Pro / Premium » avec puces synthétiques.
* FAQ : 6–8 questions standards.
* CTA final : « Prêt à lancer ? Discutons de votre projet. »

---

## 12) Stop‑conditions (ne pas faire)

* Ne pas introduire de nouveaux styles, couleurs, tailles, ombres, polices.
* Ne pas casser la grille ni la sidebar/navbar/footer.
* Ne pas créer de dépendances lourdes.
* Ne pas inventer de textes marketing extravagants : rester sobre et pro.

---

## 13) Critères d’acceptation

* Parité visuelle **indiscernable** avec Home/About (hors contenu).
* Navigation latérale et topbar inchangées.
* Sections présentes dans l’ordre défini.
* SEO + JSON‑LD valides.
* CTA fonctionnels, anchors internes OK.
* Lint/typecheck OK, pas d’erreurs en console.

> Quand tu as un doute sur un composant, **réutilise** celui de la Home. Pas d’exception.
