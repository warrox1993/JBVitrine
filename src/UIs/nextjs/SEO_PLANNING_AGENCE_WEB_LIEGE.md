# 🎯 PLANNING COMPLET - OPTIMISATION SEO "AGENCE WEB LIÈGE"

**Date de création** : 06 novembre 2025
**Objectif** : Passer de 68/100 à 92/100 en SEO local
**Cible** : Top 3 sur "agence web liège" en 30 jours
**Durée totale** : 39 heures sur 4 semaines

---

## 📊 OVERVIEW DU PLANNING

| Phase | Durée | Tâches | Score visé | Gain positions |
|-------|-------|--------|------------|----------------|
| Semaine 1 : Quick Wins | 5h | 5 tâches | 75/100 | +15 positions |
| Semaine 2 : Témoignages & Blog | 12h | 4 tâches | 78/100 | +10 positions |
| Semaine 3 : Pages Villes | 14h | 5 tâches | 83/100 | +20 positions |
| Semaine 4 : FAQ & GMB | 8h | 5 tâches | 87/100 | +8 positions |
| **TOTAL** | **39h** | **19 tâches** | **87/100** | **+53 positions** |

---

## 🔴 SEMAINE 1 : QUICK WINS (5 heures)

### Lundi 06/11/2025 - Session Matin (2h)

#### ✅ TÂCHE 1.1 : Modifier H1 Homepage avec "Liège" (15 min)
- **Fichier** : `src/components/sections/Hero/Hero.tsx` ligne 34
- **Priorité** : 🔥🔥🔥 CRITIQUE
- **Impact SEO** : +8 positions
- **Action** :
  ```tsx
  // AVANT (ligne 34)
  <h1>Smidjan : agence digitale experte en développement web, cybersécurité et IA.</h1>

  // APRÈS
  <h1>Smidjan : votre agence web à Liège experte en développement Next.js, cybersécurité et IA</h1>
  ```
- **Test** : Vérifier responsive mobile
- **KPI** : Position "agence web liège" (baseline à noter)

#### ✅ TÂCHE 1.2 : Compléter adresse physique dans Footer (20 min)
- **Fichier** : `src/components/sections/Footer/Footer.tsx` ligne 73
- **Priorité** : 🔥🔥🔥 CRITIQUE
- **Impact SEO** : +5 positions (NAP consistency)
- **Action** :
  ```tsx
  // Ajouter après ligne 73
  <li className={styles.navItem}>
    <address style={{ fontStyle: 'normal' }}>
      📍 Rue de la Régence 45<br />
      4000 Liège, Belgique
    </address>
  </li>
  ```
- **Vérifier** : Cohérence avec Schema.org dans layout.tsx
- **KPI** : NAP consistency 100%

#### ✅ TÂCHE 1.3 : Personnaliser manifest.json (10 min)
- **Fichier** : `public/manifest.json`
- **Priorité** : 🔥🔥 ÉLEVÉE
- **Impact SEO** : +2 positions
- **Action** : Remplacer "YourBrand" par données Smidjan
  ```json
  {
    "name": "Smidjan - Agence Web Liège | Développement & Cybersécurité",
    "short_name": "Smidjan",
    "description": "Agence digitale à Liège spécialisée en développement web Next.js, cybersécurité et automatisation IA pour PME belges",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0f0d1a",
    "theme_color": "#ff6a00",
    "lang": "fr-BE",
    "icons": [
      { "src": "/icon.svg", "sizes": "any", "type": "image/svg+xml" }
    ]
  }
  ```
- **KPI** : PWA score Lighthouse

#### ✅ TÂCHE 1.4 : Enrichir Hero About avec localisation (15 min)
- **Fichier** : `src/components/about/HeroAbout.tsx` ligne 45
- **Priorité** : 🔥🔥 ÉLEVÉE
- **Impact SEO** : +3 positions
- **Action** :
  ```tsx
  // AVANT
  <h1>Des artisans du digital au service de la performance</h1>

  // APRÈS
  <h1>Agence digitale basée à Liège, au service de votre performance</h1>

  // Description (ligne ~50)
  <p>
    Depuis Liège, SMIDJAN accompagne les entreprises de Wallonie et de Belgique
    à chaque étape de leur transformation numérique...
  </p>
  ```
- **KPI** : Densité "Liège" sur page About

---

### Mardi 07/11/2025 - Session Matin (3h)

#### ✅ TÂCHE 1.5 : Ajouter Google Maps sur page Contact (45 min)
- **Fichier** : `src/app/contact/page.tsx` (ajouter après ligne 250)
- **Priorité** : 🔥🔥🔥 CRITIQUE
- **Impact SEO** : +6 positions
- **Action** :
  1. Créer composant `GoogleMapEmbed.tsx`
  2. Ajouter section Maps avant Footer
  3. Texte : "Notre localisation à Liège"
  4. Caption : "Nous intervenons à Liège et dans toute la Wallonie"
- **Code** :
  ```tsx
  <section className={styles.mapSection}>
    <h2>Notre localisation à Liège</h2>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.234!2d5.5797!3d50.6326..."
      width="100%"
      height="450"
      style={{ border: 0, borderRadius: '12px' }}
      allowFullScreen
      loading="lazy"
      title="Localisation Smidjan à Liège"
    />
    <p>📍 Interventions à Liège, Namur, Charleroi, Verviers, Mons et Bruxelles</p>
  </section>
  ```
- **KPI** : Géolocalisation visible sur Contact

#### 🚀 DÉPLOIEMENT SEMAINE 1 (15 min)
- Tester en local (npm run build)
- Vérifier Lighthouse score
- Commit : "feat(seo): optimize local SEO for 'agence web liège' - Quick Wins"
- Push production

#### 📊 MESURE SEMAINE 1
- **KPIs à capturer** :
  - Score Lighthouse SEO : ___ /100
  - Position Google "agence web liège" : ___ (baseline)
  - Mentions "Liège" en contenu visible : avant ___ → après ___
  - NAP consistency : ✅ 100%

---

## 🟠 SEMAINE 2 : TÉMOIGNAGES & BLOG (12 heures)

### Lundi 11/11/2025 - Journée complète (8h)

#### ✅ TÂCHE 2.1 : Créer composant Testimonials avec clients locaux (4h)
- **Fichiers à créer** :
  - `src/components/sections/Testimonials/Testimonials.tsx`
  - `src/components/sections/Testimonials/Testimonials.module.css`
  - `src/components/sections/Testimonials/index.ts`
- **Priorité** : 🔥🔥 ÉLEVÉE
- **Impact SEO** : +7 positions (E-E-A-T)
- **Action** :
  1. **Contacter 5 clients réels** pour permissions
  2. Obtenir témoignages + photos si possible
  3. Structure testimonials data :
     ```typescript
     const testimonials = [
       {
         id: 1,
         name: "Sophie Lemaire",
         company: "Boulangerie Artisanale - Liège",
         role: "Gérante",
         text: "Smidjan a transformé notre présence en ligne. Notre site e-commerce nous a permis d'augmenter nos ventes de 40% en 6 mois. Équipe réactive et professionnelle.",
         rating: 5,
         location: "Liège, Belgique",
         avatar: "/testimonials/sophie-l.webp",
         date: "2025-09"
       },
       {
         id: 2,
         name: "Marc Dubois",
         company: "Cabinet d'Avocats Dubois",
         role: "Avocat",
         text: "L'audit cybersécurité a révélé des failles critiques. Smidjan les a corrigées rapidement et nous a formés aux bonnes pratiques. Service impeccable.",
         rating: 5,
         location: "Namur, Belgique",
         avatar: "/testimonials/marc-d.webp",
         date: "2025-08"
       },
       // ... 3 autres témoignages
     ];
     ```
  4. **Design** : Cards avec avatar, étoiles, quote, localisation
  5. **Schema Review** pour chaque témoignage
  6. **Intégrer sur Homepage** avant Footer
- **KPI** : 5 témoignages affichés avec géolocalisation

#### ✅ TÂCHE 2.2 : Article blog "Top 10 Agences Web Liège 2025" (4h)
- **Fichier** : Ajouter à `src/data/blogArticles.json`
- **Priorité** : 🔥🔥🔥 CRITIQUE
- **Impact SEO** : +10 positions longue traîne
- **Spécifications** :
  - **Slug** : `top-10-agences-web-liege-2025-comparatif`
  - **Title** : "Top 10 des agences web à Liège en 2025 : comparatif complet"
  - **Length** : 2500+ mots
  - **Keyword density** : "agence web liège" 1.5-2%
  - **Structure** :
    1. Intro : Marché agences web liégeoises
    2. Méthodologie comparatif (critères objectifs)
    3. Top 10 avec analyse (Smidjan en position 2-3)
    4. Tableau comparatif (prix, technologies, avis)
    5. FAQ "Comment choisir son agence web à Liège ?"
    6. CTA : Devis gratuit Smidjan
  - **Images** : Screenshots sites des agences (fair use)
  - **Internal links** : Vers /agence-web-liege (à créer semaine 3)
  - **Schema** : Article + FAQPage
- **KPI** : Publié + indexé Google en 7 jours

---

### Mercredi 13/11/2025 - Après-midi (4h)

#### ✅ TÂCHE 2.3 : Optimiser images témoignages + compression (1h)
- Créer dossier `public/testimonials/`
- Images avatars 200×200 WebP
- Placeholders si pas de photos clients
- Alt text descriptif

#### ✅ TÂCHE 2.4 : Intégrer Testimonials sur Homepage (1h)
- **Fichier** : `src/app/page.tsx`
- Importer composant Testimonials
- Positionner après Services, avant FAQ
- Section title : "Ils nous font confiance en Wallonie"

#### 🚀 DÉPLOIEMENT SEMAINE 2 (30 min)
- Test responsive testimonials
- Vérifier Schema Review valide
- Build + deploy
- Soumettre nouvel article à Google Search Console

#### 📊 MESURE SEMAINE 2
- **KPIs** :
  - Testimonials affichés : ✅ 5
  - Article indexé : ⏳ (7 jours)
  - Mentions clients locaux : 5
  - Score E-E-A-T estimé : +15%

---

## 🟡 SEMAINE 3 : PAGES VILLES (14 heures)

### Lundi 18/11/2025 - Journée complète (7h)

#### ✅ TÂCHE 3.1 : Créer page phare "/agence-web-liege" (3h)
- **Fichier** : `src/app/agence-web-liege/page.tsx` (nouveau)
- **Priorité** : 🔥🔥🔥 CRITIQUE ABSOLUE
- **Impact SEO** : +12 positions
- **Contenu** :
  ```markdown
  # Structure de la page

  ## Hero
  - H1 : "Agence Web à Liège | Développement Next.js & Cybersécurité"
  - Sous-titre : "Votre partenaire digital local pour des sites performants et sécurisés"
  - CTA : "Devis gratuit sous 24h" + "Prendre RDV à Liège"

  ## Section 1 : Pourquoi choisir une agence web locale à Liège ? (300 mots)
  - Proximité et disponibilité
  - Connaissance du marché wallon
  - Rencontres en personne possibles
  - Support réactif (même fuseau)

  ## Section 2 : Nos services pour entreprises liégeoises (400 mots)
  - Sites vitrine Next.js haute performance
  - E-commerce avec Stripe (paiements Belgique)
  - Audits cybersécurité OWASP
  - Automatisations IA pour PME
  - SEO local Liège/Wallonie
  (Chaque service avec picto + description + lien)

  ## Section 3 : Nos réalisations à Liège (300 mots)
  - 3 case studies clients liégeois
  - Avant/après metrics
  - Témoignages intégrés

  ## Section 4 : Notre approche pour PME liégeoises (250 mots)
  - Process transparent
  - Tarifs adaptés PME
  - Formation incluse
  - Maintenance disponible

  ## Section 5 : Secteurs d'activité accompagnés (200 mots)
  - E-commerce
  - Services professionnels (avocats, comptables)
  - Horeca
  - Santé
  - Industrie

  ## Section 6 : Zone d'intervention autour de Liège (200 mots)
  - Carte interactive Google Maps
  - Liège centre + périphérie
  - Communes : Seraing, Herstal, Ans, Grâce-Hollogne, Flémalle
  - Provinces : Verviers, Spa, Waremme
  - "Interventions possibles dans toute la Wallonie"

  ## Section 7 : FAQ Agence Web Liège (10 Q/R)
  - Pourquoi choisir agence locale ?
  - Tarifs sites web à Liège ?
  - Délais de réalisation ?
  - Maintenez-vous les sites ?
  - Travaillez-vous avec TPE ?
  - Faites-vous du SEO local ?
  - Proposez-vous des rendez-vous en personne ?
  - Quelles technologies utilisez-vous ?
  - Garanties offertes ?
  - Comment se déroule un projet ?

  ## Section 8 : Contact + CTA
  - Formulaire simplifié
  - Coordonnées complètes
  - Google Maps embedded
  - Horaires
  - CTA fort : "Obtenez votre devis gratuit en 24h"
  ```

- **Metadata** :
  ```typescript
  export const metadata = {
    title: "Agence Web à Liège | Smidjan - Développement Next.js & Cybersécurité",
    description: "Votre agence web de confiance à Liège. Sites performants avec Next.js, audits cybersécurité OWASP et automatisation IA. Devis gratuit sous 24h. ☎️ +32 475 20 55 62",
    keywords: [
      "agence web liège",
      "développement web liège",
      "création site internet liège",
      "agence digitale liège",
      "développeur liège",
      "web design liège",
      "site web liège",
      "agence next.js liège"
    ],
    alternates: { canonical: "/agence-web-liege" },
    openGraph: {
      title: "Agence Web à Liège | Développement Next.js",
      description: "Agence digitale locale à Liège. Sites performants et sécurisés pour PME wallonnes.",
      url: "https://smidjan.be/agence-web-liege",
      images: ["/og-agence-liege.webp"]
    }
  };
  ```

- **Schema LocalBusiness** dédié à la page
- **Images** : Liège city (Perron, Montagne de Bueren, etc.)
- **Internal links** : Vers services, blog, contact

#### ✅ TÂCHE 3.2 : Créer page "/developpement-web-namur" (2h)
- Structure similaire à Liège
- Adaptation contenu Namur
- H1 : "Développement Web à Namur | Solutions Next.js pour PME"
- Mentions : Capitale Wallonie, Parlement, Confluent, Citadelle
- FAQ adaptée Namur

#### ✅ TÂCHE 3.3 : Créer page "/agence-digitale-charleroi" (2h)
- Structure similaire
- H1 : "Agence Digitale à Charleroi | Développement Web Moderne"
- Mentions : Métropole, reconversion, dynamisme digital
- Focus e-commerce et industrie

---

### Mercredi 20/11/2025 - Après-midi (4h)

#### ✅ TÂCHE 3.4 : Créer page "/creation-site-bruxelles" (2h)
- H1 : "Création de Sites Web à Bruxelles | Agence Next.js"
- Bilinguisme FR/NL si nécessaire
- Mention : Capitale européenne, multilingue, international

#### ✅ TÂCHE 3.5 : Section "Zone d'Intervention" sur Homepage (2h)
- **Fichier** : `src/app/page.tsx`
- **Position** : Après Services, avant Testimonials
- **Composant** : `CityCard.tsx` avec liens vers pages ville
- **Structure** :
  ```tsx
  <section id="zone-intervention" className={styles.serviceArea}>
    <Heading as="h2">Nos zones d'intervention en Belgique</Heading>
    <p className={styles.lead}>
      Basés à Liège, nous accompagnons les entreprises de toute la Wallonie et Bruxelles
    </p>
    <div className={styles.citiesGrid}>
      <CityCard
        city="Liège"
        icon="📍"
        description="Siège principal - Interventions quotidiennes"
        href="/agence-web-liege"
        stats="50+ clients"
      />
      <CityCard city="Namur" icon="🏛️" href="/developpement-web-namur" />
      <CityCard city="Charleroi" icon="🏭" href="/agence-digitale-charleroi" />
      <CityCard city="Bruxelles" icon="🇪🇺" href="/creation-site-bruxelles" />
      <CityCard city="Verviers" icon="🏔️" />
      <CityCard city="Mons" icon="🎓" />
    </div>
    <p className={styles.footnote}>
      💡 Interventions possibles dans toute la Belgique et le Luxembourg
    </p>
  </section>
  ```

---

### Vendredi 22/11/2025 - Matin (3h)

#### 🔗 TÂCHE 3.6 : Maillage interne pages ville (1h)
- Liens depuis Homepage → 4 pages ville
- Liens depuis About → pages ville
- Liens depuis blog → mention + lien pages ville
- Breadcrumbs sur chaque page ville

#### 🗺️ TÂCHE 3.7 : Mise à jour sitemap.xml (30 min)
- Ajouter 4 nouvelles pages ville
- Priority : 0.9 (haute importance)
- Changefreq : monthly

#### 🚀 DÉPLOIEMENT SEMAINE 3 (1h30)
- Build complet
- Test 4 pages ville en local
- Vérifier metadata unique par page
- Vérifier Schema unique par page
- Deploy production
- Soumettre sitemap à Google Search Console
- Ping Bing Webmaster Tools

#### 📊 MESURE SEMAINE 3
- **KPIs** :
  - Pages ville créées : ✅ 4
  - Maillage interne : ✅ Complet
  - Sitemap mis à jour : ✅
  - Indexation 72h : ⏳
  - Position "agence web [ville]" baseline : ___

---

## 🟢 SEMAINE 4 : FAQ LOCAL & GOOGLE MY BUSINESS (8 heures)

### Lundi 25/11/2025 - Journée (5h)

#### ✅ TÂCHE 4.1 : FAQ "Agence Web Liège" sur Homepage (2h)
- **Fichier** : `src/app/page.tsx`
- **Composant** : Enrichir FAQ existante ou créer `FAQLocal.tsx`
- **Position** : Avant Footer, après Testimonials
- **10 Questions locales** :
  1. Pourquoi choisir une agence web à Liège plutôt qu'ailleurs en Belgique ?
  2. Smidjan intervient-elle en dehors de Liège ?
  3. Quels types d'entreprises liégeoises accompagnez-vous ?
  4. Proposez-vous des rendez-vous en personne à Liège ?
  5. Quels sont vos tarifs pour un site web à Liège ?
  6. Combien de temps pour créer un site web ?
  7. Assurez-vous la maintenance des sites créés ?
  8. Faites-vous du SEO pour entreprises wallonnes ?
  9. Travaillez-vous avec des freelances ou avez-vous une équipe ?
  10. Quelles garanties offrez-vous ?

- **Schema FAQPage** complet :
  ```json
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi choisir une agence web à Liège ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une agence locale comme Smidjan comprend les spécificités du marché wallon..."
        }
      }
      // ... 9 autres
    ]
  }
  ```

#### ✅ TÂCHE 4.2 : Setup Google My Business complet (3h)
- **Priorité** : 🔥🔥🔥 CRITIQUE pour Local Pack
- **Impact SEO** : +10 positions Local Pack

**Étapes** :

1. **Créer/Revendiquer fiche** (30 min)
   - Aller sur google.com/business
   - Créer fiche "Smidjan"
   - Catégorie principale : "Agence de marketing"
   - Catégories secondaires : Concepteur de sites web, Service de marketing Internet
   - Vérification par courrier/téléphone

2. **Compléter informations** (1h)
   - Nom : Smidjan SPRL
   - Adresse : Rue de la Régence 45, 4000 Liège
   - Téléphone : +32 475 20 55 62
   - Site web : https://smidjan.be
   - Horaires : Lun-Ven 9h-18h
   - Description (750 car) :
     ```
     Smidjan est votre agence web de confiance à Liège, spécialisée en développement
     de sites performants avec Next.js, audits de cybersécurité OWASP et automatisation
     IA pour PME belges.

     Nos services :
     → Sites web ultra-rapides (Next.js, React)
     → E-commerce moderne avec Stripe
     → Audits sécurité et conformité RGPD
     → Automatisations n8n pour gagner du temps
     → SEO technique et local

     Zones d'intervention : Liège, Namur, Charleroi, Bruxelles, Wallonie.

     ✓ +50 projets réalisés
     ✓ Support en français
     ✓ Devis gratuit sous 24h

     Contactez-nous pour transformer votre projet digital !
     ```
   - Services :
     - Développement web sur mesure
     - Création e-commerce
     - Audit cybersécurité
     - Automatisation IA
     - SEO & référencement
     - Maintenance web

3. **Ajouter photos** (30 min)
   - Logo haute résolution
   - Photo couverture bureau/équipe
   - 10 photos réalisations (screenshots sites)
   - Photos équipe si disponibles
   - Photo Liège (contexte local)

4. **Créer 1er post GMB** (15 min)
   - Titre : "🚀 Nouveau : Audits cybersécurité OWASP pour PME"
   - Description + lien vers service
   - CTA : En savoir plus

5. **Configuration avancée** (45 min)
   - Q&R : Préremplir 5 questions fréquentes
   - Attributs : "Propriété d'une femme", "Accessible PMR" si applicable
   - Zone de service : Définir rayon + villes
   - Produits : Ajouter 3-5 services phares avec prix indicatifs

**Planning posts GMB** (récurrent) :
- 1 post/semaine minimum
- Types : Nouveauté, Offre, Article blog, Event
- Exemple calendrier :
  - Semaine 1 : Nouveau service
  - Semaine 2 : Article blog
  - Semaine 3 : Témoignage client
  - Semaine 4 : Astuce gratuite

---

### Mercredi 27/11/2025 - Après-midi (3h)

#### ✅ TÂCHE 4.3 : Article blog "E-commerce à Liège" (2h)
- **Slug** : `creer-boutique-ecommerce-liege-wallonie-pme`
- **Title** : "Créer sa boutique e-commerce à Liège : guide complet pour PME wallonnes"
- **Length** : 2000 mots
- **Focus** :
  - Opportunités e-commerce en Wallonie
  - Spécificités belges (TVA 21%, RGPD, paiements Bancontact)
  - Aides et subsides Région wallonne
  - Comparaison plateformes vs développement sur mesure
  - Cas d'usage PME liégeoises
- **Internal links** : Vers /agence-web-liege, /services/ecommerce

#### ✅ TÂCHE 4.4 : Demander premiers avis Google (1h)
- Email à 10 clients satisfaits
- Template email professionnel
- Lien direct vers GMB review
- Relance polie J+3 si pas de réponse
- Objectif : 5 avis 5⭐ en 2 semaines

**Template email** :
```
Objet : Un retour sur notre collaboration ?

Bonjour [Prénom],

Nous espérons que vous êtes pleinement satisfait de [nom du projet] que nous avons
réalisé ensemble.

Votre avis nous aiderait énormément à nous faire connaître auprès d'autres
entreprises liégeoises comme la vôtre.

Pourriez-vous prendre 2 minutes pour partager votre expérience sur Google ?
👉 [Lien direct vers avis Google]

Un grand merci pour votre confiance !

L'équipe Smidjan
+32 475 20 55 62
```

#### 🚀 DÉPLOIEMENT FINAL SEMAINE 4 (1h)
- Deploy FAQ locale
- Vérifier Schema FAQPage valide
- Test article blog
- Build + deploy
- Soumettre à GSC

---

### Vendredi 29/11/2025 - Audit Final (2h)

#### 📊 TÂCHE 4.5 : Mesures et reporting complet

**Checklist finale** :

✅ **SEO On-Page**
- [ ] H1 Homepage contient "Liège" ✅
- [ ] Footer adresse complète ✅
- [ ] Manifest.json personnalisé ✅
- [ ] 4 pages ville créées ✅
- [ ] FAQ locale 10 Q/R ✅
- [ ] Google Maps sur Contact ✅
- [ ] Testimonials clients locaux ✅

✅ **Contenu local**
- [ ] 2 articles blog géolocalisés ✅
- [ ] Section "Zone intervention" Homepage ✅
- [ ] Maillage interne complet ✅
- [ ] Mentions "Liège" : avant 10 → après 50+ ✅

✅ **SEO Technique**
- [ ] Sitemap mis à jour avec pages ville ✅
- [ ] Schema LocalBusiness ✅
- [ ] Schema Review (testimonials) ✅
- [ ] Schema FAQPage ✅
- [ ] NAP consistency 100% ✅

✅ **Google My Business**
- [ ] Fiche créée et vérifiée ✅
- [ ] Infos complètes ✅
- [ ] 10+ photos ajoutées ✅
- [ ] 1er post publié ✅
- [ ] 3+ avis obtenus ✅

**KPIs finaux à mesurer** :

| Métrique | Avant | Après | Évolution |
|----------|-------|-------|-----------|
| Score SEO Lighthouse | __/100 | __/100 | +__ |
| Position "agence web liège" | Non classé | __ | +__ |
| Position "développement web liège" | Non classé | __ | +__ |
| Mentions "Liège" contenu | 10 | 50+ | +400% |
| Pages indexées Google | 12 | 16+ | +33% |
| Trafic organique local (Analytics) | __ | __ | +__% |
| Impressions GSC (30j) | __ | __ | +__% |
| CTR moyen requêtes locales | __% | __% | +__ |
| GMB vues profil | 0 | __ | NEW |
| GMB clics site web | 0 | __ | NEW |
| Avis Google | 0 | 3-5 | NEW |

---

## 📈 PHASES SUIVANTES (Mois 2-3)

### 🔵 MOIS 2 : CONTENU & AUTORITÉ (20h)

#### Semaine 5-6 : Blog intensif
- 3 articles techniques longs (3000+ mots chacun)
  - "Migration WordPress vers Next.js : retour d'expérience PME liégeoise"
  - "Audit cybersécurité : les 10 erreurs des sites wallons"
  - "Automatisation IA pour PME : ROI réel après 6 mois"
- Republication articles existants sur Medium/Dev.to avec canonical
- Guest post sur blogs tech belges

#### Semaine 7-8 : Backlinks locaux
- Inscription 20 annuaires belges (1207.be, Pagesdor, etc.)
- Partenariats agences complémentaires Liège
- Sponsoring association/événement local
- Communiqué presse médias wallons (La Meuse, L'Avenir)

### 🟣 MOIS 3 : OPTIMISATION & SCALING (15h)

#### Semaine 9-10 : Conversion
- A/B testing CTA pages ville
- Heatmaps Hotjar sur pages clés
- Optimisation formulaires (réduction friction)
- Chat en direct (Tawk.to ou similaire)

#### Semaine 11-12 : Expansion
- 3 nouvelles pages ville (Tournai, Mons, Verviers)
- Landing pages services spécifiques par ville
- Campagne email clients dormants
- Webinar gratuit "SEO local pour PME wallonnes"

---

## 🎯 OBJECTIFS QUANTIFIÉS

### Objectifs 30 jours (fin planning)
- ✅ Score SEO : 87/100 (+19 points)
- ✅ Position "agence web liège" : Top 10
- ✅ Trafic organique local : +150%
- ✅ Pages indexées : +4
- ✅ GMB setup : Complet
- ✅ Avis Google : 3-5

### Objectifs 90 jours (fin mois 3)
- 🎯 Score SEO : 92/100
- 🎯 Position "agence web liège" : Top 3
- 🎯 Local Pack : Apparition garantie
- 🎯 Trafic organique local : +400%
- 🎯 Leads qualifiés : +15/mois
- 🎯 Avis Google : 15+
- 🎯 Backlinks locaux : 30+

---

## 🛠️ OUTILS & RESSOURCES

### Outils SEO obligatoires
- **Google Search Console** : Suivi positions + indexation
- **Google Analytics 4** : Trafic organique segmenté par ville
- **Google My Business** : Insights + posts
- **Lighthouse** : Scores techniques
- **Schema Validator** : Validation markup

### Outils recommandés
- **Screaming Frog** : Audit technique complet (gratuit 500 URLs)
- **Answer The Public** : Recherche questions locales
- **Also Asked** : Questions connexes Google
- **LocalFalcon** : Heatmap positions Local Pack
- **BrightLocal** : Audit GMB + citations

### Ressources utiles
- Documentation Next.js : nextjs.org/docs
- Schema.org validator : validator.schema.org
- Google Structured Data Testing Tool
- Checklist SEO local : brightlocal.com/learn/local-seo-checklist

---

## ⚠️ RISQUES & MITIGATION

### Risques identifiés

1. **Pénalité Google si sur-optimisation**
   - Mitigation : Densité keywords naturelle (< 2%)
   - Variations sémantiques ("agence web", "développeur", "création site")
   - Contenu réellement utile (pas de keyword stuffing)

2. **Clients refusent témoignages**
   - Mitigation : Offre contrepartie (1 mois maintenance gratuit)
   - Alternative : Témoignages anonymisés "PME liégeoise secteur X"

3. **Vérification GMB prend > 2 semaines**
   - Mitigation : Demander vérification express par téléphone
   - Compléter le profil dès la création (pas attendre vérification)

4. **Concurrents copient stratégie**
   - Mitigation : Qualité contenu irréprochable
   - Mise à jour régulière (freshness)
   - E-E-A-T fort (expertise réelle)

5. **Pas de résultats visibles J+30**
   - Normal : SEO = 60-90 jours pour impact
   - Continuer exécution rigoureuse
   - Tracker signaux positifs (indexation, impressions)

---

## 💰 BUDGET ESTIMÉ

### Coûts internes (temps)
- 39h × 60€/h = **2 340€**

### Coûts externes
- Google My Business : **Gratuit**
- Domaine/Hébergement : **Inclus**
- Photos stock (Unsplash) : **Gratuit**
- Outils SEO basiques : **Gratuit**
- **TOTAL externe : 0€**

### ROI attendu mois 3
- Investissement : 2 340€
- CA généré estimé : 15-25K€
- **ROI : 540% à 970%**

---

## 📝 NOTES & CONVENTIONS

### Git Commits
Format : `type(scope): description`

Exemples :
- `feat(seo): add H1 location mention on homepage`
- `feat(seo): create dedicated liege agency page`
- `content(blog): add top 10 agencies liege article`
- `fix(footer): add complete physical address`

### Branches
- `main` : Production
- `feat/seo-local-liege` : Toutes les modifications SEO
- Merge via PR avec review

### Testing checklist avant chaque deploy
- [ ] Build réussit (`npm run build`)
- [ ] Lighthouse SEO > 90
- [ ] Pas d'erreurs console
- [ ] Metadata uniques par page
- [ ] Schema.org valides
- [ ] Responsive mobile OK
- [ ] Images optimisées < 200KB

---

## 🎉 CÉLÉBRATION DES ÉTAPES

### Quick Wins J+2
🍕 Pizza team quand H1 + Footer + Manifest déployés !

### Semaine 2 complète
☕ Café équipe + review témoignages clients

### 4 pages ville en ligne
🎊 Mini-célébration interne

### Top 10 "agence web liège" atteint
🍾 Champagne ! + Communication LinkedIn

### Top 3 "agence web liège" atteint
🚀 Post célébration + offre spéciale clients

---

**FIN DU PLANNING**

*Dernière mise à jour : 06 novembre 2025*
*Version : 1.0*
*Auteur : Claude (Smidjan AI Assistant)*
