# AUDIT TOTAL — smidjan.be

> Audit **lecture seule**, aucune modification du site. Cible : le code du repo (branche `i18n`) + la prod live https://smidjan.be (version i18n déployée le 2026-07-07).
> Statut : audit en cours de compilation. **Aucune correction n'est exécutée** — validation attendue section par section, en commençant par la Section 1.

## Setup des sous-agents

Vérification effectuée le 2026-07-07 :

- `.claude/agents/` (projet) : **vide** (répertoire absent avant cet audit).
- `~/.claude/agents/` (utilisateur) : **absent**.
- Aucun des 5 rôles (`content-auditor`, `code-reviewer`, `qa-tester`, `design-auditor`, `seo-strategist`) n'existait.

Catalogue communautaire (VoltAgent/awesome-claude-code-subagents) : le CLI `claude` est disponible, mais une installation de plugin en cours de session ne charge PAS les agents dans la session active (les sous-agents sont chargés au démarrage) et modifierait la configuration globale de l'utilisateur. Décision : **création locale** des 5 fichiers, au format officiel Claude Code, strictement en **lecture seule**.

| Rôle | Statut | Fichier | Outils |
|---|---|---|---|
| content-auditor | créé | `.claude/agents/content-auditor.md` | Read, Grep, Glob, WebFetch, WebSearch |
| code-reviewer | créé | `.claude/agents/code-reviewer.md` | Read, Grep, Glob |
| qa-tester | créé | `.claude/agents/qa-tester.md` | Read, Grep, Glob, WebFetch, WebSearch |
| design-auditor | créé | `.claude/agents/design-auditor.md` | Read, Grep, Glob, WebFetch, WebSearch |
| seo-strategist | créé | `.claude/agents/seo-strategist.md` | Read, Grep, Glob, WebFetch, WebSearch |

Exécution : chaque section ci-dessous est traitée comme une **mission isolée** confiée au rôle correspondant (prompt système identique au fichier `.md`), les fichiers fraîchement créés n'étant pas garantis d'être hot-chargés comme `subagent_type` dans la session courante.

---

---

# Section 1 — Intégrité du contenu

## Section 1 — Intégrité du contenu (site Smidjan / smidjan.be)

Repo audité (lecture seule) : `.../src/UIs/nextjs`. Contenu i18n dans `messages/{fr,nl,en}.json` + `messages/_ns/*`, composants sous `src/app/[locale]/(site)/`. Web consulté le **2026-07-07** (navigateur normal).

---

### 1A. Témoignages clients — les 3 sont LIKELY INVENTED

Rendus par `src/app/[locale]/(site)/_home/Testimonials.tsx:56-73` ; textes dans `messages/_ns/home.fr.json:165-181` (+ nl/en équivalents, ex. `home.en.json:160-180`).

| # | Verbatim (abrégé) | Rôle / secteur | Statut |
|---|---|---|---|
| item1 | « En six semaines, ils avaient identifié et corrigé des failles que notre ancien prestataire n'avait jamais vues… » | Directeur des opérations · Industrie manufacturière · Liège | **LIKELY INVENTED** |
| item2 | « La conformité NIS2 nous paraissait insurmontable. Smidjan a transformé une obligation anxiogène en feuille de route… » | Directrice générale · Services B2B · Namur | **LIKELY INVENTED** |
| item3 | « Je téléphone, et j'ai l'expert au bout du fil. Pas de ticket, pas d'attente… » | Gérant · Cabinet comptable · Verviers | **LIKELY INVENTED** |

Aucune source dans le repo ni dans l'historique git (grep `temoign/testimonial/avis/verbatim` → uniquement ces 3 entrées hardcodées). Anonymisés (« rôle + secteur »), donc invérifiables — et directement contredits par les pages légales (voir 1D). Le commentaire de code `Testimonials.tsx:39` (« anonymised ») confirme qu'aucune identité n'existe. **À supprimer ou requalifier en scénarios/exemples tant que des clients réels et consentants ne sont pas cités.**

### 1B. Chiffres-clés

**Bandeau Home** — `src/app/[locale]/(site)/page.tsx:232-235`, libellés `messages/*.json` (`home` → stats) :

| Valeur | Libellé | Statut |
|---|---|---|
| **12+** | « années d'expertise cumulée en sécurité » | **LIKELY INVENTED** — aucune source ; contredit par entité « en cours d'immatriculation » et équipe solo |
| **50+** | « audits & tests d'intrusion réalisés » | **LIKELY INVENTED** — aucun registre, aucune source repo |
| **<24h** | « délai de réponse à toute sollicitation » | **TO CONFIRM** — engagement de service, non mesuré |
| **100%** | « des données hébergées en Belgique / UE » | **TO CONFIRM** — le site est déployé sur Vercel (société US) ; claim d'hébergement 100 % BE/UE à vérifier techniquement |

**Bandeau Agence** — `src/app/[locale]/(site)/agence/page.tsx:190-195`. Un commentaire de code **avoue explicitement** que ce sont des placeholders : *« NOTE (flag for human): the figures below (12+ / 50+ / 6+ / <24h) are placeholders ported from the approved mockup. Confirm the real numbers with the client »* (`agence/page.tsx:182-186`).

| Valeur | Libellé | Statut |
|---|---|---|
| 12+ | expérience | **LIKELY INVENTED** (placeholder auto-déclaré) |
| 50+ | audits | **LIKELY INVENTED** (placeholder auto-déclaré) |
| 6+ | secteurs d'activité accompagnés en Wallonie (`fr.json:42`) | **LIKELY INVENTED** (placeholder auto-déclaré) |
| <24h | réponse | **TO CONFIRM** |

**Autres chiffres :**
- **~82 %** — « Le niveau Basic couvre déjà ~82 % des attaques courantes » (`messages/_ns/home.fr.json:79-80`, rendu `_home/CyfunIntro.tsx:26`). **REAL** — chiffre officiel CCB CyberFundamentals (« the Basic assurance level [is] capable of covering 82% of attacks », safeonweb.be, consulté 2026-07-07). ✅ Correctement attribué au niveau Basic.
- **82 % score global CyFun** dans le dashboard illustratif (`_home/figures.tsx:78`, aria `home.fr.json:207` « score global de 82 pourcents… basé sur l'auto-évaluation Basic »). **Décoratif/mockup** — pas un résultat client réel ; l'aria le présente comme illustration, acceptable mais à ne pas confondre avec une métrique réelle.
- **100 %** répété dans emails/templates (`api/quote/email-templates.ts`, etc.) — hors périmètre vitrine.

### 1C. Outil d'audit « propriétaire » CyFun

Décrit dans `messages/fr.json` → `conformite.audit` (eyebrow « Notre outil propriétaire »), rendu sur `conformite-nis2/page.tsx`. Claims :
- « moteur d'audit, aligné CyFun (CCB) et **NIST CSF 2.0** », « 3 niveaux CyFun », « Rapport PDF ».
- Garanties « sûr par conception » : **lecture seule**, périmètre explicite, **identifiants jamais stockés** (compte de service RO), **journal inaltérable**, remédiation validée par un humain, **aucune donnée conservée** (`conformite.audit.trust.*`).

Statut : **REAL quant à l'existence** — d'après la mémoire projet, il s'agit de l'outil d'audit CyFun propriétaire situé dans `~/Bureau/projetCyber` (hors de ce repo). **MAIS les garanties de sécurité produit** (lecture seule, non-stockage des credentials, journal inaltérable, effacement des données, alignement NIST CSF 2.0) sont **TO CONFIRM** : elles ne sont pas vérifiables depuis ce repo vitrine et doivent correspondre à l'implémentation réelle avant d'être publiées comme engagements. La page inclut déjà un cadrage honnête (`conformite.audit.honesty` : « auto-évaluation assistée, pas une certification »).

### 1D. Contradictions avec les pages légales — CRITIQUE

`messages/fr.json` → `legal.mentions.editeur` :
- BCE : **« En cours d'immatriculation »** ; TVA : **« En cours d'immatriculation »**
- Callout : *« Smidjan n'a pas encore finalisé son immatriculation (BCE/TVA). Aucun numéro d'entreprise ne doit être publié tant qu'il n'est pas officiellement attribué. »*
- Footer : numéro TVA/BCE volontairement omis (`SiteFooter.tsx:158-159`).
- Dénomination : « marque commerciale exploitée par Jean-Baptiste Dhondt (**personne physique**) ».

Composant équipe (`Team.tsx:268-270, 317`) : **« Une équipe en construction »**, cartes en orbite affichant **« NOUS RECRUTONS »** → structure de fait **solo/en amorçage**.

**Contradiction frontale** : une entité non encore immatriculée, mono-personne et « en construction » ne peut simultanément afficher **12+ ans d'expérience cumulée, 50+ audits réalisés, 6+ secteurs accompagnés** et **3 témoignages clients**. C'est le principal risque d'intégrité (et un risque juridique : publicité potentiellement trompeuse). Recommandation : aligner les chiffres sur la réalité (ou les retirer) et retirer/requalifier les témoignages tant qu'aucun client réel n'est citable.

### 1E. Chèque cybersécurité wallon — vérification web (source officielle)

Section `conformite.financement` (`messages/fr.json` + hardcodé `conformite-nis2/page.tsx:748-833`). Vérifié contre **cheques-entreprises.be/cheques/cybersecurite** et **wallonie.be** (démarche « Cybersecurity voucher »), consultés **2026-07-07**.

| Élément | Site Smidjan | Source officielle | Verdict |
|---|---|---|---|
| Taux de prise en charge | **75 %** des honoraires | 75 % HTVA | ✅ **CORRECT** |
| **Plafond du chèque cybersécurité** | **« 60 000 € sur 3 ans »** (`page.tsx:760`, `fr.json` card2Desc/row4b, idem nl.json:693/713) | **50 000 € HTVA par bénéficiaire sur 3 ans** (cheques-entreprises.be : « 50.000 € HTVA / 3 ans » ; wallonie.be : « capped at €50,000 excl. VAT per beneficiary over a three-year period ») | ❌ **INCORRECT — PRIORITÉ.** Le « 60 000 € » est faux/obsolète, répété en dur dans le composant (locale-indépendant) + textes FR et NL |
| « portefeuille de chèques 200 000 € / 3 ans (max 100 000 €/an) » | 200 000 € présenté comme portefeuille chèques | 200 000 € = **plafond de minimis** (aide totale/3 ans), pas le portefeuille ; portefeuille « thème numérique » = 70 000 € HTVA/3 ans ; tous thèmes = 100 000 €/année civile | ⚠️ **IMPRÉCIS** — conflation de minimis / portefeuille (le « 100 000 €/an » est ~correct) |
| Décision | **« ~5 jours ouvrés »** | 5 j ouvrés = **contrôle de recevabilité** seulement ; suivi de 30 j (réponse demandeur) puis **15 j ouvrés d'examen final** ; prestation à réaliser sous 12 mois | ⚠️ **TROMPEUR** — présente le délai de recevabilité comme le délai de décision |
| Bénéficiaires | PME < 250 employés, < 50 M€ CA | < 250 personnes ET (< 50 M€ CA OU bilan ≤ 43 M€) | ✅ **CORRECT** (omet la variante bilan 43 M€, mineur) |
| Chèque « maturité numérique » ~50 % | ~50 % | Dispositif chèques-entreprises séparé | ⚠️ **PLAUSIBLE — TO CONFIRM** |
| Services couverts | audit, coaching, labellisation « Keep It Secure » | conseil/audit + coaching + labellisation (dispositif KIS) | ✅ **CORRECT** |

Cadrage honnête déjà présent (`conformite.financement.honesty` : « Smidjan n'est pas nécessairement inscrit comme prestataire certifié… à vérifier sur la plateforme officielle »). **Correction prioritaire : remplacer 60 000 € → 50 000 € HTVA** partout, préciser le délai réel, et distinguer plafond de minimis / portefeuille.

**Sources web :**
- [Chèque « cybersécurité » — cheques-entreprises.be](https://www.cheques-entreprises.be/cheques/cybersecurite/) (consulté 2026-07-07)
- [Cybersecurity voucher — wallonie.be](https://www.wallonie.be/en/demarches/receive-expert-help-secure-your-companys-data-cybersecurity-voucher) (consulté 2026-07-07)
- [CyberFundamentals Framework — CCB Safeonweb](https://atwork.safeonweb.be/tools-resources/cyberfundamentals-framework) (consulté 2026-07-07)

---

# Section 2 — Duplication et architecture

## Résumé

Le code du site (`src/app/[locale]/(site)/…`) repose sur une **vraie couche de composants partagés** : chaque bloc récurrent (cartes de tiers/prix, badges de confiance, méthodologie 4 étapes, boîtes CTA, bandeaux de stats) est un composant réutilisé, pas du JSX recopié page par page. Il existe même un design system réel (tokens CSS + primitives UI + composants de section). Le vrai problème de duplication n'est **pas dans le code React mais dans le contenu** : la « méthodologie 4 étapes » existe en **3 formulations parallèles** maintenues séparément dans les fichiers de traduction, plus une variante 3 étapes.

---

## 1. Chaque bloc récurrent : composant partagé ou JSX dupliqué ?

Tous les blocs listés sont des **composants partagés** exportés depuis `src/components/shared/index.ts` (barrel unique) et importés par les pages. Aucun n'est du JSX recopié.

| Bloc | Statut | Composant source | Sites d'appel (page:ligne) |
|---|---|---|---|
| Cartes de tiers / pricing (CyFun) | **Partagé** (avec données par défaut `DEFAULT_CYFUN_TIERS`/`DEFAULT_CYFUN_TABLE`) | `src/components/shared/CyFunTiers/CyFunTiers.tsx` | `page.tsx:173`, `services/page.tsx:351`, `conformite-nis2/page.tsx:462` |
| Badges de confiance / « trust » | **Partagé** (avec `DEFAULT_TRUST_ITEMS`) | `src/components/shared/TrustStrip/TrustStrip.tsx` | `page.tsx:99`, `approche/page.tsx:189` |
| Méthodologie 4 étapes | **Partagé** (structure) — voir §2 pour le contenu | `src/components/shared/ProcessSteps/ProcessSteps.tsx:19` | `page.tsx:186`, `approche/page.tsx:283`, `conformite-nis2/page.tsx:569`, `:692`, `:845` |
| Boîtes CTA | **Partagé** | `src/components/shared/CTABox/CTABox.tsx` | `page.tsx:261`, `services/page.tsx:364`, `agence/page.tsx:198`, `approche/page.tsx:485`, `conformite-nis2/page.tsx:983`, `blog/page.tsx:199`, `blog/[slug]/page.tsx:300` |
| Bandeau de stats | **Partagé** | `src/components/shared/StatsBand/StatsBand.tsx` | `page.tsx:226`, `approche/page.tsx:442`, `agence/page.tsx:187` |
| Cartes de service | **Partagé** | `ServiceCard` (home ×4), `ServicePillar` (services ×4) | `page.tsx:115–151`, `services/page.tsx:208–314` |
| « Pourquoi Smidjan » | **Composant, mais local au home (pas dans `shared/`)** | `src/app/[locale]/(site)/_home/WhySmidjan.tsx` | importé **uniquement** dans `page.tsx:20/212` |

**Nuance sur « Pourquoi Smidjan »** : `WhySmidjan` n'est pas un composant partagé réutilisable — il vit dans `_home/`, lit exclusivement le namespace de messages `home.why`, et n'est utilisé que sur la home. La page `approche` possède sa **propre** section « pourquoi » (clé `approche.why` dans `messages/_ns/approche.fr.json`) rendue en JSX ad-hoc, distincte. Donc pour ce bloc précis : pas de composant partagé, deux implémentations parallèles.

**Duplication interne repérée (`approche`)** : la même méthodologie 4 étapes y est rendue **deux fois** — une fois via `<ProcessSteps>` en aperçu (`approche/page.tsx:283`) puis une seconde fois en JSX manuel (`approche/page.tsx:321–345`, `styles.mstep` avec sa propre numérotation `.num` + trait de liaison `.ln`). Ce second rendu ré-implémente à la main le motif de numérotation déjà encapsulé dans `ProcessSteps` au lieu de le réutiliser.

---

## 2. Variantes de la « méthodologie 4 étapes »

Toutes passent par le **même composant** `ProcessSteps`, donc pas de duplication de code — mais le **contenu (copy)** existe en **3 formulations 4-étapes distinctes**, maintenues indépendamment dans `messages/_ns/*.json`, plus une variante à 3 étapes.

| # | Version (titres FR) | Kicker | Localisation contenu | Rendu |
|---|---|---|---|---|
| **A (MAJORITÉ)** | Cadrage & auto-évaluation → Analyse d'écart & remédiation → Support à la vérification CCB → Suivi continu | « Notre méthode en 4 étapes » | `home.fr.json` `process.*` **ET** `conformite.fr.json` `accompagnement.process.*` | `page.tsx:186`, `conformite-nis2/page.tsx:569` |
| B | Diagnostic → Priorisation → Remédiation → Supervision & suivi | « Aperçu rapide » | `approche.fr.json` `steps.{diagnostic,priorisation,remediation,supervision}` | `approche/page.tsx:283` (+ rendu manuel dupliqué `:321`) |
| C | Audit outillé → Rapport clair → Plan de remédiation priorisé → Durcissement & suivi | « De l'audit au durcissement » | `conformite.fr.json` `audit.process.*` | `conformite-nis2/page.tsx:692` |
| (3 étapes) | S'inscrire → Choisir la prestation → Réaliser l'audit/remédiation | « Comment en profiter, en 3 étapes » | `conformite.fr.json` `financement.process.*` | `conformite-nis2/page.tsx:845` |

**Décompte** : 4 blocs « process » à 4 étapes existent (home, conformite/accompagnement, approche, conformite/audit). La **version majoritaire est la Version A** — titres **strictement identiques** entre `home.process.*` et `conformite.accompagnement.process.*` (2 occurrences sur 4), même kicker « Notre méthode en 4 étapes ». Les descriptions ne sont pas au mot près identiques (celles de conformite sont légèrement plus longues), ce qui crée un **risque de dérive** : deux copies quasi-jumelles à maintenir en 3 langues sans source unique. Versions B et C sont chacune uniques à une page. Le bloc `financement` n'est pas une méthodo 4 étapes (3 étapes, sujet = subvention).

**Recommandation** : extraire la Version A dans une seule clé de messages partagée (namespace `common`/`sharedui`) consommée par home + conformite, pour éliminer la double maintenance FR/NL/EN.

---

## 3. Structure des dossiers & design system

**Structure** (`src/`) claire et en couches :

- `app/[locale]/(site)/…` — pages i18n (App Router, route group `(site)`), avec sous-dossiers colocalisés `_home/` (composants exclusifs à la home) et fichiers `*.module.css`/`illustrations.tsx`/`diagrams.tsx` par page.
- `app/(admin)/…` et `app/api/…` — back-office et routes API séparés.
- `components/` en 5 familles : `ui/` (primitives), `shared/` (sections réutilisables), `layout/` (Header/Footer/EmergencyBar/LocaleSwitcher), `features/` (admin, blog, contact/QuoteWizard), `icons/`, plus `Effects/`, `Breadcrumb/`, `Pagination/`.
- `lib/`, `hooks/`, `i18n/`, `data/`, `content/`, `config/`, `styles/` — logique, données, config, styles globaux.

**Oui, un vrai design system existe** (pas de l'ad-hoc par page) :

1. **Tokens de design** — `src/app/styles/variables.css` (`:root`, ~291 déclarations `--…` : couleurs sémantiques, typographie, glows, mappings legacy) + `config/tokens/css-tokens.json` (2097 lignes). Palette semantique unique (`--color-primary: #e86e10`, etc.) référencée partout.
2. **Primitives UI** — `src/components/ui/` : `Button`, `Card`, `Heading`, `SectionHeading`, `Section`, `Container`, `Stack`, `Input`/`Select`/`Textarea`/`Label` (formulaires), `Eyebrow`, `Icon`, `Reveal`, `LinkMore`, `Navigation`, `ProgressBar`, `ThemeToggle`, `OptimizedImage`, `Breadcrumbs`. Chaque primitive a son `*.module.css`.
3. **Composants de section partagés** — `src/components/shared/` (11 composants) exposés via un barrel unique `index.ts`, plusieurs avec **données par défaut** (`DEFAULT_TRUST_ITEMS`, `DEFAULT_CYFUN_TIERS`), ce qui est le signe d'un système pensé pour la réutilisation.
4. **Styling** — CSS Modules par composant + styles globaux (`globals.css`, `styles/typography.css`, `utilities.css`, `breakpoints.css`). Cohérence par les tokens plutôt que valeurs en dur.

**Conclusion** : l'architecture est saine et non dupliquée au niveau code — tokens → primitives `ui/` → sections `shared/` → pages compositrices. Les seuls foyers de duplication sont (a) le **contenu** de la méthodologie (3 versions FR/NL/EN à maintenir, dont 2 quasi-jumelles), et (b) un **rendu manuel dupliqué** des étapes dans `approche` qui n'utilise pas `ProcessSteps`.

---

# Section 3 — Liens et navigation

## Méthodologie

Tests HTTP réels sur `https://smidjan.be` avec un User-Agent navigateur (`Mozilla/5.0 ... Firefox/128.0`), consultés le **2026-07-07**. Le pare-feu du site renvoie **403** aux UA bots (`curl/8.0` confirmé 403) — non pertinent ici, tous les tests ci-dessous utilisent un UA navigateur. Codes = statut brut de la 1re réponse ; `final` = après suivi des redirections. Inventaire des liens extrait du dépôt (header, footer, switcher, contenu, wizard).

## Résultat global

- **Toutes les pages principales (FR `/`, NL `/nl`, EN `/en`)** répondent **200**. Aucune page de niveau supérieur n'est en 404.
- **Toutes les redirections de config** fonctionnent (mais en **308**, pas 301 — voir plus bas).
- **Deux défauts réels bloquants** : (1) **100 % des articles de blog renvoient 500**, (2) une **ancre morte** `/mentions-legales#confidentialite`. Plus un **défaut i18n** de perte de préfixe de locale sur toute la navigation NL/EN.

## Pages principales — FR / NL / EN (toutes 200)

| Source (repo) | URL testée | Statut | Verdict |
|---|---|---|---|
| Header/Footer `SiteHeader.tsx:49`, `SiteFooter.tsx:19` | `/` , `/nl` , `/en` | 200 / 200 / 200 | OK |
| Nav `SiteHeader.tsx:11` | `/services` , `/nl/services` , `/en/services` | 200 / 200 / 200 | OK |
| Nav `SiteHeader.tsx:12` | `/conformite-nis2` (+`/nl`,`/en`) | 200 | OK |
| Nav `SiteHeader.tsx:13` | `/approche` (+`/nl`,`/en`) | 200 | OK |
| Nav `SiteHeader.tsx:14` | `/agence` (+`/nl`,`/en`) | 200 | OK |
| Nav `SiteHeader.tsx:15` / Footer `:128` | `/blog` (+`/nl`,`/en`) | 200 | OK (mais liste des articles cassée, cf. ci-dessous) |
| CTA `SiteHeader.tsx:115`, Footer `:113` | `/contact` (+`/nl`,`/en`) | 200 | OK |
| Footer légal (cible) `cgv.tsx:97` etc. | `/mentions-legales` , `/confidentialite` , `/cgv` (+`/nl`,`/en`) | 200 | OK |

## Redirections (footer légal + anciennes URLs) — fonctionnent, mais en 308

| Source (repo) | URL testée | Statut | Cible | Verdict |
|---|---|---|---|---|
| Footer `SiteFooter.tsx:162` | `/legal-notice` | **308** | `/mentions-legales` (200) | Redirige OK |
| Footer `SiteFooter.tsx:163` | `/privacy` | **308** | `/confidentialite` (200) | Redirige OK |
| Footer `SiteFooter.tsx:164` | `/terms` | **308** | `/cgv` (200) | Redirige OK |
| Wizard `Step5Contact.tsx:479/489` | `/privacy` , `/legal-notice` | **308** | idem | Redirige OK |
| Wizard `StepCodeOwnership.tsx:389` | `/cms-ecommerce` | **308** | `/services` (200) | Redirige OK |
| `next.config.ts:127` | `/about` | **308** | `/agence` (200) | Redirige OK |
| `next.config.ts:117` | `/produits/foo` | **308** | `/services` | Redirige OK |
| `next.config.ts:122` | `/services/smidjan-cms` | **308** | `/services` | Redirige OK |
| Switcher `LocaleSwitcher.tsx` (rend `/fr`) | `/fr` , `/fr/services` | **307** | `/` , `/services` | Redirige OK (saut supplémentaire) |

**Note SEO** : `next.config.ts:101-148` déclare `permanent: true` et les commentaires disent « 301 permanent », mais Next.js émet un **308** (et 307 pour le retrait de préfixe `/fr`). Équivalent en préservation SEO, mais l'écart commentaire/réalité mérite correction.

## Ancres (fragments) — cible vérifiée sur la page live

| Source (repo) | URL testée | id présent ? | Verdict |
|---|---|---|---|
| `page.tsx:125/137/149` (accueil) | `/services#securiser` `#tester` `#developper` | oui / oui / oui | OK |
| `services/page.tsx:198-201` | `#securiser #tester #developper #conformer` | tous présents | OK |
| `conformite-nis2/page.tsx:133` | `/conformite-nis2#niveaux` | oui | OK |
| `approche/page.tsx:142` | `/approche#method` | oui | OK |
| `agence/page.tsx:92` | `/agence#contact` | oui | OK |
| `contact/page.tsx:129` | `/contact#form` | oui | OK |
| `mentions-legales/page.tsx:109` | `/confidentialite#cookies` | oui | OK |
| **`ContactForm.tsx:432`** | **`/mentions-legales#confidentialite`** | **NON — id absent** | **CASSÉ (ancre morte)** |

Détail : la page `/mentions-legales` ne contient que les ids `editeur`, `responsable-publication`, `hebergement`, `propriete-intellectuelle`, `contact` (+ variantes `-h`). Aucun `confidentialite`. Le lien de consentement RGPD du formulaire de contact renvoie 200 mais **ne défile vers aucune section** ; la politique de confidentialité est en réalité une page séparée (`/confidentialite`). Cible probablement erronée.

## DÉFAUT CRITIQUE — tous les articles de blog renvoient 500

L'index `/blog` (200) liste **20 articles** ; **chacun des 20 liens `/blog/<slug>` renvoie 500** (stable sur 3 essais), sur **les 3 locales** (`/blog/...`, `/nl/blog/...`, `/en/blog/...` = 500). Un slug **inexistant** renvoie aussi **500** au lieu de 404. Titre de la page d'erreur : « 500: This page couldn't load ». La route `/blog/[slug]` plante côté serveur pour toute requête.

Impact navigation : le lien nav « Journal » (`SiteHeader.tsx:15`), le footer « Ressources » (`SiteFooter.tsx:128`), tous les liens de l'index blog, ainsi que les liens prev/next et articles liés internes, aboutissent à des pages mortes. Les `blogUrl` du wizard (`Step1ProjectType.tsx:45-70`, ex. `/blog/difference-site-vitrine-ecommerce-application-web`, `/blog/audit-securite-pentest-difference-belgique`, `/blog/automatisation-ia-chatbot-rpa-belgique`) renvoient aussi 500 — et ces slugs **n'apparaissent pas** dans l'index blog, donc probablement 404 même après correction du 500.

## DÉFAUT i18n — la navigation NL/EN perd le préfixe de locale

`SiteHeader.tsx` et `SiteFooter.tsx` importent `Link` depuis `next/link` (et non depuis `@/i18n/navigation`). Seul `LocaleSwitcher.tsx` utilise le `Link` i18n. Conséquence vérifiée sur le HTML live de `/nl` : les liens header/footer/contenu sont rendus **sans préfixe** (`href="/services"`, `/conformite-nis2`, `/approche`, `/agence`, `/blog`, `/contact`, ainsi que `/services#securiser` et les liens légaux `/legal-notice` `/privacy` `/terms`). Cliquer n'importe quel lien de navigation depuis le site NL/EN **ramène l'utilisateur sur la version FR** (les URLs renvoient 200, mais la locale est perdue).

Corollaire : les redirections légales préfixées **n'existent pas** — `/nl/legal-notice`, `/en/privacy`, `/nl/about` renvoient **404** (les règles de `next.config.ts` ne matchent que les chemins nus). En pratique l'utilisateur ne tombe pas sur ces 404 puisque le footer génère des liens non préfixés, mais la lacune existe.

## Verdicts — synthèse

- **Réellement cassé (500)** : les 20 articles `/blog/<slug>` (FR/NL/EN) + slugs blog inexistants (500 au lieu de 404).
- **Réellement cassé (ancre morte)** : `/mentions-legales#confidentialite` (page 200, fragment inexistant).
- **Défaut fonctionnel i18n** : navigation NL/EN sans préfixe de locale (liens 200 mais perte de langue) ; redirections légales préfixées en 404.
- **Redirections** : toutes fonctionnelles, mais 308/307 alors que le code annonce « 301 ».
- **OK** : toutes les pages principales et toutes les autres ancres.

---

# Section 4 — Images

## Section 4 — Images

Scope: every raster image rendered on the site (repo `src/UIs/nextjs`), its source and `next/image` handling, plus a photo-quality/cliché audit against the desired premium cyber-infra style. All findings are from the repo working tree; images were visually inspected by opening the files. Consulted: 2026-07-07.

### 4.1 Technical handling — good baseline, no raw `<img>`

**Every rendered raster image goes through `next/image` or the project's `OptimizedImage` wrapper. There are zero raw `<img>` tags in JSX** (the only `<img` matches are in `src/middleware.ts:193,197`, a matcher comment/regex — not markup). Header/footer logos are inline `<svg>` (`SiteHeader.tsx:50`, `SiteFooter.tsx:20`), so no logo raster is rendered.

- `OptimizedImage` (`src/components/ui/OptimizedImage/OptimizedImage.tsx`) wraps `next/image`, defaults lazy-load, `quality=80`, responsive `sizes` presets, skeleton + error fallback. Solid component.
- `next.config.ts:42` sets `formats: ["image/avif","image/webp"]` with sensible `deviceSizes`/`imageSizes`. **Source files are `.jpg` (page photos, blog covers) and `.webp` (og, logos), but delivery is transcoded to AVIF/WebP by Next** — so the non-modern source format is not a delivery problem.

**Dimensions / alt inventory (all rendered images):**

| File:line | Image | width/height or fill | alt source | Notes |
|---|---|---|---|---|
| `approche/page.tsx:294` | approche/methode-architecture.jpg | 1200×801 | `t("method.photo1Alt")` | ⚠ Portuguese text in photo |
| `approche/page.tsx:307` | approche/planification-roadmap.jpg | 1400×933 | `t("method.photo2Alt")` | cliché |
| `approche/page.tsx:410` | approche/collaboration-expert.jpg | 1200×800 | `t("why.photoAlt")` | cliché |
| `agence/page.tsx:119` | agence/liege-nuit.jpg | 1400×788, `priority` | `t("hero.imageAlt")` | keep (best) |
| `agence/QuiSommesNous.tsx:147` | agence/couverture-europe.jpg | 1200×798 | `t("about.coverageAlt")` | ⚠ wrong continent |
| `agence/Fondateur.tsx:172` | agence/infrastructure.jpg | 1200×673 | `t("founder.infraAlt")` | mislabeled; reused |
| `contact/page.tsx:158` | contact/office-team.jpg | 640×430, `priority` | `t('hero.imageAlt')` | cliché |
| `contact/page.tsx:191` | contact/incident-response.jpg | 520×230 | `t('side.incidentImageAlt')` | acceptable |
| `contact/page.tsx:270` | contact/support-desk.jpg | 480×230 | `t('side.coordImageAlt')` | cliché |
| `_home/Testimonials.tsx:45` | home/collaboration-pme.jpg | `fill` + `sizePreset` | `t("testimonials.photoAlt")` | worst cliché |
| `conformite-nis2/page.tsx:213` | conformite/gouvernance-comite.jpg | 1400×935 | `t("clair.photoAlt")` | cliché |
| `conformite-nis2/page.tsx:331` | conformite/audit-checklist.jpg | 1400×788 | `t("cyfun.photoAlt")` | weak |
| `conformite-nis2/page.tsx:479` | conformite/audit-collaboration.jpg | 1200×800 | `t("accompagnement.photoAlt")` | cliché |
| `services/PillarVisuals.tsx:51` | services/securiser-datacenter.jpg | 1400×933 | `t("photoAlt")` | ⚠ 3rd-party brand |
| `services/PillarVisuals.tsx:120` | services/tester-ecrans.jpg | 1400×933 | `t("photoAlt")` | cliché |
| `services/PillarVisuals.tsx:195` | services/developper-architecture.jpg | 1400×933 | `t("photoAlt")` | cliché |
| `services/PillarVisuals.tsx:243` | services/conformer-audit.jpg | 1400×933 | **hardcoded FR string** | ⚠ a11y/i18n bug |
| `blog/[slug]/page.tsx:24 & 232`; `BlogFilter.tsx:19`; `FeaturedArticle.tsx:59` | 20× blog covers | `fill` + `sizes` (+`priority` on featured) | `alt={article.title}` | title-as-alt (mild) |

Everything has explicit `width`/`height` or `fill` with `sizes` — no CLS-risk missing dimensions, no missing/empty alt. Two alt-quality issues below.

**Alt / i18n defects**
- `services/PillarVisuals.tsx:244` — `conformer-audit` alt is a **hardcoded French string** (`"Équipe de professionnels examinant…"`) while every sibling pillar uses `t("photoAlt")`. On `/nl` and `/en` this alt stays French — an accessibility + i18n bug and an inconsistency.
- Blog covers use `alt={article.title}` (`BlogFilter.tsx:19`, `FeaturedArticle.tsx:59`, `blog/[slug]/page.tsx:26,234`). The cover is decorative and the title is already the visible `<h1>`, so screen readers hear it twice. Minor; consider `alt=""` for the decorative in-article hero.

**Housekeeping (non-rendering)**
- Orphaned assets never referenced anywhere in `src/`: `public/images/smidjan-cms-*.webp` (4 files), `public/images/logoheader/logo.webp` + `logo-200.{jpg,png,svg}`, `public/images/logofooter/smidjan-footer-logo.webp` (logos are inline SVG). Dead weight.
- `next.config.ts:80` `remotePatterns` still allow-lists `innowise.com/wp-content/uploads/**`, but no remote image is used (all self-hosted). Leftover from placeholder sourcing — remove.
- `og-image.webp` / `og/contact-og.webp` are used only as OpenGraph metadata URLs — correct, not rendered.

### 4.2 Photo quality — reference style vs. cliché stock

The **desired premium cyber-infra look already exists in two images**, which should be the visual north star (the "printed-circuit-board / infra" reference):
- **`home/infrastructure-datacenter.jpg`** — dark server racks with glowing green/amber patch cables. On-brand, keep.
- **`services/securiser-datacenter.jpg`** — macro of a network switch with blue/orange cables. Great style and the orange even echoes the brand accent — **but a third-party brand logo "NorthC" (a real Dutch datacenter operator) is legible in the frame.** Replace with an unbranded equivalent.
- **`agence/liege-nuit.jpg`** — the Pont de Fragnée in Liège at blue hour. Authentic, local, the single strongest image on the site. Keep.

Note: the mission referenced "the printed-circuit-board image on `/approche`", but **none of the three `/approche` photos in the repo is a circuit board** — they are the whiteboard/sticky-note/laptop clichés below (the redesign branch replaced whatever prod showed). So `/approche` is currently the *weakest* page for imagery, not the reference. Treat the datacenter/switch shots above as the reference aesthetic.

**Generic / cliché stock to replace (ranked worst first):**

1. **`home/collaboration-pme.jpg`** — two businesspeople doing a **high-five over a laptop**. The most overused "success" stock trope on the internet. On the homepage testimonial. Highest-visibility offender.
2. **`agence/couverture-europe.jpg`** — Earth-from-space night lights, labeled "couverture Europe" — **but the illuminated landmass is North America (US Gulf/SE coast), not Europe.** Cliché *and* factually wrong for a "European coverage" claim.
3. **`approche/methode-architecture.jpg`** — woman writing on a glass wall that reads **"SISTEMA DE GESTÃO" (Portuguese)** and other PT words, on a FR/NL/EN Belgian site. Cliché whiteboard shot + language mismatch.
4. **`services/conformer-audit.jpg`** — four men in suits leaning over papers on a grey backdrop. Dated, staff-photo-stock feel; also carries the hardcoded-alt bug.
5. **`conformite/gouvernance-comite.jpg`** — generic US-style boardroom with ~12 people and a projector. Reads as a stock library, not a Belgian PME governance context.
6. **`contact/office-team.jpg`** — four people huddled at laptops under a "TEAM" wall sign. Implies a sizable team (the entity is effectively a solo founder per project context) and is classic corporate stock.
7. **`approche/collaboration-expert.jpg`** — anonymous hands pointing at a MacBook. Filler.
8. **`approche/planification-roadmap.jpg`** — man arranging yellow sticky notes on glass. Generic "agile/scrum" stock.
9. **`services/developper-architecture.jpg`** — a MacBook showing HTML/CSS tutorial code on a white desk. Generic dev-desk stock; not "architecture".
10. **`services/tester-ecrans.jpg`** — three people at desks in a bright office. Generic co-working stock.
11. **`agence/infrastructure.jpg`** — a **home desk with dual monitors** (one shows a XING ad in German). Labeled "infrastructure" but depicts a bedroom desk. Reused on both `/agence` and the founder block, doubling the mismatch.
12. **`conformite/audit-collaboration.jpg`** — cropped hand signing a paper with a pen. "Signing the contract" cliché.
13. **`conformite/audit-checklist.jpg`** — hand ticking checkboxes on an iPad (orange wristband is an on-brand accent). Weak/literal; lower priority.
14. **`contact/support-desk.jpg`** — woman on a phone behind a monitor. Generic; at least looks European/domestic.
15. **`contact/incident-response.jpg`** — a dark multi-monitor control room (actually a flight-simulator console). Passable "SOC/NOC" vibe; keep only if a real SOC shot isn't sourced.

### 4.3 Concrete replacement queries (target the datacenter/PCB reference style)

Concrete subjects only, matching the switch/rack/circuit aesthetic (shallow depth of field, moody, blue/teal + amber accents, no faces, no legible third-party brands):

| Replace | Concrete search subject |
|---|---|
| home/collaboration-pme | "macro printed circuit board copper traces shallow depth of field" or a real Liège client-meeting photo |
| agence/couverture-europe | "fiber optic network map of Europe glowing nodes" / "submarine cable landing Europe night" (must show Europe) |
| approche/methode-architecture | "software architecture diagram on dark monitor close up" / "network topology whiteboard clean" |
| approche/planification-roadmap | "Gantt roadmap on laptop screen dark UI close up" |
| approche/collaboration-expert | "engineer hands on mechanical keyboard terminal green code" |
| services/securiser-datacenter (rebrand) | "unbranded network switch RJ45 patch cables macro" / "firewall appliance rack close up" |
| services/tester-ecrans | "penetration testing terminal multiple screens dark room" / "code security scan Burp Suite screen" |
| services/developper-architecture | "server rack blade servers close up blue LED" / "Next.js code on IDE dark theme close up" |
| services/conformer-audit | "cybersecurity compliance dashboard checklist on monitor" / "ISO 27001 audit documents flat lay dark desk" |
| conformite/gouvernance-comite | "small business team reviewing security policy laptop Europe office" |
| conformite/audit-collaboration | "security audit report on tablet risk matrix close up" |
| contact/office-team | "single consultant workstation dual monitor SOC dark" (avoid implying a large team) |
| contact/support-desk | "help desk headset workstation dark UI monitor" |
| agence/infrastructure | "data center cold aisle server rows perspective" / "network operations center wide" |

Keep as-is: `home/infrastructure-datacenter.jpg`, `agence/liege-nuit.jpg`.

### Summary
Technical image handling is genuinely good (100% `next/image`/`OptimizedImage`, dimensions present, AVIF/WebP delivery, meaningful localized alts — with two exceptions). The real weakness is **photo curation**: ~14 of ~18 distinct page photos are generic corporate/dev stock that undercut the premium cybersecurity positioning, plus three concrete credibility bugs (wrong continent, Portuguese text, a competitor's brand logo) and one hardcoded non-localized alt.

---

# Section 5 — SEO stratégique 2026

## Section 5 — SEO stratégique 2026 (Smidjan / smidjan.be)

Méthode : recherche web live (juillet 2026) + inspection du repo (READ-ONLY) + fetch du site en production avec un User-Agent navigateur (le firewall renvoie 403 aux UA bots ; les 200 ci-dessous sont donc réels). Toute affirmation SEO est datée et sourcée.

---

### 1. Optimiser pour l'IA générative (AI Overviews / AI Mode) — guidance Google actuelle

Google a publié le **15 mai 2026** une ressource officielle « Optimizing your website for generative AI features on Google Search », annoncée sur le Search Central Blog et rangée dans une nouvelle section « Generative AI fundamentals » de la doc.
- Blog : https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing (consulté 2026-07-07)
- Guide : https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (consulté 2026-07-07)

Points clés (verbatim de la doc, pas de mémoire) :
- **« Still SEO »** : les fonctionnalités génératives s'appuient sur les mêmes systèmes de ranking/qualité. Aucune exigence ni optimisation spéciale supplémentaire pour apparaître dans AI Overviews / AI Mode. (Search Engine Journal, 2026-05 : https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/575026/ ; consulté 2026-07-07)
- Google déclare **inutiles** : `llms.txt`, le *content chunking*, la réécriture « spéciale IA », et le *schema spécial* pour l'IA. Les systèmes comprennent le multi-sujet d'une page et les synonymes.
- Ce qui compte : contenu **unique, à valeur, non-commodité**, + contenu local/shopping/image/vidéo pertinent.

**Implication pour Smidjan** : la stratégie doit rester du SEO/E-E-A-T solide, pas des hacks « GEO ». Bon signal : le `robots.txt` autorise déjà GPTBot / ChatGPT-User / anthropic-ai (vérifié live sur https://smidjan.be/robots.txt, 2026-07-07). **Nuance** : ce robots.txt autorise ces bots IA sur `/`, `/blog/`, `/about`, `/services`, `/contact` mais **pas explicitement `/conformite-nis2` ni `/approche` ni `/agence`** — les pages de conversion NIS2 (le cœur de l'offre) ne sont pas listées dans les allow des crawlers IA. À corriger : `/about` est d'ailleurs un chemin inexistant (la page est `/agence`).

### 2. Core Web Vitals — seuils actuels vérifiés

Seuils « Good » au p75 des données terrain (CrUX), **inchangés en 2026** :
| Métrique | Bon | Source |
|---|---|---|
| **LCP** | ≤ 2,5 s | web.dev/articles/vitals |
| **INP** | ≤ 200 ms | web.dev/articles/vitals |
| **CLS** | ≤ 0,1 | web.dev/articles/vitals |
- Référence : https://web.dev/articles/vitals et https://web.dev/articles/defining-core-web-vitals-thresholds (consulté 2026-07-07). Le seuil de passage exige que **75 % des visites** soient « Good ».
- MAJ 2026 signalée : méthodologie INP resserrée sur les pages input-heavy, support soft-navigation (SPA) étendu dans CrUX, TTFB plus visible dans PageSpeed Insights — **mais les 3 seuils ne changent pas** (corewebvitals.io/core-web-vitals ; digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide ; consulté 2026-07-07).

**Repo** : bons réflexes déjà en place — `next/font` avec `display:'swap'`, `preload`, `adjustFontFallback` (src/app/layout.tsx:23-41) ; `@vercel/speed-insights` monté en prod (src/app/layout.tsx). Recommandation : surveiller INP (nombreux effets curseur/scroll : CursorGlow, ScrollProgress, RouteProgress dans src/components/Effects/) et CLS de la EmergencyBar injectée en tête de layout (src/app/[locale]/(site)/layout.tsx:9). Mesurer au p75 via CrUX/Search Console, pas en lab.

### 3. Crawlabilité, rendu & données structurées

**SSR/SSG : bon.** Pages localisées pré-rendues à build (`generateStaticParams` sur les locales, `setRequestLocale`) — src/app/[locale]/layout.tsx:8-10. Le fetch live confirme du **vrai HTML server-rendered** : les 3 blocs JSON-LD de la home (Organization, WebSite, ProfessionalService) sont présents dans le HTML brut, et la FAQ de `/conformite-nis2` est rendue en dur (questions « Suis-je concerné par NIS2 », « Quel niveau CyFun choisir » visibles dans le HTML — vérifié 2026-07-07). Le `FAQPage` JSON-LD **correspond** donc au contenu affiché (src/lib/schema.ts:135-193 vs page rendue). Pas de piège CSR sur le contenu principal.

**Types structurés présents (repo + rendu live)** :
- `Organization` + `WebSite` + `ProfessionalService`/LocalBusiness sur la home (src/app/[locale]/(site)/page.tsx:84-93) — rendus.
- `FAQPage` sur /conformite-nis2 — rendu, correspond.
- `BreadcrumbList` sur services, contact, blog, mentions-legales, cgv, confidentialite (grep confirmé).
- `ItemList`/`Service` sur /services (src/app/[locale]/(site)/services/page.tsx:87+).
- `BlogPosting` sur les articles (src/lib/schema.ts:createArticleSchema).

**Défauts structurés à corriger** :
1. **Pas de liage @id** : `ProfessionalService` porte `@id":"https://smidjan.be/#organization"` (src/lib/schema.ts:52) mais l'`Organization` de la home **n'a pas de `@id`** et n'est pas relié. Deux entités « Smidjan » distinctes sont émises sur la même page → dédupliquer via un `@id` commun (graph `@graph` avec `Organization` = `LocalBusiness` reliés).
2. **`sameAs` incohérents avec le reste du site** (voir §6).
3. `aggregateRating` commenté (normal tant qu'il n'y a pas d'avis — ne pas fabriquer, cf. E-E-A-T §7).

**PROBLÈME CRITIQUE i18n (crawlabilité)** — le site est trilingue (FR `/`, NL `/nl`, EN `/en`) mais :
- **Les pages NL/EN se canonicalisent vers l'URL FR.** Vérifié live 2026-07-07 : `https://smidjan.be/nl` → `<link rel="canonical" href="https://smidjan.be">` ; `https://smidjan.be/nl/services` → `canonical https://smidjan.be/services`. Google va donc traiter NL et EN comme des **doublons du FR et ne pas les indexer**. Cause racine : `canonical` codé en dur (`"/"`, `"/services"`, `"/conformite-nis2"`) résolu contre `metadataBase` identique pour toutes les locales (src/app/[locale]/(site)/page.tsx:42, services/page.tsx:46, conformite-nis2/page.tsx:41). **Tout l'investissement NL/EN est neutralisé.**
- **hreflang absent/incomplet.** La home `/` n'émet **aucun** `<link rel="alternate" hreflang>` (l'objet `alternates` de page.tsx:41-43 n'a pas de `languages`). `/services` n'émet que `fr-BE` et `fr` pointant tous deux vers l'URL FR — **aucune alternative `nl`/`en`** alors que `/nl/services` et `/en/services` existent (200 OK). Il manque aussi `x-default`.
- Correctif attendu : générer canonical + hreflang **par locale** (next-intl expose des helpers ; ou construire `alternates.canonical` et `alternates.languages` dynamiquement à partir de `params.locale`), avec `fr → /`, `nl → /nl/...`, `en → /en/...` réciproques + `x-default`. Référence Google i18n : https://developers.google.com/search/docs/specialty/international/localized-versions (consulté 2026-07-07).

### 4. Meta-keywords — vérifié : ignorés (et présents dans le code)

**Vérifié en ligne** : Google n'utilise pas la balise `meta keywords` pour le ranking — position officielle depuis le billet Search Central du **21 sept. 2009**, toujours valable en 2026 (https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag ; recoupé 2026-07-07). Bing ne l'utilise pas non plus comme signal positif et peut traiter un **excès** de meta keywords comme signal de spam (safaridigital, clickmentality, 2026 ; consulté 2026-07-07).

**Présents dans le repo ET rendus** : `keywords` déclaré dans src/app/layout.tsx:53 (racine) **et** dupliqué sur chaque page (home page.tsx:31, services/page.tsx:36, conformite-nis2/page.tsx:28, agence, approche, blog…). Confirmé live : `<meta name="keywords" content="cybersécurité PME Liège,conformité NIS2 Belgique,…">` sur la home (2026-07-07). **Recommandation** : supprimer tous les tableaux `keywords` — aucune valeur SEO, léger risque côté Bing, et bruit de maintenance. Priorité basse mais gain net.

### 5. Cannibalisation « NIS2 PME » entre home / services / conformite-nis2

Réel chevauchement d'intention sur le cluster NIS2 :
- **home** (page.tsx:31-42) cible `conformité NIS2 Belgique`, `CyberFundamentals CyFun CCB`, `analyse d'écart NIS2`, `remédiation cybersécurité PME`.
- **services** (services/page.tsx:36-44) cible `conformité NIS2 CyFun`.
- **conformite-nis2** (conformite-nis2/page.tsx:28-38) cible `NIS2`, `CyFun`, `conformité NIS2 Belgique`, `remédiation cybersécurité`.

Les trois pages visent la même requête transactionnelle « NIS2 PME / conformité NIS2 ». Google risque de faire osciller la page classée et de diluer l'autorité. **Recommandation** (aligne avec la suppression des keywords) :
- Faire de **/conformite-nis2 la page pilier canonique** pour « NIS2 PME / CyFun / conformité NIS2 Belgique » (elle a la FAQ + les diagrammes + l'intention transactionnelle).
- **Home** : intention « marque + cybersécurité PME Liège » ; ne mentionner NIS2 qu'en teaser avec **lien interne descendant** vers /conformite-nis2 (le `CyfunIntro` existe déjà en home — bon).
- **Services** : intention « catalogue de prestations » (réseau, pentest OWASP, dev sécurisé) ; renvoyer NIS2 vers le pilier plutôt que de re-cibler la requête.
- Différencier titres/H1/`description` et renforcer le **maillage interne** ancré sur des libellés distincts. Cohérent avec la guidance IA (§1) : « les systèmes comprennent le multi-sujet » — inutile de sur-répéter la même requête sur 3 pages.

### 6. Cohérence NAP + Google Business Profile

**Incohérence NAP confirmée (live + repo)** — sur la home rendue, **deux e-mails coexistent** : `contact@smidjan.be` (footer + JSON-LD) **et** `smidjan.agency@outlook.com` (vérifié 2026-07-07).
- JSON-LD / schema.ts : email `contact@smidjan.be`, tél `+32475205562` (src/lib/schema.ts:16-17, 63-64).
- layout.tsx `other` meta : `contact:email = smidjan.agency@outlook.com`, `contact:phone = +32 475 20 55 62` (src/app/layout.tsx:171-172).
- constants.ts `SITE_CONFIG` : email `smidjan.agency@outlook.com`, **description obsolète** « Studio web à Liège spécialisé en développement de sites, e-commerce, SEO » (src/lib/constants.ts:1-14) — contredit le positionnement cyber-first.
- **Facebook incohérent** : schema `sameAs` → `facebook.com/jeanbaptiste.dhondt` (perso) ; constants → `facebook.com/profile.php?id=61583157825804`. Idem le compte perso LinkedIn/GitHub d'une personne vs entité.

NAP incohérent = signal de confiance dégradé (Google et moteurs IA recoupent). **Recommandation** : une **source unique de vérité** (un email pro unique — de préférence `contact@smidjan.be`), un numéro au **format unique et international** partout, des `sameAs` pointant vers les **profils de l'entité** (pas des profils perso mélangés), et mettre à jour la description obsolète de constants.ts.

**Google Business Profile** : le schéma `ProfessionalService` déclare `geo`, `openingHours`, `areaServed` (Liège/Wallonie/Belgique) et `postalCode 4000` **mais aucune adresse postale de rue** (src/lib/schema.ts:66-72). Sans GBP vérifié, quasi aucune chance d'apparaître dans le **Local Pack / Google Maps** ni d'alimenter les AI Overviews locales. **Recommandation** : créer/vérifier un **Google Business Profile** — comme *service-area business* (entreprise sans vitrine physique) si pas d'accueil client, avec zone Liège/Wallonie, catégorie « Service de sécurité informatique / Consultant en cybersécurité », **NAP strictement identique** à celle du site et du JSON-LD. Guidance : https://developers.google.com/search/docs/appearance/structured-data/local-business (LocalBusiness) et la doc GBP (consulté 2026-07-07). Sans GBP, la partie « Local » de la guidance IA (§1) reste inexploitée.

### 7. E-E-A-T — vérifié actuel, risques de confiance

**Vérifié en ligne** : E-E-A-T reste le cadre actuel. Les Search Quality Rater Guidelines en vigueur datent du **11 septembre 2025** (182 pages) et sont toujours d'actualité mi-2026 (https://services.google.com/fh/files/misc/hsw-sqrg.pdf ; keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/ ; consulté 2026-07-07). Le **core update de mars 2026 a amplifié le premier « E » (Experience)** : le contenu démontrant une expérience de première main (détails spécifiques, résultats originaux, **credentials auteur vérifiables**) surclasse les pages exhaustives mais impersonnelles (digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide ; consulté 2026-07-07). **E-E-A-T s'applique à tout le contenu** (pas seulement YMYL) — et la cybersécurité/conformité **est du YMYL**, donc barre de Trust élevée.

**Risques de confiance dans le repo/site** :
- **Testimonials** : composant `Testimonials` en home (src/app/[locale]/(site)/_home/Testimonials.tsx). Si les avis sont des placeholders/inventés, c'est un **risque Trust majeur** (et interdit d'en faire un `Review`/`aggregateRating` JSON-LD tant qu'ils ne sont pas réels et vérifiables). Vérifier qu'ils sont authentiques ou les retirer.
- **`foundingDate: 2025`** + absence d'avis → jeune entité : compenser par des **credentials auteur vérifiables** (page /agence — le `BlogPosting` pointe déjà `author.url = /agence`, bon). Renforcer : certifications réelles (CyFun/CCB, OSCP, etc.), expérience concrète, mentions légales/n° BCE visibles (le repo a `src/lib/cbeapi.ts` → exposer le n° d'entreprise = signal Trust fort en Belgique).
- **Honnêteté déjà bien traitée** : la FAQ précise « Smidjan **n'est pas** organisme de certification, pas accrédité BELAC » (src/lib/schema.ts:159) et il existe un composant `Honesty` — c'est **exactement** le type de signal Trust/transparence valorisé. À conserver/mettre en avant.
- **Toute allégation non vérifiable** (chiffres de résultats, nombre de clients, « X% d'attaques bloquées ») doit être sourcée ou retirée : sous mars-2026, l'« expérience » revendiquée sans preuve est un risque, pas un atout.

---

### Synthèse des correctifs prioritaires
1. **CRITIQUE** — canonical NL/EN pointant vers FR (dé-indexation des versions NL/EN).
2. **ÉLEVÉ** — hreflang absent (home) / incomplet (services : pas de nl/en, pas de x-default).
3. **MOYEN** — cannibalisation NIS2 : faire de /conformite-nis2 le pilier, redescendre home/services.
4. **MOYEN** — NAP incohérent (2 emails, description « studio web » obsolète, Facebook divergent).
5. **MOYEN** — Google Business Profile à créer/vérifier (service-area, NAP alignée).
6. **BAS** — supprimer les `meta keywords` (ignorés, bruit / léger risque Bing).
7. **BAS/MOYEN** — E-E-A-T : vérifier authenticité des testimonials, exposer n° BCE + credentials, lier Organization↔LocalBusiness via `@id`.

Sources principales (consultées 2026-07-07) : developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing ; developers.google.com/search/docs/fundamentals/ai-optimization-guide ; web.dev/articles/vitals ; web.dev/articles/defining-core-web-vitals-thresholds ; developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag ; developers.google.com/search/docs/specialty/international/localized-versions ; services.google.com/fh/files/misc/hsw-sqrg.pdf ; digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide.

---

# Section 6 — Synthèse priorisée (impact x effort)

> Plan priorisé compilé depuis les 5 missions. AUCUNE correction n'est exécutée. Validation attendue section par section, en commençant par la Section 1.

Tri par severite, puis impact, puis effort croissant.

| # | Severite | Sec | Chantier | Impact | Effort |
|---|---|---|---|---|---|
| 1 | CRITICAL | 3 | Tous les articles de blog (/blog/[slug]) renvoient HTTP 500 sur FR/NL/EN — blog entièrement inaccessible | high | medium |
| 2 | CRITICAL | 5 | Canonical NL/EN pointent vers l'URL FR → risque de dé-indexation des versions NL et EN (canonical codé en dur résolu par locale) | high | medium |
| 3 | HIGH | 1 | Plafond chèque cybersécurité faux : 60 000 € affiché vs 50 000 € HTVA officiel (conformite-nis2/page.tsx:760, fr.json + nl.json card2Desc/row4b) | high | low |
| 4 | HIGH | 1 | 3 témoignages clients anonymes sans source (home.*.json) — invérifiables et contredits par les mentions légales ; à retirer ou requalifier | high | low |
| 5 | HIGH | 1 | Chiffres-clés 12+/50+/6+ (Home + Agence) très probablement inventés — placeholders auto-déclarés (agence/page.tsx:182-186), contredits par entité « en cours d'immatriculation » et équipe solo | high | medium |
| 6 | HIGH | 1 | Contradiction intégrité/juridique : mentions légales « BCE/TVA en cours d'immatriculation » + équipe « en construction / NOUS RECRUTONS » vs claims de multi-clients et années d'expérience | high | medium |
| 7 | HIGH | 3 | Navigation NL/EN perd le prefixe de locale : header/footer utilisent next/link au lieu du Link i18n, ramenant l'utilisateur sur le FR | high | medium |
| 8 | HIGH | 4 | Replace ~14 generic/cliché stock photos (high-five, boardroom, sticky-notes, dev-desk) with premium cyber-infra imagery matching the datacenter/switch reference style | high | medium |
| 9 | HIGH | 5 | hreflang absent sur la home et incomplet sur /services (aucune alternative nl/en, pas de x-default) — versions linguistiques non reliées pour Google | high | medium |
| 10 | HIGH | 4 | agence/couverture-europe.jpg shows North America but is labeled/used as 'European coverage' — factual credibility error | medium | low |
| 11 | MEDIUM | 2 | Méthodologie 4 étapes en 3 formulations parallèles (dont 2 quasi-identiques home/conformite) maintenues séparément en FR/NL/EN — risque de dérive de contenu | high | medium |
| 12 | MEDIUM | 1 | Délai chèque « ~5 jours ouvrés » trompeur : 5 j = recevabilité seule, décision réelle ~15 j ouvrés d'examen ; et « portefeuille 200 000 € » confond avec plafond de minimis | medium | low |
| 13 | MEDIUM | 1 | Claim « 100% des données hébergées en Belgique / UE » à vérifier (déploiement Vercel, société US) | medium | low |
| 14 | MEDIUM | 3 | Ancre morte /mentions-legales#confidentialite depuis le consentement RGPD du formulaire de contact (id inexistant ; devrait pointer vers /confidentialite) | medium | low |
| 15 | MEDIUM | 3 | Slug blog inexistant renvoie 500 au lieu de 404 (route [slug] plante sans garde notFound) | medium | low |
| 16 | MEDIUM | 4 | approche/methode-architecture.jpg contains Portuguese text ('Sistema de Gestão') on a FR/NL/EN Belgian site | medium | low |
| 17 | MEDIUM | 4 | services/securiser-datacenter.jpg shows a legible third-party brand logo 'NorthC' — replace with an unbranded equivalent | medium | low |
| 18 | MEDIUM | 5 | NAP incohérent : deux emails (contact@smidjan.be vs smidjan.agency@outlook.com), description « studio web » obsolète dans constants.ts, Facebook divergent | medium | low |
| 19 | MEDIUM | 1 | Garanties produit de l'outil d'audit propriétaire (lecture seule, credentials jamais stockés, journal inaltérable, aucune donnée conservée, NIST CSF 2.0) à confronter à l'implémentation réelle avant publication | medium | medium |
| 20 | MEDIUM | 5 | Cannibalisation « NIS2 PME / CyFun » entre home, services et conformite-nis2 — désigner /conformite-nis2 comme pilier et différencier | medium | medium |
| 21 | MEDIUM | 5 | Créer/vérifier un Google Business Profile (service-area, catégorie cybersécurité, NAP strictement alignée) pour le Local Pack et les AI Overviews locales | medium | medium |
| 22 | MEDIUM | 5 | Vérifier l'authenticité des testimonials et renforcer E-E-A-T (exposer n° BCE, credentials CyFun/OSCP vérifiables) — Trust YMYL, core update mars 2026 | medium | medium |
| 23 | MEDIUM | 4 | PillarVisuals.tsx:244 conformer-audit alt is a hardcoded French string (stays FR on /nl and /en) — a11y + i18n bug | low | low |
| 24 | LOW | 2 | approche/page.tsx:321-345 : rendu manuel des étapes qui ré-implémente la numérotation de ProcessSteps au lieu de réutiliser le composant partagé | medium | low |
| 25 | LOW | 3 | Redirections legales prefixees absentes : /nl/legal-notice, /en/privacy, /nl/about renvoient 404 | low | low |
| 26 | LOW | 3 | Redirections emises en 308/307 alors que le code annonce '301 permanent' (ecart commentaire/realite) | low | low |
| 27 | LOW | 4 | Remove orphaned image assets (smidjan-cms-*, unused logos) and the dead innowise.com remotePattern in next.config.ts | low | low |
| 28 | LOW | 5 | Supprimer les balises meta keywords (ignorées par Google depuis 2009, léger risque spam Bing, bruit de maintenance) | low | low |
| 29 | LOW | 5 | Lier Organization et LocalBusiness via un @id commun (@graph) et compléter robots.txt IA pour /conformite-nis2, /agence, /approche | low | low |
| 30 | LOW | 2 | 'Pourquoi Smidjan' n'est pas un composant partagé (WhySmidjan local au home) — la section 'why' d'approche est une implémentation JSX ad-hoc distincte | low | medium |

**Prochaine etape :** valide la Section 1 (integrite du contenu) pour que je commence par corriger le cheque wallon (50 000 EUR), les chiffres/temoignages inventes et la contradiction legale. Je ne touche a rien avant ton feu vert.
