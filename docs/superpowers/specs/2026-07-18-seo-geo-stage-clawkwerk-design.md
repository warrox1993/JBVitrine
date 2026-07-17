# Design : SEO/GEO + bannière stage TFE + ClawkWerk

Date : 2026-07-18
Branche : `refonte-home-portfolio`
Statut : validé en brainstorming (décisions ci-dessous), en attente de relecture spec

## Contexte & objectif

smidjan.be est le portfolio solo honnête de Jean-Baptiste Dhondt (marque « Smidjan »). Le
propriétaire déclare la zone **marketing / SEO / GEO comme la zone CRITIQUE** du projet : maximiser
sa visibilité auprès des recruteurs / RH / écoles en **Belgique (Wallonie/Liège/Bruxelles)** et
**Luxembourg**, en recherche classique (Google) ET en GEO (ChatGPT, Perplexity, AI Overviews).
Deux livrables concrets s'ajoutent : une **bannière « recherche stage TFE »** ultra-visuelle, et la
mise en avant de **ClawkWerk** (son outil d'audit cyber) avec une page et des liens.

**Honnêteté (règle dure du projet) :** aucun SEO ne garantit le #1 sur des termes concurrentiels.
Cibles réalistes et prioritaires : son **nom**, ses **études (ISL)**, sa **niche**, les requêtes
**stage 2027**, **ClawkWerk**, et le **GEO**. Le générique local (« cybersécurité Liège ») est
concurrentiel : on maximise sans promettre. Zéro invention de faits.

## Décisions verrouillées (brainstorming)

- Chantier unique combinant SEO/GEO + bannière stage + ClawkWerk.
- Bannière stage : **bandeau haut pleine largeur** au-dessus du hero (home) + **rappel sur /contact**. Non sticky.
- Zones stage affichées/ciblées : **Wallonie (dont Liège), Bruxelles, Luxembourg, télétravail/hybride**.
- Stage : **étudiant conventionné (TFE)**, **dès juillet 2027**, année **2027-2028**, **durée à déterminer**, centré sur le développement de **ClawkWerk**. Rémunération : non précisée (juste « stage étudiant conventionné »).
- **/clawkwerk** : page case-study dédiée (pas de page /stage). Le stage reste bannière + section.
- Lien ClawkWerk : **depuis la bannière + la home** (pas dans la nav/footer globale).
- Logo ClawkWerk : **texte** pour l'instant (corbeau plus tard). Pas de repo public (lien = page on-site).

## Faits vérifiables mobilisés (zéro invention)

- Jean-Baptiste Dhondt · Smidjan · Wallonie (Liège) · autorisé UE.
- Études : Bachelier Informatique, ISL (Institut Saint-Laurent, Liège, promotion sociale), en cours.
- Cert : AZ-900 (Microsoft, 2026). CCNA en cours. Bootcamp Java Full Stack (TechnoFutur TIC, 2025).
- Parcours : télécom Défense belge (2013-2017), agent sécurité Commission européenne (2022-2023).
- Axes : sécurité cloud, réseau, infra, web ; IA & automatisation ; offensif en apprentissage (TryHackMe, Top 15%) ; conformité NIS2 / CyFun.
- Profils : LinkedIn in/jean-baptistedhondt · GitHub warrox1993 · TryHackMe p/Warrox1993.
- Stage TFE recherché : dès juillet 2027 (2027-2028), durée TBD, centré ClawkWerk.

## ClawkWerk : frontière publiable (STRICTE, voir mémoire projetcyber-audit-tool)

**PUBLIABLE (bénéfices, honnête) :** outil d'audit + remédiation cybersécurité pour PME belges,
aligné **CyFun 2025 (CCB) niveau Basic** ; auto-évaluation assistée, **PAS une certification
officielle** (réservée aux CAB accrédités BELAC) ; **read-only** (ne modifie jamais les systèmes) ;
**aucune découverte réseau autonome** (périmètre explicite fourni) ; **secrets jamais stockés/
sérialisés** ; **journal d'audit inaltérable et non désactivable** ; **remédiation validée par un
humain, jamais auto-exécutée** ; **aucune donnée conservée après l'audit** ; chaîne claire rapport →
remédiation priorisée → durcissement.

**JAMAIS PUBLIER :** la stack (Go) et les libs, les noms de paquets/l'architecture interne, les
flags CLI, les IDs de contrôles CyFun précis (ex. DE.CM-01.2), les ratios/compteurs de couverture
(ex. 1/34), les seuils/barèmes de scoring, les marques d'équipements réseau supportées, l'état PoC /
limites non testées, la mécanique USB/live-ISO au-delà du bénéfice « aucune donnée conservée », les
fichiers sources CCB ou leur classification TLP:AMBER. En cas de doute : omettre.

## Contrainte transverse

- Trilingue FR/NL/EN, double-source i18n (`messages/{loc}.json` compilé + `messages/_ns/<ns>.{loc}.json`), JSON valide, lockstep.
- Pas de tiret cadratin. Liens externes `rel="noopener noreferrer"`.
- Build vert (`SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`), 97+ routes.

---

## Chantier 1 : Bannière stage TFE

- Nouveau composant `StageBanner` (server), rendu **au-dessus du hero** dans le layout `(site)` ou la home, + un **rappel** sur /contact.
- Contenu (i18n `stage.*`, FR/NL/EN) : label mono « STAGE 2027-2028 » ; titre « Recherche un stage TFE en cybersécurité » ; détails « dès juillet 2027 · Wallonie · Bruxelles · Luxembourg · télétravail · stage étudiant conventionné, durée à déterminer, autour de ClawkWerk » ; CTA « Me contacter » (→ /contact) + lien « Découvrir ClawkWerk » (→ /clawkwerk).
- Style : bandeau pleine largeur émeraude « flash », très lisible, accessible (contraste, `aria`), responsive. Non sticky. Cohérent palette Émeraude & Ardoise, clair + sombre.
- Décision de placement : **layout `(site)`** (apparait sur toutes les pages) OU **home + contact seulement**. Retenu : **home (haut) + contact (rappel)** pour ne pas saturer tout le site ; implémentation = composant rendu explicitement sur ces deux pages.

## Chantier 2 : ClawkWerk (branding + page + liens)

- **Renommer** l'outil « ClawkWerk » dans la copie existante : home `CyfunTeaser`, /projets, /conformite-nis2 (section audit). Texte (pas de logo). i18n mis à jour.
- **Nouvelle page `/clawkwerk`** (route `src/app/[locale]/(site)/clawkwerk/page.tsx` + CSS) : case-study honnête, uniquement faits PUBLIABLES ci-dessus, structure : hero (nom + pitch + « pas une certif officielle »), bénéfices/invariants (cartes), lien contact + mention stage TFE. `generateMetadata` (titre/description ciblant « ClawkWerk », « audit CyFun PME », « CyberFundamentals »), `buildAlternates(locale, "/clawkwerk")`.
- **Liens** : depuis la bannière stage + la home (zone `CyfunTeaser`). Pas de nav/footer global.
- **Schema** : sur /clawkwerk, JSON-LD `SoftwareApplication` (ou `CreativeWork`) sûr — name « ClawkWerk », applicationCategory « SecurityApplication », description bénéfices, `author`/`creator` = `#founder`, **sans** détail interne.

## Chantier 3 : Fondations SEO/GEO

- **Person / ProfilePage** : ajouter un schema `ProfilePage` (`mainEntity` = `#founder`) sur /agence (page profil). Enrichir `personSchema` : `hasOccupation` (Occupation « Cybersécurité, cloud/réseau/infra/web ») ; garder AZ-900 `hasCredential`, ISL/TechnoFutur `alumniOf`, `sameAs` LinkedIn/GitHub/TryHackMe. **Signal stage** : pas de schema « job-seeker » standard fiable → porté par le **texte on-page + FAQ + llms.txt** (honnête), pas de faux `JobPosting`.
- **GEO — `/llms.txt`** : créer `public/llms.txt` (format llms.txt) : résumé « Qui est Jean-Baptiste Dhondt », axes, formation ISL, AZ-900/CCNA, TryHackMe, **recherche stage TFE 2027-2028**, ClawkWerk, profils, contact. Passages courts, factuels, citables.
- **Contenu Q&R citable** : bloc/FAQ « Qui est Jean-Baptiste Dhondt ? » + « Quel stage recherche-t-il ? » + « Qu'est-ce que ClawkWerk ? » (home ou /agence), en passages autonomes (bon pour AI Overviews / Perplexity).
- **Luxembourg** : ciblage par **contenu + meta** (mention explicite « Luxembourg » dans stage + /agence + llms.txt) plutôt qu'une locale séparée. hreflang FR/NL/EN inchangé (+ éventuel `fr-LU`/`en-LU` à évaluer, non bloquant).
- **Meta par page** : /clawkwerk + home mettent en avant stage + ClawkWerk ; garder titres auto-brandés.
- **Sitemap** : régénéré au build (inclut /clawkwerk). Vérifier robots (déjà OK, crawlers IA autorisés).

## Isolation / unités

- `StageBanner` : composant autonome (i18n + Button/Link), testable seul.
- `/clawkwerk` : route isolée (page + CSS + metadata + schema), consomme i18n `clawkwerk.*`.
- Schema/llms.txt : fichiers/objets purs, sans couplage UI.

## Vérification

- Build vert ; JSON i18n valides ; parité FR/NL/EN.
- **Contrôle confidentialité ClawkWerk** : grep la page/llms pour s'assurer qu'aucun terme interdit (Go, noms de paquets, IDs de contrôle, seuils, « PoC », marques d'équipement) n'apparaît.
- Honnêteté : « pas une certification officielle » présent ; stage cadré étudiant/TFE ; aucune stat inventée.
- Rendu visuel (Chrome headless) : bannière home + contact, page /clawkwerk, clair/sombre.
- GEO : /llms.txt servi (200), robots inchangé, schema valide (test structured data).

## Hors périmètre (rappels / suites)

- Recherche concurrentielle externe (teardown portfolios) : à relancer quand la limite de session est levée ; additif.
- Logo corbeau ClawkWerk (asset à venir).
- Page /stage dédiée (écartée par le proprio).
- **Blog TryHackMe + CTF** : chantier suivant, déjà queué (voir mémoire).
- Réintégrer la largeur d'axes (dont IA) sur /agence lors de sa reprise recruteur.
- Optimisations LinkedIn/GitHub/TryHackMe (hors site, recommandations au proprio).
