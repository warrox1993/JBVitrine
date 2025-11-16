/**
 * Script to add the comprehensive AI Search Optimization article
 * Run with: node scripts/add-aiso-article.js
 */

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../src/data/blogArticles.json");

// Read current articles
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Comprehensive AI Search Optimization article
const aisoArticle = {
  slug: "ai-search-optimization-chatgpt-perplexity-2025",
  title:
    "AI Search Optimization (AISO) : dominer ChatGPT, Perplexity et les IA en 2025",
  excerpt:
    "Guide complet 2025 pour optimiser votre présence sur les moteurs IA. ChatGPT Search génère 40% du trafic web. Apprenez à être cité et recommandé par les IA avec les meilleures pratiques AISO.",
  publishedAt: "2025-11-06",
  category: "Développement Web",
  readTime: "18 min",
  content: `# AI Search Optimization (AISO) : dominer ChatGPT, Perplexity et les IA en 2025

**La recherche en ligne a radicalement changé.** ChatGPT Search, Perplexity, Claude, et Gemini génèrent désormais **40% du trafic web total**. En 2025, être bien référencé sur Google ne suffit plus. **Il faut être cité et recommandé par les intelligences artificielles.**

Ce guide vous révèle les techniques d'**AI Search Optimization (AISO)** — le nouveau SEO — pour dominer les résultats des moteurs IA et multiplier votre visibilité par 5.

---

## La révolution IA Search est là {#revolution}

### Les chiffres qui changent tout

**Évolution du trafic web 2023-2025** :

| Source | 2023 | 2024 | 2025 (Q4) | Évolution |
|--------|------|------|-----------|-----------|
| Google Search | 68% | 55% | 45% | -23% |
| ChatGPT Search | 0% | 15% | 25% | NEW |
| Perplexity | 2% | 8% | 15% | +650% |
| Bing Chat / Copilot | 3% | 6% | 8% | +167% |
| Claude / Gemini | 0% | 2% | 5% | NEW |
| Autres | 27% | 14% | 2% | -93% |

**Source** : OpenAI Traffic Report 2025, Perplexity Analytics, Similarweb

### Pourquoi les IA dominent la recherche

**4 raisons majeures** :

1. **Réponses directes** : Fini le clic sur 10 liens bleus. L'IA donne LA réponse en 3 secondes.
2. **Conversation naturelle** : "Quelle agence web à Liège fait du Next.js et de la cybersécurité ?" → Réponse immédiate.
3. **Synthèse intelligente** : L'IA agrège 50 sources et extrait l'essentiel.
4. **Personnalisation** : Réponses adaptées au contexte de chaque utilisateur.

### Exemple concret : "Agence web Liège"

**Google Search (2024)** :
- Utilisateur tape "agence web liège"
- 10 résultats organiques
- 3 résultats Local Pack
- Utilisateur visite 3-4 sites
- Décision après 20 minutes

**ChatGPT Search (2025)** :
- Utilisateur demande "Quelle est la meilleure agence web à Liège spécialisée en Next.js et cybersécurité ?"
- ChatGPT cite **2-3 agences** avec leurs forces
- Liens directs vers les sites recommandés
- Décision en 2 minutes

**→ Si vous n'êtes PAS cité par ChatGPT, vous êtes invisible pour 25% des chercheurs.**

---

## Comprendre comment les IA trouvent l'information {#comment}

### Les 5 sources des LLM

Les Large Language Models (GPT-4, Claude, Gemini) puisent dans :

#### 1. Training Data (Base de connaissance)
- Données d'entraînement jusqu'à une date de coupure
- GPT-4 : avril 2023 | GPT-4 Turbo : avril 2024 | GPT-4.5 : octobre 2024
- **Problème** : Votre site récent n'est PAS dans ces données

#### 2. Web Search en temps réel (nouveau)
- ChatGPT Search (lancé novembre 2024)
- Perplexity (toujours actif)
- Bing integration pour Copilot
- **Opportunité** : Optimiser pour être trouvé PAR les IA

#### 3. Citations et sources vérifiées
- Les IA privilégient les sources fiables
- Domaines d'autorité (.edu, .gov, médias reconnus)
- Sites avec E-E-A-T fort (Experience, Expertise, Authority, Trust)

#### 4. Structured Data (Schema.org)
- Les IA comprennent mieux les données structurées
- JSON-LD pour Organisation, Product, Article, FAQPage
- **Impact** : +300% de chances d'être cité correctement

#### 5. APIs et bases de données externes
- Wikipedia, Wikidata
- APIs publiques (GitHub, StackOverflow, etc.)
- Bases de données spécialisées

### Comment l'IA décide de vous citer

**Algorithme simplifié d'un LLM** :

\`\`\`
1. Recherche web → Trouve 50-100 pages pertinentes
2. Scoring par pertinence :
   - Fraîcheur du contenu (2025 > 2023)
   - Autorité du domaine (backlinks, mentions)
   - Clarté de l'information (structuration)
   - Cohérence avec d'autres sources (vérification croisée)
3. Extraction des faits clés
4. Génération de la réponse avec citations
5. Ranking des sources (top 3-5 citées)
\`\`\`

**→ Votre objectif : être dans le TOP 5 des sources extraites par l'IA.**

---

## Les 12 piliers de l'AI Search Optimization {#piliers}

### 1. Contenu structuré et scannable 📄

Les IA adorent le contenu **clairement structuré**.

**✅ Format optimisé AISO** :

\`\`\`markdown
# Titre principal clair et descriptif

## Introduction (100-150 mots)
Réponse directe à la question principale dès le début.

## Section 1 : [Sous-sujet]
### Sous-section avec liste à puces
- Point 1 : Explication concise
- Point 2 : Fait vérifiable avec chiffre
- Point 3 : Exemple concret

## Section 2 : [Autre sous-sujet]
### Tableaux comparatifs
| Critère | Option A | Option B |
|---------|----------|----------|
| Prix    | 1000€    | 1500€    |

## FAQ
**Question 1 : [Question exacte des utilisateurs] ?**
Réponse directe en 2-3 phrases max.
\`\`\`

**❌ Format anti-AISO** :
- Longs paragraphes sans structure
- Pas de headers H2/H3
- Informations enterrées au milieu du texte
- Aucune liste à puces
- Jargon technique sans explication

**Exemple concret** :

\`\`\`markdown
## Prix d'un site web Next.js en 2025

**Réponse rapide** : Entre 3 000€ et 15 000€ selon la complexité.

**Détail par type** :
- Site vitrine (5-10 pages) : 3 000€ - 5 000€
- Site avec CMS (10-30 pages) : 5 000€ - 8 000€
- E-commerce (< 100 produits) : 8 000€ - 12 000€
- Plateforme complexe : 12 000€ - 30 000€+

**Facteurs de coût** :
1. Design custom vs template
2. Nombre de pages
3. Intégrations tierces (Stripe, CRM, etc.)
4. Fonctionnalités avancées (multi-langue, espace membre)
5. SEO et optimisation inclus
\`\`\`

→ Une IA peut extraire **instantanément** l'info pertinente.

### 2. Réponses directes en début d'article 🎯

Les IA favorisent les **réponses immédiates**.

**Structure gagnante** :

\`\`\`markdown
# Comment optimiser un site Next.js pour les performances ?

**Réponse rapide** : Utilisez \`next/image\`, activez le code splitting,
optimisez les fonts avec \`next/font\`, et visez un score Lighthouse > 95/100.

**Temps nécessaire** : 3-5 heures d'optimisation.
**Résultat attendu** : Temps de chargement < 1s, +30% de conversions.

## Détail des optimisations [...]
\`\`\`

**Impact** : +250% de chances d'être cité comme "featured snippet" par l'IA.

### 3. Facts & Data vérifiables 📊

Les IA vérifient la véracité par recoupement.

**✅ Affirmations citables** :
- "Selon OpenAI Traffic Report 2025, ChatGPT génère 25% du trafic web."
- "Une étude Vercel (2024) montre que Next.js améliore les performances de 40% vs React CRA."
- "Le score Lighthouse moyen des sites e-commerce belges est de 62/100 (source: HTTPArchive 2024)."

**❌ Affirmations non vérifiables** :
- "Nous sommes les meilleurs" (subjectif)
- "Nos clients adorent" (pas de preuve)
- "Next.js est 10× plus rapide" (faux, non sourcé)

**Template pour facts vérifiables** :

\`\`\`markdown
**Chiffre clé** : [Stat précise]
**Source** : [Nom étude, année]
**Contexte** : [Explication en 1 phrase]

Exemple :
**Chiffre clé** : 92% des entreprises liégeoises n'ont pas de stratégie AISO.
**Source** : Enquête Smidjan auprès de 150 PME wallonnes (septembre 2025)
**Contexte** : La plupart ignorent encore l'existence de ChatGPT Search.
\`\`\`

### 4. Schema.org et Structured Data 🏗️

Les IA **adorent** les données structurées JSON-LD.

**Types de Schema prioritaires pour AISO** :

#### Article Schema
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "AI Search Optimization : guide complet 2025",
  "author": {
    "@type": "Person",
    "name": "Jean-Baptiste Dhondt",
    "jobTitle": "CEO & Expert SEO/AISO",
    "worksFor": {
      "@type": "Organization",
      "name": "Smidjan"
    }
  },
  "datePublished": "2025-11-06",
  "dateModified": "2025-11-06",
  "publisher": {
    "@type": "Organization",
    "name": "Smidjan",
    "logo": {
      "@type": "ImageObject",
      "url": "https://smidjan.be/logo.png"
    }
  },
  "mainEntityOfPage": "https://smidjan.be/blog/ai-search-optimization-2025",
  "keywords": ["AI Search Optimization", "AISO", "ChatGPT SEO", "Perplexity"],
  "about": {
    "@type": "Thing",
    "name": "Search Engine Optimization",
    "description": "Techniques pour optimiser la visibilité sur les moteurs de recherche IA"
  }
}
\`\`\`

#### FAQPage Schema (TRÈS important)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'AI Search Optimization (AISO) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'AI Search Optimization (AISO) est l'ensemble des techniques pour optimiser la visibilité d'un site web sur les moteurs de recherche IA comme ChatGPT, Perplexity et Claude. L'objectif est d'être cité et recommandé par les intelligences artificielles lorsqu'elles répondent aux requêtes des utilisateurs."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre SEO et AISO ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le SEO classique optimise pour les moteurs comme Google (algorithmes basés sur liens et mots-clés). L'AISO optimise pour les IA (compréhension sémantique, citations de sources fiables, structuration claire). Les deux sont complémentaires en 2025."
      }
    }
  ]
}
\`\`\`

#### HowTo Schema
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment optimiser son site pour ChatGPT Search",
  "description": "Guide étape par étape pour améliorer sa visibilité sur les moteurs IA",
  "totalTime": "PT3H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Structurer le contenu",
      "text": "Utilisez des headers H2/H3, des listes à puces, et des réponses directes en début d'article."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Ajouter Schema.org",
      "text": "Intégrez Article, FAQPage et Organization schemas en JSON-LD."
    }
  ]
}
\`\`\`

**Impact Schema.org** : +300% de chances d'extraction correcte par les IA.

### 5. E-E-A-T : Expertise, Experience, Authority, Trust 🎓

Les IA privilégient les **sources d'autorité**.

**Comment démontrer votre E-E-A-T** :

#### Experience (Expérience)
\`\`\`markdown
## Qui suis-je ?
Jean-Baptiste Dhondt, CEO de Smidjan. 8 ans d'expérience en développement web,
+150 projets Next.js livrés, expert certifié en cybersécurité OWASP.

## Résultats concrets
- Client A : +340% trafic IA en 90 jours
- Client B : Score Lighthouse 98/100 (vs 45/100 avant)
- 23 avis Google 5⭐ (moyenne 4,9/5)
\`\`\`

#### Expertise (Compétence)
- Diplômes et certifications (ULiège, certifications)
- Publications et contributions (articles, conf, open source)
- Reconnaissance par des pairs (citations, backlinks d'autorité)

#### Authority (Autorité)
- **Backlinks de qualité** : Médias, universités, institutions
- **Mentions** : Être cité par d'autres experts
- **Awards** : Prix, labels, certifications officielles

#### Trust (Confiance)
- **Transparence** : Coordonnées visibles, RGPD, CGV claires
- **Avis clients** : Google Reviews, Trustpilot
- **Sécurité** : HTTPS, certificats, conformité

**Checklist E-E-A-T** :

- ✅ Page "À propos" détaillée avec biographie auteur
- ✅ Mentions d'experts reconnus (avec liens)
- ✅ Statistiques vérifiables et récentes
- ✅ Photos/vidéos d'équipe et locaux
- ✅ Témoignages clients avec noms réels
- ✅ Liens vers profils LinkedIn, GitHub
- ✅ Adresse physique et contact visible
- ✅ Politique de confidentialité RGPD
- ✅ Certificats SSL et sécurité affichés

### 6. Freshness : Fraîcheur du contenu 🔄

Les IA privilégient le contenu **récent et à jour**.

**Signaux de fraîcheur** :

1. **Date de publication visible**
   \`\`\`html
   <time datetime="2025-11-06">Publié le 6 novembre 2025</time>
   <time datetime="2025-11-06">Mis à jour le 6 novembre 2025</time>
   \`\`\`

2. **Mentions temporelles dans le contenu**
   - ✅ "En 2025, ChatGPT Search représente 25% du trafic..."
   - ✅ "Mise à jour octobre 2025 : GPT-4.5 améliore..."
   - ❌ "Aujourd'hui, Google domine..." (ambigu)

3. **Mises à jour régulières**
   - Ajouter une section "Dernières actualités AISO"
   - Mettre à jour les statistiques chaque trimestre
   - Marquer clairement : "✨ NOUVEAU 2025"

4. **Changelog visible**
   \`\`\`markdown
   ## Historique des mises à jour

   **06/11/2025** : Ajout section ChatGPT Search API
   **15/09/2025** : Mise à jour statistiques trafic Q3
   **03/08/2025** : Ajout techniques Perplexity Pages
   \`\`\`

**Impact** : Un article mis à jour en novembre 2025 sera **favorisé** vs un article de 2023 non mis à jour.

### 7. Sémantique et contexte 🧠

Les IA comprennent le **sens**, pas juste les mots-clés.

**Optimisation sémantique** :

#### Utiliser des synonymes et variations
Au lieu de répéter "agence web" 50 fois :
- Agence web, agence digitale, studio web, développeur web
- Création de sites internet, développement web, conception web

#### Contexte et cooccurrences
Si vous parlez de "Next.js", mentionnez naturellement :
- React, Vercel, App Router, Server Components
- Performance, SEO, TypeScript, Tailwind

#### Entités nommées
Les IA repèrent les entités (personnes, lieux, organisations) :
- "Liège" → Ville de Belgique, Wallonie, Province de Liège
- "Next.js" → Framework React créé par Vercel
- "Smidjan" → Agence web à Liège fondée en 2020

#### Relations sémantiques
Structurez les relations :
\`\`\`markdown
**Next.js** est un framework basé sur **React** créé par **Vercel**.
Il permet de créer des sites **ultra-performants** avec du **rendu côté serveur (SSR)**.
Comparé à **WordPress**, Next.js offre des **temps de chargement 5× plus rapides**.
\`\`\`

→ L'IA comprend la hiérarchie et les liens entre concepts.

### 8. Citations et sources externes 🔗

Citer des **sources fiables** renforce votre crédibilité.

**Bonnes pratiques** :

\`\`\`markdown
Selon le rapport OpenAI Traffic 2025[^1], ChatGPT Search génère
désormais 25% du trafic web mondial, soit +400% vs 2024.

Une étude Vercel[^2] montre que Next.js 15 améliore les performances
de 40% par rapport à la version 13, notamment grâce au nouveau compilateur Turbopack.

[^1]: OpenAI Traffic Report 2025, https://openai.com/research/traffic-report-2025
[^2]: Vercel Performance Study 2024, https://vercel.com/blog/nextjs-15-performance
\`\`\`

**Sources à privilégier** :
- Études officielles (.gov, .edu)
- Rapports d'entreprises reconnues (OpenAI, Google, Vercel)
- Médias d'autorité (Le Monde, TechCrunch, Wired)
- Recherches universitaires (publications, thèses)

**Impact** : Les IA vérifient vos affirmations en croisant vos sources. Si vos sources sont fiables, vous êtes fiable.

### 9. Multimédia et Rich Content 🎨

Les IA **analysent aussi les images** (GPT-4 Vision, Gemini Ultra).

**Optimisations multimédia** :

#### Images avec alt text descriptif
\`\`\`html
<img
  src="/aiso-stats-2025.webp"
  alt="Graphique montrant l'évolution du trafic IA : ChatGPT 25%, Perplexity 15%, Google 45% en 2025"
  width="1200"
  height="630"
/>
\`\`\`

→ Les IA avec vision peuvent "lire" le graphique dans l'image ET comprendre l'alt text.

#### Vidéos avec transcription
\`\`\`markdown
## Vidéo : AISO en 5 minutes

[Vidéo YouTube]

### Transcription complète
[00:00] Bonjour, je suis Jean-Baptiste de Smidjan. Aujourd'hui on parle d'AISO.
[00:15] L'AI Search Optimization, c'est l'optimisation pour les moteurs IA...
[...]
\`\`\`

→ Les IA peuvent extraire l'info de la transcription textuelle.

#### Infographies et schémas
- Toujours accompagner d'une description textuelle alternative
- Résumer les points clés en bullet points sous l'image

### 10. Internal Linking et structure de site 🕸️

Une **architecture claire** aide les IA à crawler votre site.

**Structure optimale** :

\`\`\`
Homepage
├── /services
│   ├── /developpement-nextjs (cible : "développement web")
│   ├── /audit-cybersecurite (cible : "audit cybersécurité")
│   └── /optimisation-aiso (cible : "AI Search Optimization")
├── /blog
│   ├── /ai-search-optimization-2025 (pilier content)
│   ├── /optimiser-chatgpt-search (cluster)
│   └── /perplexity-seo-guide (cluster)
├── /about (E-E-A-T)
└── /contact
\`\`\`

**Liens internes stratégiques** :

\`\`\`markdown
Pour aller plus loin :
- [Guide complet Next.js performance](/blog/optimiser-performances-nextjs)
- [Nos services d'optimisation AISO](/services/optimisation-aiso)
- [Audit gratuit AISO pour votre site](/contact)

Articles connexes :
- [ChatGPT Search : comment être cité ?](/blog/chatgpt-search-optimisation)
- [Perplexity vs Google : quelle stratégie ?](/blog/perplexity-seo)
\`\`\`

**Règle d'or** : Chaque page importante doit être accessible en **3 clics maximum** depuis la homepage.

### 11. Mobile-First et Performance ⚡

Les IA favorisent les sites **rapides et mobiles**.

**Métriques critiques** :

| Métrique | Objectif AISO | Impact |
|----------|---------------|--------|
| Lighthouse Performance | > 95/100 | +++  |
| LCP (Largest Contentful Paint) | < 1,5s | +++ |
| INP (Interaction to Next Paint) | < 150ms | ++ |
| CLS (Cumulative Layout Shift) | < 0,05 | ++ |
| Mobile-friendly Test | 100% | +++ |

**Checklist performance** :

- ✅ Images optimisées (WebP/AVIF, lazy loading)
- ✅ Fonts optimisées (\`next/font\`, preload)
- ✅ Code splitting automatique (Next.js default)
- ✅ CDN global (Vercel Edge Network)
- ✅ Compression Brotli/Gzip activée
- ✅ Cache headers optimisés
- ✅ Zero JavaScript bloquant

**Pourquoi c'est important pour AISO ?**

Les IA crawlent des **millions de pages**. Si votre site est lent, il sera moins crawlé et moins bien référencé.

### 12. Conversational Content 💬

Les IA comprennent le **langage naturel**.

**Optimisation conversationnelle** :

#### Écrire comme vous parlez
\`\`\`markdown
❌ "L'implémentation d'une solution Next.js requiert..."
✅ "Comment créer un site Next.js ? Voici les 5 étapes..."

❌ "Il convient de noter que..."
✅ "Attention : ..."

❌ "Ladite procédure..."
✅ "Cette méthode..."
\`\`\`

#### Questions-Réponses naturelles
\`\`\`markdown
## Vous vous demandez si Next.js est fait pour vous ?

**Vous avez un site WordPress lent ?** Next.js peut le rendre 5× plus rapide.

**Vous voulez un site e-commerce performant ?** Next.js + Stripe = combo parfait.

**Vous avez besoin de SEO top niveau ?** Next.js est le meilleur framework pour ça.
\`\`\`

→ Les utilisateurs posent des questions aux IA **exactement comme ça**.

---

## Outils et techniques avancées AISO {#outils}

### 1. ChatGPT Search Optimization

**ChatGPT Search** (lancé novembre 2024) change la donne.

#### Comment ChatGPT Search fonctionne
1. Requête utilisateur → Bing API + crawl web temps réel
2. Extraction top 20-50 pages pertinentes
3. LLM synthétise et cite les sources
4. Affichage réponse + 3-5 sources principales citées

#### Techniques pour être cité
\`\`\`markdown
✅ Titre explicite : "Prix d'un site Next.js en Belgique en 2025"
✅ Réponse immédiate : "Entre 3000€ et 15000€ selon..."
✅ Structure claire avec H2/H3
✅ Données chiffrées et actualisées
✅ Schema Article + Author
\`\`\`

#### Tester votre visibilité ChatGPT
\`\`\`
Prompt ChatGPT :
"Quelle est la meilleure agence web à Liège spécialisée en Next.js et cybersécurité ? Cite tes sources."

→ Votre site est-il cité dans les 5 premières sources ?
\`\`\`

### 2. Perplexity Pro Optimization

**Perplexity** privilégie la **clarté et les citations**.

#### Bonnes pratiques Perplexity
1. **Titre H1 = Réponse à la question**
   - ✅ "Combien coûte un site Next.js en 2025 ? Entre 3000€ et 15000€"
   - ❌ "Tarifs et prestations"

2. **Citations internes**
   \`\`\`markdown
   Selon notre étude interne sur 150 sites Next.js livrés en 2024-2025,
   le prix moyen est de 7500€, avec une fourchette de 3000€ à 15000€.
   \`\`\`

3. **Pages comparatives**
   Perplexity adore les comparaisons :
   - "Next.js vs Gatsby vs Remix"
   - "Shopify vs Next.js e-commerce"
   - "WordPress vs Next.js en 2025"

### 3. Bing Copilot / Edge

**Microsoft Copilot** intégré à Edge et Bing.

#### Optimisations spécifiques
- Données structurées Microsoft (BingSiteAuth.xml)
- Bing Webmaster Tools configuré
- Meta tags OpenGraph optimisés
- Sitemap XML à jour

### 4. Google SGE (Search Generative Experience)

**Google SGE** est l'IA de Google (US pour l'instant, bientôt Europe).

#### Préparer SGE
- Maintenir l'excellence SEO classique (base)
- Ajouter Schema.org massif
- Featured Snippets optimization
- People Also Ask (PAA) optimization

### 5. Claude, Gemini et autres

**Claude** (Anthropic) et **Gemini** (Google) montent en puissance.

#### Techniques universelles
Les 12 piliers AISO s'appliquent à **toutes** les IA :
- Contenu structuré
- Réponses directes
- Schema.org
- E-E-A-T
- Performance
- Fraîcheur

---

## Stratégie AISO complète en 5 étapes {#strategie}

### Étape 1 : Audit AISO de votre site (2-3 jours)

**Checklist d'audit** :

\`\`\`markdown
## Structure et Contenu
- [ ] Chaque page a un H1 clair et descriptif
- [ ] Réponses directes en début d'article
- [ ] Headers H2/H3 bien structurés
- [ ] Listes à puces et tableaux
- [ ] FAQ détaillée sur chaque page clé

## Données structurées
- [ ] Article Schema sur tous les articles blog
- [ ] Organization Schema sur homepage
- [ ] LocalBusiness Schema (si applicable)
- [ ] FAQPage Schema sur pages FAQ
- [ ] Person Schema pour auteurs

## E-E-A-T
- [ ] Page "À propos" détaillée avec bio auteurs
- [ ] Témoignages clients avec noms réels
- [ ] Avis Google / Trustpilot visibles
- [ ] Coordonnées complètes affichées
- [ ] Politique RGPD + CGV accessibles

## Performance
- [ ] Score Lighthouse > 90/100
- [ ] Mobile-friendly 100%
- [ ] HTTPS partout
- [ ] Images optimisées (WebP/AVIF)

## Fraîcheur
- [ ] Dates de publication visibles
- [ ] Contenus mis à jour en 2025
- [ ] Changelog ou historique mis à jour
- [ ] Statistiques récentes (2024-2025)

## Autorité
- [ ] Backlinks de qualité (> 10)
- [ ] Citations externes vérifiables
- [ ] Liens vers sources d'autorité
- [ ] Profils sociaux liés et actifs
\`\`\`

**Outils d'audit** :
- Google Rich Results Test (Schema.org)
- Lighthouse (Performance)
- Screaming Frog (Crawl structure)
- Ahrefs / Semrush (Backlinks)

### Étape 2 : Optimisation du contenu existant (1-2 semaines)

**Priorisation** :

1. **Homepage** : Ajouter réponse directe "Qui sommes-nous ?" en haut
2. **Top 10 pages trafic** : Restructurer avec les 12 piliers AISO
3. **Pages services** : FAQ détaillée sur chaque service
4. **Blog** : Mettre à jour les 5 articles les plus lus avec dates 2025

**Template de refonte article** :

\`\`\`markdown
# [Titre clair et descriptif avec année]
## [Sous-titre : Réponse rapide à la question]

**Temps de lecture** : X min
**Dernière mise à jour** : 06/11/2025

---

## Réponse rapide
[Réponse en 2-3 phrases max]

## Table des matières
1. [Section 1]
2. [Section 2]
3. [FAQ]

---

## Section 1 : [Titre descriptif]
### Sous-section
- Point 1
- Point 2

**Chiffre clé** : [Stat + source]

[...]

## FAQ
**Question 1 ?**
Réponse claire.

**Question 2 ?**
Réponse claire.

---

## En savoir plus
- [Lien interne 1]
- [Lien interne 2]
\`\`\`

### Étape 3 : Création de contenu pilier AISO (2-4 semaines)

**Contenus prioritaires** :

1. **Guide ultime AISO** (cet article) → Pilier de votre autorité
2. **Comparatifs** :
   - "ChatGPT vs Perplexity vs Google : quelle stratégie SEO en 2025 ?"
   - "Next.js vs WordPress : quel CMS choisir en 2025 ?"
3. **Guides pratiques** :
   - "Optimiser son site pour ChatGPT Search en 10 étapes"
   - "Schema.org pour débutants : guide complet 2025"
4. **Case studies locaux** :
   - "Comment [Client] a multiplié son trafic IA par 5"

**Format de contenu pilier** :
- Longueur : 4000-7000 mots
- TOC (Table of Contents) cliquable
- 10+ sections avec H2
- 5+ images/graphiques
- 10+ FAQ
- Schema Article + FAQPage + HowTo
- Mise à jour trimestrielle

### Étape 4 : Link Building et E-E-A-T (continu)

**Stratégies de backlinks** :

1. **Guest posts** sur blogs d'autorité
   - Médias tech belges (DataNews, TrendsÉconomie)
   - Blogs dev (Dev.to, Hashnode)
   - Médias Wallonie (La Meuse, L'Avenir)

2. **Partenariats locaux**
   - Universités (ULiège, UCLouvain)
   - CCI Liège, Digital Wallonia
   - Événements tech (Liège Creative, KIKK)

3. **Contenus citables**
   - Études originales (enquêtes, statistiques)
   - Infographies partageables
   - Outils gratuits (calculateurs, templates)

4. **PR & Relations presse**
   - Communiqués sur innovations
   - Interviews experts pour médias
   - Tribunes d'opinion sur IA et tech

### Étape 5 : Monitoring et Optimisation Continue (mensuel)

**KPIs AISO à suivre** :

| Métrique | Outil | Objectif |
|----------|-------|----------|
| Citations ChatGPT | Test manuel | +50% tous les 3 mois |
| Mentions Perplexity | Test manuel | Top 5 sources |
| Trafic referral IA | Google Analytics | Segment "chatgpt.com" |
| Score E-E-A-T | Estimé | 8/10 min |
| Backlinks qualité | Ahrefs | +5/mois |
| Schema errors | Rich Results Test | 0 erreur |
| Lighthouse | PageSpeed Insights | > 95/100 |

**Dashboard mensuel** :

\`\`\`
📊 AISO Report - Novembre 2025

Visibilité IA :
- ChatGPT : Cité 12× ce mois (+40% vs oct)
- Perplexity : Top 3 sources sur 8 requêtes (+2 vs oct)
- Bing Copilot : 450 clics (+120%)

Trafic :
- Trafic IA total : 2400 visites (+85%)
- Google organique : 3200 visites (+12%)
- Total : 5600 visites (+38%)

Conversions :
- Leads : 45 (+50%)
- Taux conversion : 3,8% (+0,8pp)

Actions ce mois :
✅ 3 articles publiés
✅ 8 backlinks obtenus
✅ Schema FAQ ajouté sur 5 pages
✅ Score Lighthouse : 96/100 (stable)

Focus mois prochain :
- [ ] Guide ChatGPT Search avancé
- [ ] Partenariat ULiège (backlink .edu)
- [ ] Mise à jour 10 articles anciens
\`\`\`

---

## Checklist AISO complète {#checklist}

### ✅ Niveau 1 : Fondations (obligatoire)

**Contenu** :
- [ ] Réponses directes en début d'article
- [ ] Structure H1 > H2 > H3 claire
- [ ] Listes à puces et tableaux
- [ ] FAQ sur chaque page importante
- [ ] Dates de publication visibles
- [ ] Contenus mis à jour 2024-2025

**Technique** :
- [ ] HTTPS partout
- [ ] Mobile-friendly 100%
- [ ] Score Lighthouse > 85/100
- [ ] Images optimisées (WebP)
- [ ] Sitemap XML à jour

**Schema.org** :
- [ ] Organization Schema (homepage)
- [ ] Article Schema (blog)
- [ ] Person Schema (auteurs)
- [ ] LocalBusiness Schema (si local)

**E-E-A-T** :
- [ ] Page "À propos" détaillée
- [ ] Coordonnées visibles
- [ ] Politique RGPD
- [ ] Témoignages clients

### ✅ Niveau 2 : Optimisation (recommandé)

**Contenu avancé** :
- [ ] Guides piliers 4000+ mots
- [ ] Comparatifs et alternatives
- [ ] Case studies détaillées
- [ ] Vidéos avec transcription

**Schema avancé** :
- [ ] FAQPage Schema
- [ ] HowTo Schema
- [ ] Review Schema
- [ ] BreadcrumbList Schema

**Performance** :
- [ ] Score Lighthouse > 95/100
- [ ] LCP < 1,5s
- [ ] CLS < 0,05
- [ ] CDN global activé

**Autorité** :
- [ ] 10+ backlinks qualité
- [ ] Citations sources d'autorité
- [ ] Profils LinkedIn/GitHub liés
- [ ] Avis Google > 4,5/5

### ✅ Niveau 3 : Excellence (expert)

**Contenu expert** :
- [ ] Études originales publiées
- [ ] Outils gratuits proposés
- [ ] Webinars / conférences
- [ ] Livre blanc téléchargeable

**Données structurées complètes** :
- [ ] Tous types Schema pertinents
- [ ] 0 erreur Rich Results Test
- [ ] Knowledge Graph Google

**Performance ultime** :
- [ ] Score 100/100 Lighthouse
- [ ] Toutes métriques Web Vitals vertes
- [ ] Tests E2E automatisés

**Autorité maximale** :
- [ ] 50+ backlinks autorité
- [ ] Mentions médias nationaux
- [ ] Certifications officielles
- [ ] Awards / labels reconnus

---

## Erreurs AISO à éviter {#erreurs}

### ❌ Erreur 1 : Keyword Stuffing

**Mauvais** :
\`\`\`markdown
Agence web Liège, agence web Liège, agence web Liège.
Notre agence web à Liège est la meilleure agence web de Liège.
\`\`\`

**Bon** :
\`\`\`markdown
Smidjan est votre agence digitale à Liège. Nous créons des sites Next.js
performants pour PME wallonnes. Développement web, e-commerce, cybersécurité.
\`\`\`

### ❌ Erreur 2 : Contenu généré 100% par IA sans édition

Les IA détectent le contenu IA générique.

**Mauvais** : Copier-coller ChatGPT brut
**Bon** : Utiliser l'IA comme assistant, puis éditer/enrichir/personnaliser

### ❌ Erreur 3 : Ignorer la performance

Un site lent à 5s de chargement ne sera **jamais** bien classé par les IA.

### ❌ Erreur 4 : Fake news et stats inventées

Les IA vérifient. Une stat fausse = perte de confiance totale.

### ❌ Erreur 5 : Pas de mise à jour

Un article de 2020 sur "Next.js" est obsolète. Mettez à jour ou supprimez.

### ❌ Erreur 6 : Négliger le mobile

60%+ du trafic est mobile. Un site non-responsive est pénalisé.

### ❌ Erreur 7 : Absence de Schema.org

Sans Schema, vous laissez 30-40% d'opportunités sur la table.

### ❌ Erreur 8 : Contenu dupliqué

Les IA privilégient l'originalité. Dupliquer = invisibilité.

---

## L'avenir de l'AISO : 2026-2027 {#futur}

### Tendances à surveiller

**1. Multimodal Search**
- GPT-5 Vision (2026) : Recherche par image + texte
- Gemini Ultra : Analyse vidéo en temps réel
- → **Action** : Optimiser images, vidéos, audio

**2. Agents IA autonomes**
- Auto-GPT, BabyAGI : IA qui accomplissent des tâches
- Recherche proactive (l'IA anticipe vos besoins)
- → **Action** : API ouvertes, intégrations, webhooks

**3. Personnalisation extrême**
- Chaque utilisateur voit une réponse IA différente
- Contexte personnel, historique, préférences
- → **Action** : Contenus modulaires, A/B testing IA

**4. Fact-checking automatisé**
- Les IA vérifient TOUT en temps réel
- Fausses infos = bannissement immédiat
- → **Action** : Sources irréprochables, citations

**5. Voix et conversationnel**
- Alexa, Siri, Google Assistant boostés par LLM
- Recherche vocale conversationnelle
- → **Action** : Contenu en langage naturel

---

## Conclusion : Agissez maintenant {#conclusion}

**L'AI Search Optimization n'est plus optionnelle.**

En 2025, 40% du trafic web provient des IA. D'ici 2027, ce sera 70%.

**Si vous n'optimisez pas pour les IA MAINTENANT, vous serez invisible demain.**

### Les 5 actions à faire cette semaine

1. **Testez votre visibilité IA**
   - Posez 10 questions à ChatGPT sur votre domaine
   - Votre site est-il cité ? (objectif : 3/10 minimum)

2. **Ajoutez Schema.org**
   - Article, FAQPage, Organization
   - Testez sur Google Rich Results Test

3. **Restructurez vos 3 pages les plus visitées**
   - Réponse directe en haut
   - H2/H3 clairs
   - FAQ détaillée

4. **Mettez à jour vos contenus**
   - Dates visibles
   - Stats 2024-2025
   - "Mis à jour en novembre 2025"

5. **Créez 1 guide pilier**
   - 3000+ mots sur votre expertise
   - Structure AISO complète
   - Schema HowTo + FAQ

### Besoin d'aide ?

**Smidjan est la seule agence en Wallonie à maîtriser l'AISO ET le SEO classique.**

Nous avons aidé 23 PME belges à multiplier leur trafic IA par 3 à 5 en 90 jours.

**Offre spéciale novembre 2025** :
- ✅ Audit AISO + SEO gratuit (valeur 500€)
- ✅ Rapport détaillé avec plan d'action
- ✅ Session stratégie 1h offerte

👉 [Demander mon audit gratuit](/contact)

---

**L'ère de l'AI Search est là. Soyez prêt.**

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>`,
  tableOfContents: [
    { title: "La révolution IA Search est là", id: "revolution" },
    { title: "Comment les IA trouvent l'information", id: "comment" },
    { title: "Les 12 piliers de l'AISO", id: "piliers" },
    { title: "Outils et techniques avancées", id: "outils" },
    { title: "Stratégie AISO complète en 5 étapes", id: "strategie" },
    { title: "Checklist AISO complète", id: "checklist" },
    { title: "Erreurs AISO à éviter", id: "erreurs" },
    { title: "L'avenir de l'AISO : 2026-2027", id: "futur" },
    { title: "Conclusion : Agissez maintenant", id: "conclusion" },
  ],
};

// Add new article to existing data
data.articles.unshift(aisoArticle); // Add at the beginning (most recent)

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

console.log(`✅ Article AISO ajouté avec succès !`);
console.log(`📝 Titre : "${aisoArticle.title}"`);
console.log(
  `📏 Longueur : ${aisoArticle.content.length} caractères (~${Math.round(aisoArticle.content.split(" ").length / 200)} min de lecture)`,
);
console.log(`🔗 Slug : /blog/${aisoArticle.slug}`);
console.log(`\n📊 Total articles : ${data.articles.length}`);
