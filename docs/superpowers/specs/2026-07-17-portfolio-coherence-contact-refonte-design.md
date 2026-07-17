# Design : cohérence portfolio (positionnement + schema + bande recruteur) & refonte page contact

Date : 2026-07-17
Branche : `refonte-home-portfolio`
Statut : validé en brainstorming, en attente de relecture spec

## Contexte

Le site smidjan.be a pivoté (14/07) d'une vitrine d'agence cyber commerciale vers un
**portfolio solo honnête** orienté recruteur (objectif : poste salarié en sécurité
cloud / réseau / infra / web ; petits clients en secondaire). Règle dure : **zéro invention**,
aucun signal d'agence commerciale (pas de hotline 24/7, pas de fausse équipe, pas de pentest/OSCP,
pas de « expert »/certifications non détenues). Aucun tiret cadratin dans la copie.

Plusieurs zones n'ont pas suivi le pivot. Ce design corrige 4 chantiers validés avec le
propriétaire.

## Décisions verrouillées (brainstorming)

- **Périmètre** : cohérence positionnement + schema, bande recruteur, 4 axes de capacités,
  refonte contact. (CV, photo fondateur, Credly : hors périmètre, bloqués par assets.)
- **Tagline header** : « Cybersécurité & GRC » → « Sécurité cloud, réseau, infra & web ».
- **Vocabulaire** : 4 axes partout (cloud, réseau/infra, web, IA) → Capabilities passe de 3 à 4 cartes.
- **Schema** : nettoyage complet et honnête (tous les schemas).
- **Bande recruteur** : bandeau sous le hero.
- **Disponibilité affichée** : « Ouvert aux opportunités ».
- **Contact / incident** : retirer le thème SOC/urgence partout.
- **Contact / photos** : aucune (page typographique).
- **Contact / canaux** : ajouter LinkedIn + GitHub au bloc coordonnées.

## Faits vérifiables mobilisés (aucune invention)

- Nom : Jean-Baptiste Dhondt. Marque/pratique : Smidjan (non enregistrée).
- Zone : Wallonie (région), autorisé à travailler en UE, télétravail possible.
- Cert obtenue : AZ-900 (Microsoft, 2026). En cours : CCNA. Bachelier Informatique (ISL) **en cours**.
- Bootcamp **complété** : Java Full Stack, TechnoFutur TIC (2025).
- Profils : LinkedIn `in/jean-baptistedhondt`, GitHub `warrox1993`, TryHackMe `p/Warrox1993`.
- Contact public : `jeanbaptiste.dhondt1@gmail.com`, `0475 20 55 62` / `tel:+32475205562`.
- Axes réels (en apprentissage actif) : sécurité cloud (Azure), réseau/infra (segmentation,
  durcissement, CCNA en cours), web (secure by design, inspiration OWASP), IA & automatisation (n8n, Make).

## Contrainte transverse

- Trilingue FR/NL/EN, **double source** : chaque clé i18n existe dans `messages/{loc}.json`
  (compilé, sérialisé dans le HTML) ET `messages/_ns/<ns>.{loc}.json` (source). Les deux à jour.
- Build vert, parité honnêteté, liens externes en `rel="noopener noreferrer"`.
- Pas de tiret cadratin (utiliser virgule, deux-points, point médian `·`).

---

## Chantier 1 : cohérence positionnement + réécriture honnête de `schema.ts`

### 1a. Tagline header
- `common.brand.tagline` : « Cybersécurité & GRC » → **FR** « Sécurité cloud, réseau, infra & web »,
  **NL** « Cloud-, netwerk-, infra- & websecurity », **EN** « Cloud, network, infra & web security ».
- Aligner les `<title>`/OG de `/agence` qui portent encore « Cybersécurité & GRC »
  (`agence.meta.*`, `agence.meta.ogImageAlt`), FR/NL/EN, compilé + `_ns`.

### 1b. `src/lib/schema.ts` (5 schemas rendus sur la home + FAQ)
- **organizationSchema** : `description` → pratique honnête de JB (sécurité cloud/réseau/infra/web +
  axe conformité NIS2/CyFun, basé en Wallonie). Retrait du cadrage « agence qui sécurise les PME
  wallonnes » et de toute mention pentest.
- **websiteSchema** : `description` alignée (mêmes axes, sans « PME wallonnes » agence).
- **localBusinessSchema (ProfessionalService)** : alléger.
  - Retirer l'offre pentest (« Tests de sécurité & audit »).
  - Retirer `priceRange` et `openingHoursSpecification` (trompeurs pour un solo avec emploi).
  - `hasOfferCatalog` honnête : sécurité cloud, sécurité réseau & infra, sécurité web,
    accompagnement NIS2/CyFun.
  - `description` alignée.
- **personSchema (`#founder`)** :
  - `jobTitle` : « Fondateur & expert en cybersécurité » → **« Praticien en cybersécurité, cloud, réseau, infra & web »**.
  - `knowsAbout` : retirer « Tests d'intrusion » ; liste = Sécurité cloud, Sécurité réseau,
    Sécurité de l'infrastructure, Sécurité web, NIS2, CyberFundamentals (CCB), IA & automatisation.
  - `sameAs` : LinkedIn, GitHub, **+ TryHackMe** (`https://tryhackme.com/p/Warrox1993`).
  - Ajouter `hasCredential` (EducationalOccupationalCredential) : AZ-900,
    `recognizedBy` = Microsoft, `credentialCategory` = "certification".
  - Ajouter `alumniOf` = TechnoFutur TIC (bootcamp **complété** uniquement). ISL **omis** (bachelier en cours,
    `alumniOf` surestimerait).
- **homeWebPageSchema** : `name`/`description` alignés portfolio (retirer « PME wallonnes »).
- **faqPageSchema** : « diagnostic gratuit » → « premier échange gratuit ».
- **`src/lib/author-schema.ts`** : vérifier et corriger toute mention « expert »/pentest résiduelle
  (utilisé par le blog).

---

## Chantier 2 : Capabilities 4 axes + whoami + bande recruteur

### 2a. Capabilities (3 → 4 cartes)
- i18n `home.capabilities` : ajouter `c4`, réécrire c1–c4 (FR/NL/EN, compilé + `_ns`) :
  - c1 Sécurité cloud (Azure : durcissement, bonnes pratiques).
  - c2 Sécurité réseau & infra (segmentation, durcissement ; CCNA en cours).
  - c3 Sécurité web (secure by design, inspiration OWASP).
  - c4 IA & automatisation (n8n, Make ; sécurisation des usages IA).
- `capabilities.title` : « Cloud, réseaux, IA : sécuriser chaque couche » → « Sécuriser chaque couche ».
- `capabilities.eyebrow` : déjà « Ce que j'apprends » (fait, non commité).
- `Capabilities.tsx` : rendre 4 cartes ; `Capabilities.module.css` : grille adaptée à 4
  (2×2 desktop, 1 col mobile), parité visuelle avec l'existant.

### 2b. whoami
- `Hero.tsx` (prop `role` de `WhoamiTerminal`) : « Sécurité cloud · réseaux · IA » →
  « Sécurité cloud · réseau · infra · web ».

### 2c. Bande recruteur (nouveau composant)
- `src/app/[locale]/(site)/_home/RecruiterBand.tsx` + `.module.css`.
- Inséré dans `page.tsx` **entre `<Hero/>` et la `<Section>` Capabilities**.
- Style émeraude/mint on-brand, aligné gauche, eyebrow mono « Pour un recruteur ».
- 3 faits : disponibilité « Ouvert aux opportunités », localisation « Wallonie · autorisé UE ·
  télétravail », focus « Sécurité cloud, réseau, infra & web ».
- 3 boutons : **LinkedIn** (externe), **Voir mon parcours** (→ `/agence`, Link locale-aware),
  **GitHub** (externe). Externes en `rel="noopener noreferrer"`, `target="_blank"`.
- i18n `home.recruiter.*` (eyebrow, avail, availK, locK, locV, focusK, focusV, ctaLinkedin,
  ctaParcours, ctaGithub), FR/NL/EN, compilé + `_ns`.

---

## Chantier 3 : refonte épurée de la page « Me contacter »

### 3a. Réécriture `contact/page.tsx`
- **Hero sobre** : fil d'Ariane + eyebrow + titre + une phrase lead. Supprimer : photo
  `office-team.jpg`, double CTA (garder un seul « Écrire un message » ancré `#form`),
  bandeau `assure1/2/3`.
- **2 colonnes** (`#form`) :
  - Gauche : `<ContactForm/>` (logique inchangée, déjà durcie/i18n).
  - Droite : **un seul** bloc coordonnées épuré : email, téléphone (**une seule** occurrence),
    zone Wallonie, délai de réponse, **+ LinkedIn + GitHub**.
- **Une seule** section process : garder « À quoi s'attendre » (3 étapes) en bas.
- **Suppressions** : fausse carte SVG « Liège », bloc `#urgence` (incident/SOC) + photo
  `incident-response.jpg`, process-strip latéral (doublon), photo `support-desk.jpg`,
  répétitions du téléphone.
- **JSON-LD** : garder ContactPage + BreadcrumbList ; `contactType` « sales » → « customer support »
  (générique, cohérent portfolio).

### 3b. Nettoyage couplé du thème incident/SOC (retiré partout)
- `SiteFooter.tsx` : retirer le lien `/contact#urgence` (`footer.links.incident`).
- **Code mort** : supprimer le composant `EmergencyBar/` (tsx + css, non monté), et le bloc CSS
  `.incident` orphelin dans `SiteHeader.module.css`.
- **i18n orphelines** : retirer `emergency.*`, `footer.links.incident`, et les clés `contact.side.*`
  devenues inutilisées (incident*, map*, process*, coord* remaniées), FR/NL/EN, compilé + `_ns`.

### 3c. `contact/page.module.css`
- Réécrire pour la mise en page épurée : retirer les styles de carte/map, emergency, process-strip,
  photos. Conserver un rythme typographique sobre, palette émeraude/ardoise, responsive (form pleine
  largeur mobile, coordonnées dessous).

### 3d. `ContactForm.tsx`
- Inchangé (logique + sécurité). Vérifier seulement l'absence de champ dupliqué ; ne pas retoucher
  la logique anti-spam (3 envois/h, règle absolue du projet).

---

## Isolation / limites des unités

- `RecruiterBand` : composant autonome, ne dépend que d'i18n + Button/Icon/Container/Link. Testable seul.
- `schema.ts` : objets exportés purs, consommés par `page.tsx`. Changement interne sans impact API.
- Refonte contact : `page.tsx` (présentation) découplé de `ContactForm.tsx` (logique) ; on ne touche
  qu'à la présentation.

## Vérification (avant déploiement)

- `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build` vert.
- Lint/tsc sans nouvelle erreur (ignorer les 5 erreurs pré-existantes `tests/wizard-complete.spec.ts`).
- Parité FR/NL/EN vérifiée (JSON valides, pas de clé orpheline référencée).
- Contrôle honnêteté : plus aucune mention pentest/« expert »/hotline 24/7/PME-agence dans schema,
  tagline, contact.
- Rendu visuel via Google Chrome headless + puppeteer-core (Playwright KO sur ubuntu 26.04) :
  home (bande recruteur + 4 cartes), contact refondue, en clair et sombre.
- Déploiement prod via `~/.local/bin/vercel deploy --prod --yes` après validation, puis smoke-test
  routes FR/NL/EN (UA navigateur, le firewall bloque curl par défaut).

## Hors périmètre (rappel)

- CV téléchargeable (reporté par le propriétaire).
- Photo fondateur réelle (asset manquant).
- Lien Credly réel (asset manquant).
- Balayage copie « PME/GRC » sur les autres pages que /agence (peut être un chantier suivant).
