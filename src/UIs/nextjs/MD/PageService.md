# PROMPT MAÎTRE — Page **Services** (conversion directe)

> Objectif : créer une page **/services** claire, professionnelle et orientée conversion qui présente les 3 pôles clés de SMIDJAN, en **réutilisant strictement** les composants et styles existants (layout, section, cards, listes, CTA, accordéon si nécessaire). **Aucune icône** ni nouveau pattern visuel.

---

## 1) Rôle de Codex

Tu es **Codex**, développeur front‑end senior. Tu dois livrer une page **production‑ready** :

* Route : `/services` (et ajout dans la navbar si elle existe déjà sans casser l’UX).
* Réutiliser le même layout que Home/About (header, footer, container, spacing, radius, ombres).
* Reprendre **les mêmes composants de cards** que la Home pour assurer une parité visuelle.
* Aucun ajout d’icônes ou d’images décoratives.

---

## 2) SEO & metadata

* **Title** : Services — Développement Web, Cybersécurité, Automatisation & IA | SMIDJAN
* **Description** : Des services pensés pour la performance, la sécurité et la scalabilité : développement web sur mesure, cybersécurité (audit, durcissement, monitoring) et automatisation & IA (workflows, n8n, agents).
* Canonical : `/services`
* Open Graph/Twitter : reprendre l’identité du site (sans créer de nouveaux visuels si non prévus).

---

## 3) Structure de page (sections)

### A. **Hero / Intro**

* **H1** : Des services pensés pour la performance, la sécurité et la scalabilité
* **Lead** (2 lignes max) : Nous concevons, sécurisons et automatisons des systèmes web qui tiennent dans le temps. Un seul objectif : livrer vite, propre et mesurable, sans complexité inutile.
* **CTA primaire** : Démarrer un projet → `/contact`
* **CTA secondaire** : Découvrir le CMS → `/produits/cms-ecommerce`

### B. **Les 3 pôles (grid de 3 cards — mêmes composants que la Home)**

> Chaque card = Titre (H3) + paragraphe court + liste de 3–5 puces max. **Pas d’icônes.**

#### 1) **Développement Web**

Texte : Applications et sites sur mesure (Next.js, TypeScript), front découplé et CMS modulaire. Architecture propre, accessible et performante.
Puces :

* Next.js, TypeScript, API REST/GraphQL
* CMS modulaire (catalogue, contenu, SEO)
* Intégrations paiement et facturation UE
* Performance et Core Web Vitals
* Documentation et passation

#### 2) **Cybersécurité Web**

Texte : Sécurité intégrée au cycle de vie : audit, durcissement, supervision et réponses rapides.
Puces :

* Audit OWASP et revue d’architecture
* Durcissement (headers, secrets, auth)
* CI/CD sécurisée et scans réguliers
* Monitoring, alertes et journaux d’audit
* Plan d’action et remédiation

#### 3) **Automatisation & IA**

Texte : Automatiser les processus métiers : n8n, webhooks et IA pour accélérer le quotidien sans code superflu.
Puces :

* Workflows n8n (CRM, facturation, emailing)
* Connecteurs ERP/CRM/analytics
* IA via API (génération de contenus, tagging, recommandations)
* Webhooks sécurisés (signatures, replay)
* Tableaux de bord et reporting

### C. **Méthode / Process (optionnel, 4 étapes en ligne)**

> Réutiliser le composant “steps/timeline” s’il existe, sinon 4 mini‑blocs en grid utilisant les cards standards.

* Cadrage → Architecture → Implémentation → Livraison & suivi
* Texte court : Un cycle clair, documenté, avec des jalons vérifiables à chaque étape.

### D. **Preuve / Étude courte (optionnelle)**

* Bloc court qui renvoie vers le **CMS SMIDJAN** comme projet phare :
  « Un socle e‑commerce modulaire, sécurisé et personnalisable — voir la page produit ».
* Bouton : Découvrir le CMS → `/produits/cms-ecommerce`

### E. **CTA final**

* Titre : Besoin d’un accompagnement sur mesure ?
* Texte : Parlons de votre contexte et de vos contraintes. Nous proposons une mise en route claire et un planning réaliste.
* Bouton unique (primaire) : **Démarrer un projet** → `/contact`

---

## 4) Contraintes UI/UX

* Parité totale avec Home/About : même conteneur, grilles, radius, ombres, interlignages.
* Aucune icône.
* Listes courtes (≤5 puces) ; une idée par puce ; phrases de 6–10 mots.
* Responsive identique à la Home (1/2/3 colonnes selon breakpoints existants).
* Respect des tokens (couleurs, borders, hover, focus).
* Accessibilité : titres hiérarchisés, `aria-labelledby` sur section, liens descriptifs.

---

## 5) Suivi & navigation

* Ajouter le lien **Services** dans la navbar (si non présent), à côté de About et CMS.
* Vérifier que les CTAs mènent à `/contact` et `/produits/cms-ecommerce`.

---

## 6) Résultat attendu

* Page `/services` prête en production, cohérente avec l’identité visuelle.
* Message clair, sans jargon inutile.
* Section finale orientée conversion, sans multi‑CTA confus.

---

## 7) Checklist QA

* [ ] Lint/Typecheck OK
* [ ] Pas d’icônes ajoutées
* [ ] Responsive : mobile 1 col, tablette 2, desktop 3
* [ ] Contrastes conformes
* [ ] Tous les liens fonctionnent
* [ ] Aucune duplication de styles

---

## 8) Commit attendu

`feat(pages): add /services with 3 pillars and conversion CTA`
