# 🍞 Guide d'Intégration du Fil d'Ariane (Breadcrumb)

## 📋 Vue d'Ensemble

Le composant Breadcrumb a été créé pour améliorer:
- ✅ **SEO**: Données structurées Schema.org BreadcrumbList
- ✅ **UX**: Navigation claire et hiérarchique
- ✅ **Accessibilité**: ARIA labels et navigation au clavier
- ✅ **Performance**: Génération automatique basée sur l'URL

---

## 🎯 Fonctionnalités

### Génération Automatique
Le breadcrumb se génère automatiquement depuis l'URL:
- `/about` → Accueil > À Propos
- `/blog/mon-article` → Accueil > Blog > Mon Article
- `/services` → Accueil > Services

### Configuration Personnalisée
Vous pouvez aussi passer des items personnalisés:
```tsx
<Breadcrumb items={[
  { label: 'Services', href: '/services' },
  { label: 'Développement Web', href: '/services/dev-web' }
]} />
```

### Schema.org Intégré
Le composant génère automatiquement les données structurées:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

---

## 🚀 Comment Intégrer

### Méthode 1: Automatique (Recommandé)

Ajoutez simplement le composant dans votre page:

```tsx
import { Breadcrumb } from '@/components/Breadcrumb';

export default function MaPage() {
  return (
    <main>
      <Breadcrumb />
      {/* Votre contenu */}
    </main>
  );
}
```

### Méthode 2: Personnalisé

Pour des breadcrumbs spécifiques:

```tsx
import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';

export default function ArticlePage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    { label: 'Catégorie', href: '/blog/categorie' },
    { label: 'Titre de l\'article', href: '/blog/mon-article' }
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbs} />
      {/* Votre contenu */}
    </main>
  );
}
```

### Méthode 3: Avec Hook

Pour générer dynamiquement:

```tsx
'use client';

import { Breadcrumb, useBreadcrumbs } from '@/components/Breadcrumb';

export default function DynamicPage() {
  const breadcrumbs = useBreadcrumbs([
    // Personnalisez si besoin
  ]);

  return (
    <main>
      <Breadcrumb items={breadcrumbs} />
      {/* Votre contenu */}
    </main>
  );
}
```

---

## 📁 Pages à Mettre à Jour

### Pages Principales (Priorité Haute) ✅ 100% COMPLÉTÉ

- [x] `/` - Page d'accueil (pas de breadcrumb)
- [x] `/about` - À propos
- [x] `/services` - Services
- [x] `/blog` - Liste des articles
- [x] `/blog/[slug]` - Article de blog
- [x] `/contact` - Contact
- [x] `/cms-ecommerce` - CMS E-commerce

### Pages Secondaires (Priorité Moyenne) ✅ 100% COMPLÉTÉ

- [x] `/admin` - Dashboard admin
- [x] `/admin/blog` - Gestion blog
- [x] `/admin/blog/new` - Nouvel article
- [x] `/admin/blog/edit/[slug]` - Éditer article
- [x] `/admin/leads` - Gestion leads
- [x] `/admin/articles/new` - Nouvel article
- [x] `/admin/articles/[slug]/edit` - Éditer article
- [x] `/admin/login` - Connexion admin

### Pages Légales (Priorité Basse) ✅ 100% COMPLÉTÉ

- [x] `/privacy` - Politique de confidentialité
- [x] `/terms` - Conditions d'utilisation
- [x] `/legal-notice` - Mentions légales

---

## 🎨 Personnalisation des Labels

Les labels sont définis dans `Breadcrumb.tsx`:

```typescript
const ROUTE_LABELS: Record<string, string> = {
  '/': 'Accueil',
  '/about': 'À Propos',
  '/services': 'Services',
  '/blog': 'Blog',
  '/contact': 'Contact',
  // Ajoutez vos routes ici
};
```

Pour ajouter un nouveau label:

```typescript
'/ma-page': 'Mon Titre Personnalisé',
```

---

## 💅 Styling

### Classes CSS Disponibles

- `.breadcrumb` - Container principal
- `.breadcrumbList` - Liste `<ol>`
- `.breadcrumbItem` - Item individuel
- `.breadcrumbLink` - Lien
- `.breadcrumbSeparator` - Séparateur (chevron)
- `.breadcrumbCurrent` - Page actuelle
- `.breadcrumbItemActive` - Item actif

### Personnaliser les Couleurs

Dans `Breadcrumb.module.css`:

```css
.breadcrumbLink {
  color: var(--color-text-2, #c8cdd6);
}

.breadcrumbLink:hover {
  color: var(--color-accent-1, #ff6a00);
  background: rgba(255, 106, 0, 0.1);
}
```

### Changer l'Icône Home

Dans `Breadcrumb.tsx`, remplacez:

```tsx
<Home size={16} className={cls.homeIcon} />
```

---

## 🔧 Exemples d'Intégration

### Page About (Simple)

```tsx
// src/app/about/page.tsx
import { Breadcrumb } from '@/components/Breadcrumb';

export default function AboutPage() {
  return (
    <main className="container">
      <Breadcrumb />

      <h1>À Propos de Smidjan</h1>
      {/* Contenu */}
    </main>
  );
}
```

**Résultat:** `Accueil > À Propos`

### Page Blog (Liste)

```tsx
// src/app/blog/page.tsx
import { Breadcrumb } from '@/components/Breadcrumb';

export default function BlogPage() {
  return (
    <main className="container">
      <Breadcrumb />

      <h1>Blog</h1>
      {/* Articles */}
    </main>
  );
}
```

**Résultat:** `Accueil > Blog`

### Page Article (Dynamique)

```tsx
// src/app/blog/[slug]/page.tsx
import { Breadcrumb } from '@/components/Breadcrumb';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: article.title, href: `/blog/${params.slug}` }
  ];

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />

      <article>
        <h1>{article.title}</h1>
        {/* Contenu */}
      </article>
    </main>
  );
}
```

**Résultat:** `Accueil > Blog > Titre de l'Article`

### Page Admin (Avec Sous-Pages)

```tsx
// src/app/admin/blog/edit/[slug]/page.tsx
import { Breadcrumb } from '@/components/Breadcrumb';

export default function AdminEditPage({ params }: { params: { slug: string } }) {
  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'Blog', href: '/admin/blog' },
    { label: 'Éditer', href: `/admin/blog/edit/${params.slug}` }
  ];

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />

      {/* Contenu */}
    </main>
  );
}
```

**Résultat:** `Accueil > Admin > Blog > Éditer`

---

## ✅ Checklist d'Intégration

Pour chaque page:

- [ ] Importer le composant `Breadcrumb`
- [ ] L'ajouter en haut du contenu principal
- [ ] Tester l'affichage (vérifier les labels)
- [ ] Tester les liens (navigation fonctionnelle)
- [ ] Vérifier le responsive (mobile)
- [ ] Vérifier le Schema.org (Google Rich Results Test)

---

## 🧪 Tests

### Test Visuel
1. Ouvrir la page dans le navigateur
2. Vérifier que le breadcrumb s'affiche correctement
3. Tester tous les liens
4. Tester en responsive (mobile, tablette)

### Test Schema.org
1. Aller sur https://search.google.com/test/rich-results
2. Entrer l'URL de votre page
3. Vérifier que `BreadcrumbList` est détecté
4. Vérifier qu'il n'y a pas d'erreurs

### Test Accessibilité
1. Naviguer avec Tab (clavier uniquement)
2. Vérifier que tous les liens sont focusables
3. Tester avec un lecteur d'écran (NVDA/JAWS)
4. Vérifier les ARIA labels

---

## 📊 Impact SEO

### Avant (Sans Breadcrumb)
- ❌ Pas de données structurées breadcrumb
- ❌ Navigation peu claire
- ❌ Profondeur de page mal définie

### Après (Avec Breadcrumb)
- ✅ Schema.org BreadcrumbList
- ✅ Affichage dans les SERPs Google
- ✅ Meilleure compréhension de la structure
- ✅ Amélioration du CTR (taux de clic)

### Exemple de Résultat Google
```
Smidjan › Blog › Développement Web Moderne
https://smidjan.be/blog/developpement-web-moderne
Guide complet sur le développement web en 2025...
```

---

## 🐛 Dépannage

### Le breadcrumb ne s'affiche pas
- Vérifier que vous n'êtes pas sur `/` (masqué sur l'accueil)
- Vérifier l'import du composant
- Vérifier la structure du layout

### Les labels sont incorrects
- Mettre à jour `ROUTE_LABELS` dans `Breadcrumb.tsx`
- Ou passer des `items` personnalisés

### Les liens ne fonctionnent pas
- Vérifier les `href` dans les items
- Vérifier que Next.js Link est utilisé

### Le Schema.org n'est pas détecté
- Vérifier dans Google Rich Results Test
- Vérifier que `itemScope` et `itemProp` sont présents
- Attendre l'indexation (peut prendre quelques jours)

---

## 📚 Ressources

- **Composant:** `src/components/Breadcrumb/Breadcrumb.tsx`
- **Styles:** `src/components/Breadcrumb/Breadcrumb.module.css`
- **Schema.org:** https://schema.org/BreadcrumbList
- **Google Guide:** https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

---

## 🎯 Prochaines Étapes

1. ✅ Créer le composant Breadcrumb
2. ✅ Ajouter Schema.org
3. ✅ Styliser pour dark theme
4. 🔄 Intégrer dans toutes les pages (en cours)
5. ⏳ Tester et valider
6. ⏳ Déployer en production

---

**Besoin d'aide?** Consultez ce guide ou demandez de l'assistance! 🚀
