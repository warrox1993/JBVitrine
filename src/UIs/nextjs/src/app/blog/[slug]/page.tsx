import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button/Button";
import { Footer } from "@/components/sections/Footer/Footer";
import { SectionWithBackground } from "@/components/ui/SectionWithBackground/SectionWithBackground";
import { getAllArticles, getArticleBySlug } from "@/lib/blogActions";
import { markdownToHtml } from "@/lib/markdown";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

// Remove the hardcoded articlesContent since we now use JSON data
/* const articlesContent: Record<string, { content: string; tableOfContents: { title: string; id: string }[] }> = {
  "optimiser-performances-nextjs-belgique": {
    tableOfContents: [
      { title: "Pourquoi les performances web sont critiques", id: "intro" },
      { title: "Optimisation des images", id: "images" },
      { title: "Code splitting et lazy loading", id: "code-splitting" },
      { title: "Optimisation des fonts", id: "fonts" },
      { title: "Mesurer les performances", id: "mesure" },
    ],
    content: `
# Comment optimiser les performances d'un site Next.js en 2025

Les performances web ne sont plus une option, elles sont devenues un critère de référencement majeur pour Google. Avec les **Core Web Vitals** intégrés dans l'algorithme de ranking, un site lent est un site invisible. Dans cet article, nous allons explorer les techniques avancées pour atteindre un score Lighthouse parfait avec Next.js.

## Pourquoi les performances web sont critiques {#intro}

Un site rapide améliore :
- **Le SEO** : Google favorise les sites rapides dans ses résultats
- **La conversion** : Chaque seconde de délai réduit le taux de conversion de 7%
- **L'expérience utilisateur** : 53% des utilisateurs mobiles abandonnent un site qui met plus de 3 secondes à charger

### Les Core Web Vitals expliqués

- **LCP (Largest Contentful Paint)** : Temps avant affichage du plus gros élément (< 2.5s)
- **FID (First Input Delay)** : Délai avant interaction (< 100ms)
- **CLS (Cumulative Layout Shift)** : Stabilité visuelle (< 0.1)

## Optimisation des images {#images}

Les images représentent souvent 50% du poids d'une page. Voici comment les optimiser avec Next.js :

### Utiliser next/image

\`\`\`tsx
import Image from 'next/image';

export function Hero() {
  return (
    <Image
      src="/hero.webp"
      alt="Description optimisée SEO"
      width={1200}
      height={630}
      priority // Pour les images above-the-fold
      quality={85} // Balance qualité/poids
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
\`\`\`

### Format WebP et AVIF

Next.js convertit automatiquement les images en WebP/AVIF si le navigateur les supporte. Résultat : **jusqu'à 30% de réduction du poids** sans perte de qualité.

### Lazy loading intelligent

\`\`\`tsx
<Image
  src="/gallery-image.webp"
  alt="Image de galerie"
  width={800}
  height={600}
  loading="lazy" // Charge uniquement quand visible
  placeholder="blur" // Affiche un placeholder flou
  blurDataURL="data:image/..." // Généré automatiquement
/>
\`\`\`

## Code splitting et lazy loading {#code-splitting}

Next.js fait du code splitting automatique par route, mais vous pouvez aller plus loin :

### Dynamic imports

\`\`\`tsx
import dynamic from 'next/dynamic';

// Charge le composant uniquement côté client
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  ssr: false,
  loading: () => <Skeleton />
});

// Charge uniquement quand visible
const LazyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Chargement...</p>,
});
\`\`\`

### Bundle Analyzer

Identifiez les dépendances lourdes :

\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

\`\`\`js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // votre config
});
\`\`\`

Puis : \`ANALYZE=true npm run build\`

## Optimisation des fonts {#fonts}

Les fonts peuvent ralentir considérablement le FCP (First Contentful Paint).

### next/font pour Google Fonts

\`\`\`tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Évite le FOIT
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

Avantages :
- **Auto-hébergement** : pas de requête externe
- **Zero layout shift** : dimensions calculées à la build
- **Optimisation automatique** : subset CSS généré

## Mesurer les performances {#mesure}

### Lighthouse CI

Intégrez Lighthouse dans votre CI/CD :

\`\`\`bash
npm install -g @lhci/cli

lhci autorun --collect.url=https://smidjan.be
\`\`\`

### Real User Monitoring (RUM)

\`\`\`tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
\`\`\`

## Checklist finale

- [ ] Images en WebP avec \`next/image\`
- [ ] Fonts auto-hébergées avec \`next/font\`
- [ ] Code splitting sur composants lourds
- [ ] Lazy loading sur images below-the-fold
- [ ] Mesure régulière avec Lighthouse
- [ ] RUM activé en production

## Résultats attendus

En appliquant ces optimisations, vous devriez atteindre :
- **LCP < 2s** sur 3G
- **Score Lighthouse > 95**
- **Taux de rebond réduit de 30%**

---

Besoin d'aide pour optimiser votre site Next.js ? [Contactez-nous pour un audit performance gratuit](/contact).
    `,
  },
  "securiser-application-web-owasp-belgique": {
    tableOfContents: [
      { title: "Introduction à OWASP Top 10", id: "intro" },
      { title: "Injection (SQL, NoSQL, Command)", id: "injection" },
      { title: "Broken Authentication", id: "auth" },
      { title: "Sensitive Data Exposure", id: "data" },
      { title: "XSS (Cross-Site Scripting)", id: "xss" },
      { title: "CSRF (Cross-Site Request Forgery)", id: "csrf" },
      { title: "Checklist sécurité pour PME", id: "checklist" },
    ],
    content: `
# Sécuriser son application web : checklist OWASP 2025

La cybersécurité n'est plus réservée aux grandes entreprises. **73% des PME belges ont subi au moins une tentative de cyberattaque en 2024**. Dans cet article, nous décryptons les 10 vulnérabilités critiques OWASP et comment les prévenir concrètement pour les entreprises en Belgique.

## Introduction à OWASP Top 10 {#intro}

L'**OWASP (Open Web Application Security Project)** publie tous les 3 ans une liste des 10 vulnérabilités web les plus critiques. En 2025, ces failles représentent **80% des incidents de sécurité** dans les applications web.

### Pourquoi c'est important pour votre entreprise

- **Conformité RGPD** : Une faille expose des données personnelles = amende jusqu'à 4% du CA
- **Réputation** : 60% des clients perdent confiance après une fuite de données
- **Coût** : Le coût moyen d'une cyberattaque pour une PME belge est de **85 000€**

## Injection (SQL, NoSQL, Command) {#injection}

### Le problème

L'injection permet à un attaquant d'exécuter des commandes malveillantes dans votre base de données.

**Exemple vulnérable** :

\`\`\`javascript
// ❌ DANGEREUX - Ne JAMAIS faire ça
const query = \`SELECT * FROM users WHERE email = '\${userInput}'\`;
db.query(query);
\`\`\`

Un attaquant peut envoyer : \`' OR '1'='1\` et récupérer toute la base.

### La solution

Utilisez des **requêtes préparées** (prepared statements) :

\`\`\`typescript
// ✅ SÉCURISÉ
const query = 'SELECT * FROM users WHERE email = $1';
await db.query(query, [userInput]);
\`\`\`

Avec un ORM moderne :

\`\`\`typescript
// Prisma (Next.js)
const user = await prisma.user.findUnique({
  where: { email: userInput }, // Protégé automatiquement
});
\`\`\`

## Broken Authentication {#auth}

### Le problème

Mauvaise gestion de l'authentification : sessions non expirées, mots de passe faibles, pas de 2FA.

### Solutions concrètes

#### 1. Utiliser NextAuth.js

\`\`\`typescript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24h
  },
  pages: {
    signIn: '/login',
  },
});
\`\`\`

#### 2. Hash sécurisé des mots de passe

\`\`\`typescript
import bcrypt from 'bcryptjs';

// Stockage
const hashedPassword = await bcrypt.hash(password, 12);

// Vérification
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
\`\`\`

#### 3. Rate limiting

\`\`\`typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 tentatives max
  message: 'Trop de tentatives, réessayez dans 15 minutes',
});

app.post('/api/login', limiter, loginHandler);
\`\`\`

## Sensitive Data Exposure {#data}

### Le problème

Données sensibles transmises ou stockées en clair.

### Solutions

#### HTTPS obligatoire

\`\`\`typescript
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};
\`\`\`

#### Chiffrement des secrets

\`\`\`bash
# .env.local (JAMAIS commité)
DATABASE_URL="postgresql://..."
JWT_SECRET="random-32-chars..."
STRIPE_SECRET_KEY="sk_live_..."
\`\`\`

#### Variables d'environnement sécurisées

\`\`\`typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
\`\`\`

## XSS (Cross-Site Scripting) {#xss}

### Le problème

Injection de JavaScript malveillant dans vos pages.

### Solutions React/Next.js

React échappe automatiquement le contenu :

\`\`\`tsx
// ✅ SÉCURISÉ par défaut
<div>{userInput}</div>
\`\`\`

**Attention au HTML brut** :

\`\`\`tsx
// ❌ DANGEREUX
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Nettoyez d'abord
import DOMPurify from 'isomorphic-dompurify';

<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
\`\`\`

## CSRF (Cross-Site Request Forgery) {#csrf}

### Le problème

Un site malveillant envoie des requêtes en votre nom.

### Solution : CSRF Tokens

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Vérifier l'origine
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (origin && !origin.includes(host!)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
\`\`\`

## Checklist sécurité pour PME {#checklist}

### Niveau 1 : Essentiel (obligatoire)

- [ ] HTTPS activé sur tout le site
- [ ] Mots de passe hashés (bcrypt, argon2)
- [ ] Requêtes SQL préparées (ORM)
- [ ] Variables d'environnement sécurisées
- [ ] Headers de sécurité (CSP, HSTS, X-Frame-Options)

### Niveau 2 : Recommandé

- [ ] Authentification 2FA
- [ ] Rate limiting sur API
- [ ] Logs d'audit
- [ ] Monitoring des erreurs (Sentry)
- [ ] Backups automatiques chiffrés

### Niveau 3 : Avancé

- [ ] Tests SAST/DAST automatisés
- [ ] Audit de dépendances (Dependabot)
- [ ] WAF (Web Application Firewall)
- [ ] Pentest annuel
- [ ] Plan de réponse aux incidents

## Outils recommandés

- **SAST** : Snyk, SonarQube
- **DAST** : OWASP ZAP
- **Monitoring** : Sentry, LogRocket
- **Headers** : SecurityHeaders.com
- **SSL** : SSL Labs

---

Besoin d'un audit sécurité professionnel ? [Contactez-nous pour un audit OWASP gratuit](/contact).
    `,
  },
  "automatiser-workflows-n8n-ia-entreprise": {
    tableOfContents: [
      { title: "Pourquoi automatiser en 2025", id: "intro" },
      { title: "Qu'est-ce que n8n", id: "n8n" },
      { title: "Cas d'usage : Facturation automatique", id: "facturation" },
      { title: "Intégration IA avec GPT", id: "ia" },
      { title: "Exemples concrets pour PME", id: "exemples" },
    ],
    content: `
# Automatiser ses workflows avec n8n et l'IA en 2025

**L'automatisation n'est plus un luxe, c'est une nécessité**. Les entreprises qui automatisent leurs tâches répétitives gagnent en moyenne **15 heures par semaine par employé**. Dans cet article, découvrez comment n8n et l'IA peuvent transformer vos processus métier.

## Pourquoi automatiser en 2025 {#intro}

### Le coût de la répétition

Calculons le coût des tâches manuelles pour une PME wallonne :

- **Facturation manuelle** : 2h/semaine × 52 semaines = 104h/an
- **Relances clients** : 1h/semaine = 52h/an
- **Saisie CRM** : 3h/semaine = 156h/an

**Total : 312 heures/an = presque 2 mois à temps plein**

À 35€/h (coût moyen), c'est **10 920€ de temps perdu** chaque année.

### ROI de l'automatisation pour une PME belge

- **Coût unique** : 2 000€ - 5 000€ (setup n8n + workflows)
- **Temps gagné** : 312h/an
- **ROI** : Rentabilisé en 3-6 mois

## Qu'est-ce que n8n {#n8n}

n8n est une plateforme d'automatisation **open-source** et **self-hosted**.

### Avantages vs Zapier/Make

| Critère | n8n | Zapier | Make |
|---------|-----|--------|------|
| **Prix** | Gratuit (self-hosted) | 29€-599€/mois | 9€-299€/mois |
| **Workflows** | Illimités | Limité par plan | Limité par plan |
| **Données** | Vous les contrôlez | Chez Zapier | Chez Make |
| **Code personnalisé** | Oui (JS natif) | Limité | Limité |
| **RGPD** | 100% conforme | Dépend du plan | Dépend du plan |

### Installation rapide

\`\`\`bash
# Docker Compose
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=secure_password
    volumes:
      - n8n_data:/home/node/.n8n
\`\`\`

Puis : \`docker-compose up -d\`

Accédez à : \`http://localhost:5678\`

## Cas d'usage : Facturation automatique {#facturation}

### Workflow complet

1. **Trigger** : Nouvelle commande Stripe
2. **Créer facture PDF** : Template personnalisé
3. **Envoyer email** : Au client avec facture
4. **Ajouter au CRM** : Notion/Airtable
5. **Notifier** : Slack pour la compta

### Code du workflow

\`\`\`json
{
  "nodes": [
    {
      "name": "Stripe Webhook",
      "type": "n8n-nodes-base.stripeTrigger",
      "parameters": {
        "events": ["charge.succeeded"]
      }
    },
    {
      "name": "Generate Invoice PDF",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://api.smidjan.be/generate-invoice",
        "method": "POST",
        "body": {
          "customer": "={{$json.customer}}",
          "amount": "={{$json.amount}}"
        }
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.sendGrid",
      "parameters": {
        "to": "={{$json.customer.email}}",
        "subject": "Votre facture Smidjan",
        "attachments": "={{$json.pdf_url}}"
      }
    }
  ]
}
\`\`\`

### Temps économisé

- **Avant** : 15 min par facture × 50 factures/mois = **12.5h/mois**
- **Après** : 0 min (100% automatique)
- **Gain** : 150h/an = **5 250€ économisés**

## Intégration IA avec GPT {#ia}

### Workflow : Support client automatique

\`\`\`javascript
// Node "IA Response"
const userMessage = $input.first().json.message;

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Tu es un assistant support pour Smidjan, agence web à Liège.'
      },
      {
        role: 'user',
        content: userMessage
      }
    ],
    max_tokens: 300,
  })
});

const data = await response.json();
return { response: data.choices[0].message.content };
\`\`\`

### Cas d'usage IA

1. **Génération de descriptions produits** (e-commerce)
2. **Résumé automatique de réunions** (Notion)
3. **Catégorisation d'emails** (Gmail → Labels)
4. **Analyse de sentiment** (Support client)
5. **Traduction automatique** (Multilangue)

## Exemples concrets pour PME {#exemples}

### 1. Onboarding client automatique

**Trigger** : Nouveau client dans CRM
**Actions** :
- Créer dossier Google Drive
- Envoyer email de bienvenue
- Planifier premier call (Calendly)
- Ajouter dans Slack #clients
- Créer projet dans ClickUp

**Temps économisé** : 30 min par client

### 2. Veille concurrentielle

**Trigger** : Tous les lundis 9h
**Actions** :
- Scraper sites concurrents
- Analyser changements de prix
- Détecter nouvelles offres
- Rapport dans Notion
- Alerte si changement > 10%

**Temps économisé** : 3h/semaine

### 3. Génération de contenu SEO

**Trigger** : Nouveau mot-clé dans spreadsheet
**Actions** :
- IA génère plan d'article
- IA rédige introduction
- IA propose méta-description
- Enregistre dans CMS
- Notifie rédacteur

**Temps économisé** : 45 min par article

### 4. Relances clients

**Trigger** : Facture impayée > 30j
**Actions** :
- Email relance automatique (J+30)
- SMS si pas de réponse (J+45)
- Notification compta (J+60)
- Blocage compte si impayé (J+90)

**Taux de recouvrement** : +35%

## Checklist avant de commencer

### Prérequis techniques

- [ ] Serveur pour héberger n8n (VPS 5€/mois)
- [ ] Nom de domaine (n8n.votresite.be)
- [ ] SSL (Let's Encrypt gratuit)
- [ ] Backup automatique

### Processus à automatiser

- [ ] Identifier tâches répétitives
- [ ] Calculer temps passé
- [ ] Lister outils utilisés
- [ ] Vérifier APIs disponibles
- [ ] Prioriser par ROI

### Sécurité

- [ ] Variables d'environnement sécurisées
- [ ] Authentification forte
- [ ] Logs d'audit
- [ ] Conformité RGPD
- [ ] Plan de backup

## ROI attendu

Pour une PME wallonne (5-10 employés) :

- **Setup initial** : 3 000€ (consultance + installation)
- **5 workflows créés** : facturation, relances, veille, CRM, support
- **Temps économisé** : 20h/semaine = 80h/mois
- **Coût évité** : 80h × 35€ = 2 800€/mois
- **ROI** : Rentabilisé en 1 mois

## Conclusion

L'automatisation avec n8n et l'IA n'est plus réservée aux grandes entreprises. Pour **quelques milliers d'euros**, vous pouvez automatiser l'essentiel de vos tâches répétitives et libérer du temps pour ce qui compte vraiment : **développer votre business**.

---

Prêt à automatiser vos processus ? [Contactez-nous pour un audit gratuit](/contact).
    `,
  },
}; */

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${article.title} | Blog Smidjan`,
    description: article.excerpt,
    keywords: [
      article.category,
      "Belgique",
      "Liège",
      "développement web",
      "guide technique",
    ],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://smidjan.be/blog/${slug}`,
      siteName: "Smidjan",
      images: [
        {
          url: "https://smidjan.be/og-image.webp",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Smidjan"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/og-image.webp"],
    },
  };
}

// Helper function to get short category labels
function getShortCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    "Développement Web": "Dev Web",
    "Cybersécurité": "Cyber",
    "Automatisation & IA": "IA/Automatisation",
  };
  return categoryMap[category] || category;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <div className={styles.pageRoot}>
        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.excerpt,
              image: "https://smidjan.be/og-image.webp",
              datePublished: article.publishedAt,
              dateModified: article.publishedAt,
              author: {
                "@type": "Organization",
                name: "Smidjan",
                url: "https://smidjan.be",
              },
              publisher: {
                "@type": "Organization",
                name: "Smidjan",
                logo: {
                  "@type": "ImageObject",
                  url: "https://smidjan.be/logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://smidjan.be/blog/${slug}`,
              },
            }),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://smidjan.be",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://smidjan.be/blog",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: article.title,
                  item: `https://smidjan.be/blog/${slug}`,
                },
              ],
            }),
          }}
        />

        <article className={styles.article}>
          <SectionWithBackground
            className={styles.articleHeader}
            variant="dark"
            ariaLabel="Article header"
          >
            <div className="container">
              <Breadcrumb
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: article.title, href: `/blog/${slug}` }
                ]}
              />

              <div className={styles.articleMeta}>
                <span className={styles.category}>{article.category}</span>
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("fr-BE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>{article.readTime} de lecture</span>
              </div>
              <Heading as="h1" className={styles.title}>
                {article.title}
              </Heading>
              <p className={styles.excerpt}>{article.excerpt}</p>
            </div>
          </SectionWithBackground>

          <div className={styles.articleBody}>
            <div className="container">
              <div className={styles.contentWrapper}>
                {article.tableOfContents && article.tableOfContents.length > 0 && (
                  <aside className={styles.toc}>
                    <h2>Table des matières</h2>
                    <nav>
                      <ul>
                        {article.tableOfContents.map((item) => (
                          <li key={item.id}>
                            <a href={`#${item.id}`}>{item.title}</a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>
                )}

                <div className={styles.content}>
                  <div
                    className={styles.markdown}
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(article.content || ""),
                    }}
                  />

                  <div className={styles.cta}>
                    <h3>Besoin d'accompagnement ?</h3>
                    <p>
                      Smidjan vous aide à mettre en place ces solutions pour votre
                      entreprise en Belgique.
                    </p>
                    <Button
                      as="a"
                      href="/contact"
                      variant="solid"
                      size="md"
                      ariaLabel="Discuter de votre projet avec Smidjan"
                    >
                      Discutons de votre projet →
                    </Button>
                  </div>

                  {/* Navigation between articles */}
                  {(previousArticle || nextArticle) && (
                    <nav className={styles.articleNavigation} aria-label="Navigation entre articles">
                      {previousArticle && (
                        <Link
                          href={`/blog/${previousArticle.slug}`}
                          className={`${styles.navLink} ${styles.navPrevious}`}
                        >
                          <span className={styles.navLabel}>← Article précédent</span>
                          <span className={styles.navTitle}>{previousArticle.title}</span>
                        </Link>
                      )}
                      {nextArticle && (
                        <Link
                          href={`/blog/${nextArticle.slug}`}
                          className={`${styles.navLink} ${styles.navNext}`}
                        >
                          <span className={styles.navLabel}>Article suivant →</span>
                          <span className={styles.navTitle}>{nextArticle.title}</span>
                        </Link>
                      )}
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <SectionWithBackground
              className={styles.related}
              variant="dark"
              ariaLabel="Articles connexes"
            >
              <div className="container">
                <h2 className={styles.relatedTitle}>Articles connexes</h2>
                <div className={styles.relatedGrid}>
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className={styles.relatedCard}
                    >
                      <span className={styles.relatedCategory}>
                        {getShortCategory(related.category)}
                      </span>
                      <h3>{related.title}</h3>
                      <p>{related.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </SectionWithBackground>
          )}
        </article>
      </div>
      <Footer />
    </>
  );
}
