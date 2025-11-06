/**
 * Script to add 5 remaining blog article templates to blogArticles.json
 * Run with: node scripts/add-remaining-blog-articles.js
 */

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../src/data/blogArticles.json");

// Read current articles
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// 5 remaining article templates
const newArticles = [
  {
    slug: "rgpd-conformite-sites-web-belgique",
    title:
      "RGPD et sites web : guide de conformité pour entreprises belges 2025",
    excerpt:
      "Tout ce que votre entreprise belge doit savoir sur le RGPD : obligations légales, consentement cookies, politique de confidentialité et sanctions. Guide pratique avec templates.",
    publishedAt: "2025-11-03",
    category: "Cybersécurité",
    readTime: "11 min",
    content: `# RGPD et sites web : guide de conformité pour entreprises belges 2025

Le RGPD (Règlement Général sur la Protection des Données) s'applique à **toute entreprise belge collectant des données personnelles** en ligne. Les amendes peuvent atteindre **20 millions d'euros ou 4% du chiffre d'affaires**. Ce guide vous aide à mettre votre site en conformité.

## Obligations légales pour sites belges {#obligations}

### Qu'est-ce qu'une donnée personnelle ?

Selon le RGPD, une donnée personnelle est toute information permettant d'identifier une personne :
- Nom, prénom, email, téléphone
- Adresse IP, cookies
- Numéro de carte bancaire
- Photos, vidéos
- Données de navigation

### Les 7 principes du RGPD

1. **Licéité** : Base légale claire (consentement, contrat, intérêt légitime)
2. **Finalité** : Objectifs définis et explicites
3. **Minimisation** : Collecter uniquement le nécessaire
4. **Exactitude** : Données à jour et correctes
5. **Conservation limitée** : Durées définies
6. **Intégrité** : Sécurité et confidentialité
7. **Responsabilité** : Documenter la conformité

## Pages légales obligatoires {#pages}

### 1. Politique de confidentialité

**Contenu minimal :**

\`\`\`markdown
# Politique de confidentialité

## Responsable du traitement
[Nom entreprise]
[Adresse]
Numéro BCE : [...]
Email : [...]

## Données collectées
- Formulaire de contact : nom, email, téléphone, message
- Analytics : pages visitées, durée, appareil (anonymisé)
- Cookies : préférences utilisateur, session

## Finalités
- Répondre à vos demandes
- Améliorer le site web
- Statistiques de fréquentation

## Base légale
- Consentement (formulaires)
- Intérêt légitime (analytics anonyme)

## Durée de conservation
- Données contact : 3 ans après dernier échange
- Analytics : 26 mois
- Cookies : 13 mois maximum

## Vos droits RGPD
- Droit d'accès
- Droit de rectification
- Droit à l'effacement
- Droit à la portabilité
- Droit d'opposition
- Droit à la limitation

Contact DPO : [email]

## Sous-traitants
- Hébergeur : [nom] (localisation UE)
- Email : [nom] (localisation UE)
- Analytics : [nom]

## Sécurité
- HTTPS activé
- Accès restreints
- Backups chiffrés
- Audit régulier

## Modifications
Dernière mise à jour : [date]
\`\`\`

### 2. Politique de cookies

**Template implémentation :**

\`\`\`tsx
// components/CookieBanner.tsx
'use client';

import { useState, useEffect } from 'react';

type ConsentType = 'all' | 'essential' | null;

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const saveConsent = (type: ConsentType) => {
    localStorage.setItem('cookie-consent', type);

    // Activer Google Analytics seulement si consentement complet
    if (type === 'all' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied', // Pas de pub
      });
    }

    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <h3>Respect de votre vie privée</h3>
        <p>
          Nous utilisons des cookies essentiels pour le fonctionnement du site
          et des cookies analytiques (anonymes) pour améliorer votre expérience.
        </p>

        {showDetails && (
          <div className="cookie-details">
            <h4>Cookies essentiels (obligatoires)</h4>
            <ul>
              <li>Session utilisateur</li>
              <li>Panier d'achat</li>
              <li>Sécurité CSRF</li>
            </ul>

            <h4>Cookies analytiques (optionnels)</h4>
            <ul>
              <li>Google Analytics (anonymisé)</li>
              <li>Pages visitées</li>
              <li>Temps de visite</li>
            </ul>
          </div>
        )}

        <div className="cookie-actions">
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Masquer' : 'En savoir plus'}
          </button>
          <button onClick={() => saveConsent('essential')}>
            Essentiel uniquement
          </button>
          <button onClick={() => saveConsent('all')} className="primary">
            Accepter tout
          </button>
        </div>

        <a href="/politique-confidentialite">Politique de confidentialité complète</a>
      </div>
    </div>
  );
}
\`\`\`

## Formulaires conformes RGPD {#formulaires}

### Checklist formulaire de contact

\`\`\`tsx
// components/ContactForm.tsx
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      alert('Veuillez accepter la politique de confidentialité');
      return;
    }

    // Envoi formulaire...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" required placeholder="Nom *" />
      <input type="email" name="email" required placeholder="Email *" />
      <textarea name="message" required placeholder="Message *" />

      {/* Consentement obligatoire */}
      <label>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        J'accepte que mes données soient utilisées pour répondre à ma demande
        conformément à la <a href="/politique-confidentialite">politique de confidentialité</a> *
      </label>

      {/* Consentement optionnel séparé */}
      <label>
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
        J'accepte de recevoir des actualités par email (optionnel)
      </label>

      <button type="submit" disabled={!consent}>
        Envoyer
      </button>
    </form>
  );
}
\`\`\`

**Points clés :**
- ✓ Consentement actif (case à cocher)
- ✓ Finalité claire
- ✓ Lien vers politique de confidentialité
- ✓ Consentement newsletter séparé
- ✓ Champs obligatoires marqués (*)

## Droits des utilisateurs {#droits}

### Mise en œuvre des droits RGPD

**1. Droit d'accès**

Créez une page /mes-donnees avec authentification :

\`\`\`tsx
// app/mes-donnees/page.tsx
export default async function MyDataPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Mes données personnelles</h1>

      <section>
        <h2>Informations de compte</h2>
        <p>Nom : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Créé le : {user.createdAt}</p>
      </section>

      <section>
        <h2>Historique</h2>
        {/* Afficher commandes, messages, etc. */}
      </section>

      <section>
        <h2>Actions disponibles</h2>
        <button>Télécharger mes données (JSON)</button>
        <button>Modifier mes informations</button>
        <button className="danger">Supprimer mon compte</button>
      </section>
    </div>
  );
}
\`\`\`

**2. Droit à l'effacement**

\`\`\`typescript
// app/api/account/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  // Anonymiser plutôt que supprimer (pour historique comptable)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: 'Utilisateur supprimé',
      email: \`deleted-\${user.id}@anonymized.local\`,
      phone: null,
      deletedAt: new Date(),
    },
  });

  // Supprimer données annexes non obligatoires
  await prisma.userPreferences.deleteMany({ where: { userId: user.id } });

  return NextResponse.json({ success: true });
}
\`\`\`

## Registre des traitements {#registre}

**Template Excel/Notion :**

| Traitement | Finalité | Base légale | Données | Durée | Destinataires |
|------------|----------|-------------|---------|--------|---------------|
| Contact client | Répondre demandes | Consentement | Nom, email, tel, message | 3 ans | Équipe commerciale |
| Newsletter | Communication marketing | Consentement | Email | Jusqu'à désinscription | Plateforme email |
| Analytics | Statistiques site | Intérêt légitime | IP anonyme, pages | 26 mois | Google (USA) |
| E-commerce | Traitement commandes | Contrat | Nom, adresse, paiement | 10 ans (compta) | Stripe, transporteur |

## Sanctions et contrôles {#sanctions}

### Exemples d'amendes belges

- **2024** : E-commerce belge — 150 000€ (absence politique cookies)
- **2023** : Plateforme SaaS — 85 000€ (fuite données non notifiée)
- **2023** : Site vitrine PME — 5 000€ (pas de consentement cookies)

### Si contrôle de l'APD (Autorité Protection Données)

**Procédure :**
1. Notification par courrier recommandé
2. Demande de documents (30 jours pour répondre)
3. Inspection possible sur site ou en ligne
4. Rapport avec recommandations
5. Mise en demeure si non-conformité
6. Sanction si non-régularisation

**Documents à préparer :**
- Registre des traitements
- Politiques de confidentialité/cookies
- Preuve consentements
- Contrats sous-traitants (DPA)
- Procédures sécurité
- Analyse d'impact (si nécessaire)

## Checklist conformité RGPD {#checklist}

### Niveau 1 : Obligatoire

- ✓ Politique de confidentialité accessible
- ✓ Bannière cookies avec consentement
- ✓ Formulaires avec cases à cocher actives
- ✓ HTTPS activé sur tout le site
- ✓ Registre des traitements tenu à jour
- ✓ Droits utilisateurs implémentés (accès, suppression)
- ✓ Contrats sous-traitants (DPA)
- ✓ Procédure notification violations

### Niveau 2 : Recommandé

- ✓ DPO désigné (obligatoire si > 250 employés ou données sensibles)
- ✓ Analyse d'impact (AIPD) si traitement à risque
- ✓ Pseudonymisation/chiffrement données sensibles
- ✓ Tests intrusion réguliers
- ✓ Formation équipe au RGPD
- ✓ Audit externe annuel

## Outils pratiques {#outils}

**Générateurs :**
- **CNIL** : Modèles gratuits politique confidentialité
- **iubenda** : Générateur cookies/privacy (payant)
- **Cookiebot** : Scan cookies + bannière conforme

**Gestion consentements :**
- **Axeptio** (français)
- **Cookiebot**
- **OneTrust**

**DPO externe :**
- AvocatsGDPR.be
- DPO-Belgique.be

---

**Besoin d'aide pour la conformité RGPD ?** Smidjan audite votre site et vous accompagne dans la mise en conformité complète.`,
    tableOfContents: [
      { title: "Obligations légales pour sites belges", id: "obligations" },
      { title: "Pages légales obligatoires", id: "pages" },
      { title: "Formulaires conformes RGPD", id: "formulaires" },
      { title: "Droits des utilisateurs", id: "droits" },
      { title: "Registre des traitements", id: "registre" },
      { title: "Sanctions et contrôles", id: "sanctions" },
      { title: "Checklist conformité RGPD", id: "checklist" },
      { title: "Outils pratiques", id: "outils" },
    ],
  },

  {
    slug: "clean-architecture-nextjs-applications-scalables",
    title:
      "Clean Architecture pour applications Next.js scalables et maintenables",
    excerpt:
      "Guide complet de l'architecture logicielle propre (Clean Architecture) appliquée à Next.js. Structurez vos projets pour qu'ils restent maintenables à long terme.",
    publishedAt: "2025-11-02",
    category: "Développement Web",
    readTime: "10 min",
    content: `# Clean Architecture pour applications Next.js scalables

La Clean Architecture permet de créer des applications **maintenables sur 5-10 ans**. Ce guide vous montre comment structurer votre projet Next.js selon ces principes éprouvés.

## Principes de Clean Architecture {#principes}

[CONTENU À DÉVELOPPER]

## Structure de dossiers recommandée {#structure}

[CONTENU À DÉVELOPPER]

## Layer Domain : Entités et logique métier {#domain}

[CONTENU À DÉVELOPPER]

## Layer Application : Use Cases {#application}

[CONTENU À DÉVELOPPER]

## Layer Infrastructure : APIs et DB {#infrastructure}

[CONTENU À DÉVELOPPER]

---

**Exemple complet disponible sur demande** : Smidjan partage gratuitement un template Next.js avec Clean Architecture.`,
    tableOfContents: [
      { title: "Principes de Clean Architecture", id: "principes" },
      { title: "Structure de dossiers recommandée", id: "structure" },
      { title: "Layer Domain : Entités et logique métier", id: "domain" },
      { title: "Layer Application : Use Cases", id: "application" },
      { title: "Layer Infrastructure : APIs et DB", id: "infrastructure" },
    ],
  },

  {
    slug: "migration-wordpress-nextjs-guide-complet",
    title: "Migrer de WordPress vers Next.js : guide complet 2025",
    excerpt:
      "Passez de WordPress à Next.js sans perdre votre SEO ni vos contenus. Stratégie de migration étape par étape avec gestion des redirections 301 et optimisation.",
    publishedAt: "2025-11-01",
    category: "Développement Web",
    readTime: "12 min",
    content: `# Migrer de WordPress vers Next.js : guide complet 2025

**Plus de 43% des sites web** utilisent WordPress. Mais pour des projets modernes exigeant performances maximales et évolutivité, Next.js s'impose. Ce guide vous accompagne dans la migration sans perte SEO.

## Pourquoi migrer vers Next.js ? {#pourquoi}

[CONTENU À DÉVELOPPER]

## Audit pré-migration {#audit}

[CONTENU À DÉVELOPPER]

## Export et conversion du contenu {#export}

[CONTENU À DÉVELOPPER]

## Gestion des redirections 301 {#redirections}

[CONTENU À DÉVELOPPER]

## Stratégie de déploiement {#deploiement}

[CONTENU À DÉVELOPPER]

---

**Migration complexe ?** Smidjan migre votre site WordPress vers Next.js en préservant 100% de votre SEO.`,
    tableOfContents: [
      { title: "Pourquoi migrer vers Next.js ?", id: "pourquoi" },
      { title: "Audit pré-migration", id: "audit" },
      { title: "Export et conversion du contenu", id: "export" },
      { title: "Gestion des redirections 301", id: "redirections" },
      { title: "Stratégie de déploiement", id: "deploiement" },
    ],
  },

  {
    slug: "tendances-design-web-2025-belgique",
    title: "Tendances design web 2025 pour sites professionnels belges",
    excerpt:
      "Les tendances design qui domineront en 2025 : minimalisme avancé, micro-interactions, dark mode, glassmorphism. Guide pratique pour PME belges avec exemples concrets.",
    publishedAt: "2025-10-31",
    category: "Développement Web",
    readTime: "9 min",
    content: `# Tendances design web 2025 pour sites professionnels

Le design web évolue rapidement. Voici les **8 tendances majeures de 2025** à adopter pour un site professionnel moderne qui convertit.

## Minimalisme fonctionnel {#minimalisme}

[CONTENU À DÉVELOPPER]

## Micro-interactions engageantes {#microinteractions}

[CONTENU À DÉVELOPPER]

## Dark mode par défaut {#darkmode}

[CONTENU À DÉVELOPPER]

## Glassmorphism et effets visuels {#glassmorphism}

[CONTENU À DÉVELOPPER]

## Typographie expressive {#typographie}

[CONTENU À DÉVELOPPER]

---

**Refonte design ?** Smidjan crée des designs web modernes et sur-mesure pour PME belges.`,
    tableOfContents: [
      { title: "Minimalisme fonctionnel", id: "minimalisme" },
      { title: "Micro-interactions engageantes", id: "microinteractions" },
      { title: "Dark mode par défaut", id: "darkmode" },
      { title: "Glassmorphism et effets visuels", id: "glassmorphism" },
      { title: "Typographie expressive", id: "typographie" },
    ],
  },

  {
    slug: "maintenance-site-web-checklist-pme-belgique",
    title: "Maintenance de site web : checklist essentielle pour PME belges",
    excerpt:
      "Guide complet de maintenance web : mises à jour sécurité, backups, monitoring, optimisations. Évitez les pannes et hackages avec cette checklist mensuelle.",
    publishedAt: "2025-10-30",
    category: "Développement Web",
    readTime: "8 min",
    content: `# Maintenance de site web : checklist essentielle pour PME

**47% des sites** subissent au moins une panne par an faute de maintenance. Ce guide vous donne la checklist complète pour maintenir votre site web sécurisé et performant.

## Pourquoi la maintenance est critique {#intro}

[CONTENU À DÉVELOPPER]

## Checklist hebdomadaire {#hebdo}

[CONTENU À DÉVELOPPER]

## Checklist mensuelle {#mensuel}

[CONTENU À DÉVELOPPER]

## Checklist trimestrielle {#trimestriel}

[CONTENU À DÉVELOPPER]

## Outils de monitoring automatique {#outils}

[CONTENU À DÉVELOPPER]

---

**Besoin d'une maintenance externalisée ?** Smidjan propose des contrats de maintenance web all-inclusive pour PME.`,
    tableOfContents: [
      { title: "Pourquoi la maintenance est critique", id: "intro" },
      { title: "Checklist hebdomadaire", id: "hebdo" },
      { title: "Checklist mensuelle", id: "mensuel" },
      { title: "Checklist trimestrielle", id: "trimestriel" },
      { title: "Outils de monitoring automatique", id: "outils" },
    ],
  },
];

// Add new articles to existing data
data.articles.push(...newArticles);

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

console.log(`✅ Successfully added ${newArticles.length} new articles!`);
console.log(`Total articles: ${data.articles.length}`);
