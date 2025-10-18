PERFORMANCE-AUDIT.md — Audit complet (lecture seule)
Objectif

Cartographier tout ce qui impacte les Web Vitals (LCP, TTFB, INP, CLS) et identifier toutes les optimisations possibles pour atteindre LCP ≤ 2 s (cible 1.6–1.9 s) sur la page d’accueil et les pages critiques.

Périmètre

App Next.js (Home + pages principales).

Client (JS/CSS/Fonts/Images/3rd-party) + serveur (TTFB, headers, cache/CDN).

Lecture seule : aucune modification de code pendant l’audit. Production d’un rapport priorisé.

Environnement de mesure (obligatoire)

Build prod puis run prod (pas de dev mode).

Navigateur: Chrome stable.

Réseau simulé: “Fast 3G” pour stress-test + “No throttling” pour la réalité haute vitesse.

Vue initiale: fenêtre 1366×768 (desktop) et iPhone 12/14 (mobile).

Mesures répétées 3 fois (médiane retenue).

Vider le cache entre les runs “cold”; mesurer aussi un run “warm” (cache chaud).

Indicateurs cibles

LCP ≤ 2.0 s (1.6–1.9 s idéal)

TTFB ≤ 200 ms (edge/CDN recommandé)

INP ≤ 200 ms

CLS = 0 (ou ≤ 0.02)

JS exécutable initial ≤ 150 kB gzip sur la Home

CSS bloquant ≤ 20 kB sur la Home

Polices au-dessus du pli ≤ 2 fichiers (subset), swap actif

Livrables attendus

Inventaires structurés (JSON/CSV/Markdown) :

Assets (JS/CSS/Fonts/Images/3rd-party) avec taille gzip/br, type, cache, timing.

Routes/pages avec poids initial, éléments LCP, scripts critiques.

Captures : Lighthouse, Web Vitals, Network waterfall, Coverage (unused code).

Tableau de priorisation Impact vs Effort (H/M/L).

Plan d’optimisation en lots (Semaine 1, Semaine 2, etc.).

Check-list d’acceptation prête à valider après remédiation.

Tâches d’audit — pas de modification de code
1) Mesure de base (référence)

Lancer la Home en prod et enregistrer : LCP, TTFB, INP, CLS, poids total, nb de requêtes.

Identifier l’élément LCP réel (texte, image, vidéo).

Conserver deux scénarios: “cold cache” et “warm cache”.

2) Waterfall réseau (Network)

Export HAR.

Lister par requête: domaine, type (doc/js/css/font/img), taille réelle, content-encoding (br/gzip), cache-control, ttfb, download, priority.

Drapeaux rouges:

TTFB > 300 ms (origine lente, middleware, SSR lourd).

no-store/no-cache sur assets statiques.

Absence de Brotli/HTTP/2–3.

Requêtes en série (pas de parallélisme).

3) JavaScript (taille, coût, hydratation)

Activer Coverage (DevTools) pour mesurer JS non utilisé au first-paint.

Relever: poids total JS gzip, poids exécuté avant LCP, temps parse/compile/exéc.

Drapeaux rouges: bundles partagés trop gros, composants interactifs chargés sur la Home sans utilité above-the-fold, analytics bloquants, polyfills non nécessaires.

Sortir la liste des modules les plus lourds sur la Home.

4) CSS (bloquant, critique, non-utilisé)

Identifier tous les CSS “render-blocking”.

Mesurer le poids critiquement requis vs le non utilisé au-dessus du pli.

Drapeaux rouges: gros fichier global importé dans _app, reset multiples, frameworks CSS chargés en entier, effets lourds (filters, backdrop) appliqués au header.

5) Polices (fonts)

Recenser familles, graisses, styles, sourcing (CDN/local), display, preload.

Vérifier subsetting (glyphes inutiles), nombre de fichiers au-dessus du pli, temps de téléchargement.

Mesurer présence de FOIT/FOUT, et stabilité des métriques (line-height, font-size-adjust).

Drapeaux rouges: multiples graisses non utilisées dans le hero/nav, @import CSS, display: auto, pas de fallback stack.

6) Images & médias

Même si la Home n’a pas d’image LCP actuellement, inventorier toutes les images/médias du projet: format (AVIF/WebP/PNG/JPEG/SVG), dimensions réelles vs affichées, lazy, fetchpriority, priority.

Drapeaux rouges: images non optimisées, dimensions manquantes (CLS), vidéos auto-play bloquantes.

7) Third-party / scripts externes

Lister chaque script tiers: domaine, taille, moment de chargement, bloquant ou différé, utilité métier.

Drapeaux rouges: tag managers lourds, heatmaps, chat widgets injectés sur la Home au premier paint, polices via CDN sans cache long.

8) Serveur / CDN / headers

Relever: cache-control, etag, vary, content-encoding, server-timing.

Vérifier CDN actif (edge région), cohabitation avec image/font/CDN.

Drapeaux rouges: absence de immutable pour assets versionnés, manque de preconnect vers domaines critiques, middleware exécuté sur toutes les requêtes.

9) Interaction (INP) et main thread

Performance panel: long tasks > 50 ms avant et après LCP.

Identifier composants qui montent/hydratent au-dessus du pli et blocquent le main thread.

Drapeaux rouges: carrousels, sidebars interactives, icônes dynamiques initialisées trop tôt.

10) Accessibilité et stabilité (CLS)

Vérifier placeholders/skeletons pour contenus différés.

S’assurer que dimensions fixes sont définies (nav, logos, avatars).

Drapeaux rouges: police qui change la hauteur de ligne, images sans dimensions, barres fixes qui se montent après coup.

Extractions attendues (format simple)
A) Tableau des assets lourds (exemple de colonnes)
type, url, size_kb_gzip, br?, cache_control, ttfb_ms, download_ms, priority, used_before_LCP (yes/no)

B) Inventaire des polices
family, weight, style, source(cdn/local), files, subset, display, used_above_the_fold (yes/no)

C) Bundles JS clés
bundle, size_kb_gzip, executed_before_LCP_kb, modules_top5, unused_percent_first_paint

D) CSS bloquant
file, size_kb, blocking (yes/no), unused_percent_first_paint

E) Scripts tiers
domain, size_kb, load_timing (beforeInteractive/afterInteractive/lazy), purpose, removable (yes/no)

Priorisation — Impact vs Effort (à remplir)

Haut impact / faible effort (ex: polices via next/font + subset; différer analytics; scinder CSS global).

Haut impact / effort moyen (ex: découpe bundle et dynamic import des widgets non-critiques; RSC-only pour navbar/hero statiques).

Impact moyen / faible effort (ex: headers cache/CDN, Brotli, preconnect).

Long terme (ex: refactor composant carrousel, retrait d’une lib UI lourde).

Recommandations standard attendues (sans modifier le code durant l’audit)

Fonts: next/font, subset minimal, 1–2 fichiers au-dessus du pli, swap, fallback stack, font-size-adjust.

JS: ≤ 150 kB exécutable initial; dynamic() pour tout ce qui n’est pas nécessaire au premier paint; éviter hydratation dans la nav/hero; supprimer polyfills inutiles.

CSS: ≤ 20 kB bloquant; scinder global; éviter filters/blur sur header avant LCP.

Réseau: Brotli + HTTP/2/3; Cache-Control: public, max-age=31536000, immutable pour assets fingerprintés.

CDN: activer edge; TTFB ≤ 200 ms.

Third-party: tout en defer/afterInteractive; rien de bloquant sur la Home; charger sur consentement si possible.

Stabilité: dimensions explicites pour images/avatars/icônes; placeholders/skeletons si lazy.

Check-list d’acceptation (post-remédiation)

LCP (desktop + mobile) ≤ 2.0 s en prod (médiane 3 runs, Fast 3G + No throttling).

TTFB ≤ 200 ms (CDN/edge actifs).

CLS ≤ 0.02. INP ≤ 200 ms.

JS initial ≤ 150 kB gzip; CSS bloquant ≤ 20 kB; polices above-the-fold ≤ 2 fichiers.

Aucun script tiers bloquant.

L’élément LCP s’affiche immédiatement (fallback texte si police non prête), switch de webfont sans saut visible.

Rapport final fourni avec tableaux d’inventaire, captures et priorisation.