````markdown
# SMIDJAN — HOME SIDEBAR CLEANUP & FOOTER LINK TO ABOUT
**Contexte :** la **sidebar de la Home** ne doit lister **que** les sections **intra-page** de la Home (ancres locales).  
**Problème :** un lien “About/À propos” est apparu dans la **sidebar Home** (non souhaité).  
**Objectifs :**
1) **Supprimer** “About/À propos” de la **sidebar Home** et verrouiller la configuration pour éviter toute ré-apparition.  
2) **Relier** le lien “À propos” du **footer de la Home** vers la page `/about` (route interne Next.js), avec SEO/a11y propres.  
3) **Ne rien casser** : header global inchangé, sidebar About inchangée.

---

## 0) Règles non négociables
- **Aucune nouvelle dépendance.**
- **Pas de duplication CSS** ni de styles spécifiques “Home” vs “About” : on réutilise les mêmes tokens/classes.
- La **sidebar Home** doit **uniquement** pointer vers les IDs de sections de la Home (ex. `#hero`, `#projets`, `#processus`, `#services`, `#contact` si présents dans la page).
- Le **header** global peut conserver “About” (navigation inter-pages). Cette tâche ne le modifie pas.
- Le **footer** doit contenir un lien “À propos” → `/about` avec `next/link`.

---

## 1) Nettoyage de la sidebar Home (route `/`)
### 1.1. Valider la source d’items Home
Localiser la config d’items **Home** (exemples possibles) :
- `src/components/layout/sidebar/homeSidebar.items.ts`
- ou un tableau inline fourni à `<Sidebar />` dans la page Home.

**Exemple attendu (référence) :**
```ts
// src/components/layout/sidebar/homeSidebar.items.ts
export const homeSidebarItems = [
  { href: '#hero',       label: 'Introduction' },
  { href: '#projets',    label: 'Projets' },
  { href: '#processus',  label: 'Processus' },
  { href: '#services',   label: 'Services' },
  { href: '#contact',    label: 'Contact' }
];
````

### 1.2. Supprimer toute entrée “About/À propos”

* **Retirer** la ligne correspondante si elle existe :

```diff
- { href: '/about', label: 'À propos' }
```

* Si la Home utilisait par erreur le mapping **About** (ex. `aboutSidebarItems`) dans le bridge route→sidebar, corriger (voir §1.3).

### 1.3. Verrouiller le bridge route → items

Dans le composant qui choisit les items selon la route (ex. `SidebarRouterBridge.tsx`) :

```tsx
// SidebarRouterBridge.tsx (exemple)
'use client';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { homeSidebarItems } from '@/components/layout/sidebar/homeSidebar.items';
import { aboutSidebarItems } from '@/components/layout/sidebar/aboutSidebar.items';
import { servicesSidebarItems } from '@/components/layout/sidebar/servicesSidebar.items';

export default function SidebarRouterBridge() {
  const pathname = usePathname();

  if (pathname === '/' || pathname?.startsWith('/#')) {
    // Home = INTRA-PAGE UNIQUEMENT
    return <Sidebar items={homeSidebarItems} />;
  }
  if (pathname?.startsWith('/about')) {
    return <Sidebar items={aboutSidebarItems} />;
  }
  if (pathname?.startsWith('/services')) {
    return <Sidebar items={servicesSidebarItems} />;
  }
  return null; // autres pages : pas de sidebar, ou logique existante
}
```

> Important : s’assurer que **homeSidebarItems** ne contient **aucun lien externe** ni `/about`.

### 1.4. Icônes (si la Home en utilise)

* Vérifier que la Home **n’affiche des icônes** que pour ses **ancres locales**.
* **Ne pas** réintroduire d’icône pour About dans la config Home.

---

## 2) Lien “À propos” dans le footer → `/about`

### 2.1. Mettre à jour le composant Footer

Localiser le composant (ex. `src/components/layout/Footer.tsx`) et ajouter/mettre à jour le lien “À propos”.

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav aria-label="Liens de pied de page" className="footer-nav">
        <ul>
          <li><Link href="/projets">Projets</Link></li>
          <li><Link href="/processus">Processus</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/about">À propos</Link></li> {/* <- IMPORTANT */}
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      {/* reste du footer… */}
    </footer>
  );
}
```

* Utiliser `next/link` (pas de balise `<a>` brute avec `href` absolu).
* Conserver les classes/tokens existants pour le style (pas de CSS ad hoc).

### 2.2. Accessibilité & SEO

* Le `<nav>` du footer doit avoir `aria-label="Liens de pied de page"`.
* Le texte du lien doit être **clair** : “À propos”.
* Pas d’attributs `target="_blank"` pour une route interne.

---

## 3) Vérifications de régression

### 3.1. Sidebar Home

* Home `/` : la sidebar n’affiche **que** des **ancres #** intra-page, **sans** “À propos”.
* Les clics scrollent avec **smooth scroll** et **offset** respectant le header sticky.
* L’**item actif** (IntersectionObserver) se met à jour correctement.

### 3.2. Sidebar About / Services

* `/about` : la sidebar **conserve** ses items et **ses icônes** (si déjà intégrées).
* `/services` : inchangé.

### 3.3. Footer

* Sur **toutes** les pages, le lien “À propos” du footer **ouvre** bien `/about`.
* Style/hover/focus strictement identiques aux autres liens du footer.
* Pas de duplication CSS.

---

## 4) Tests rapides (manuels)

1. Lancer `npm run dev`, ouvrir `http://localhost:3000/`.
2. Vérifier la **sidebar Home** : aucun lien externe, pas de “À propos”.
3. Cliquer sur “À propos” dans le **footer** : navigation SSR vers `/about`.
4. Retour Home, mesurer au DevTools : la sidebar contient N items = nombre de sections Home.
5. Vérifier Lighthouse (fast check) : aucune régression SEO/Accessibilité.

---

## 5) Plan de commits

1. `fix(home-sidebar): remove About link and lock home to in-page anchors only`
2. `feat(footer): add footer link to /about with next/link`
3. `test(nav): verify sidebar routing bridge and footer links`
4. `docs: clarify rule — home sidebar is intra-page only`

---

## 6) Résultat attendu

* **Home sidebar** : navigation **intra-page uniquement**, aucune entrée “À propos ou "about"”.
* **Footer Home** : lien “À propos” mène proprement à `/about`.
* **Header global** : inchangé (peut contenir “About”).
* Aucune régression visuelle, a11y et SEO respectés.



```markdown
# SMIDJAN — CHECKLIST DE VÉRIFICATION APRÈS SUPPRESSION DU "ABOUT" DANS LA SIDEBAR HOME ET AJOUT DU LIEN FOOTER

**But :** garantir que les modifications appliquées au précédent `.md` sont stables, cohérentes et sans régression visuelle, technique ou fonctionnelle.

---

## 1) Vérification visuelle (UI/UX)
- [ ] Sidebar Home : aucun lien “À propos” ni `/about` n’apparaît dans la liste.  
- [ ] Sidebar Home : le design, les espacements et les icônes des autres sections sont **inchangés**.  
- [ ] Footer : présence d’un lien “À propos” avec le **même style**, **hover** et **focus** que les autres liens.  
- [ ] Footer : le lien “À propos” est bien aligné dans la grille ou la liste des autres liens.  
- [ ] Aucun décalage visuel ou “layout shift” n’est visible lors du chargement de la Home.  
- [ ] Le lien “À propos” est bien visible sur fond sombre (contraste AA).

---

## 2) Vérification fonctionnelle
- [ ] Le clic sur un lien de la sidebar Home déclenche un **scroll fluide** vers la bonne section (#hero, #projets, etc.).  
- [ ] Le clic sur le lien “À propos” du **footer** navigue proprement vers `/about` (sans rechargement complet).  
- [ ] Le lien `/about` fonctionne même après build (`npm run build && npm start`).  
- [ ] Le lien “À propos” du **header global** (si présent) continue de fonctionner normalement.  
- [ ] La **sidebar About** reste fonctionnelle et inchangée.  
- [ ] Le **footer** est identique sur toutes les pages (Home, About, Services).  

---

## 3) Vérification accessibilité (a11y)
- [ ] Le lien “À propos” du footer est **navigable au clavier** (tabulation).  
- [ ] Le focus est visible et cohérent (même style que les autres liens).  
- [ ] Le `aria-label="Liens de pied de page"` est bien présent sur la nav du footer.  
- [ ] Aucune erreur d’accessibilité détectée dans Lighthouse ou axe DevTools.  

---

## 4) Vérification technique (Next.js / Routing)
- [ ] Le composant `SidebarRouterBridge` renvoie bien les bons items selon la route (`/` → homeSidebarItems, `/about` → aboutSidebarItems).  
- [ ] `homeSidebarItems` ne contient aucune référence à `/about`.  
- [ ] Le composant `Footer` importe bien `next/link` pour le lien `/about`.  
- [ ] Aucun `href` absolu (ex: `http://localhost:3000/about`) n’est utilisé, seulement des routes relatives (`/about`).  
- [ ] Aucun warning Next.js dans la console (`next/link` mal formé, double clé, etc.).  

---

## 5) Vérification SEO
- [ ] Le lien “À propos” du footer est détecté par Lighthouse comme lien interne valide.  
- [ ] Aucune erreur “broken link” vers `/about`.  
- [ ] Le `canonical` de la page About est bien `http://localhost:3000/about` (ou équivalent prod).  
- [ ] La structure de navigation reste cohérente pour le crawler (Home → About via footer, OK).  

---

## 6) Vérification responsive
- [ ] Sur mobile : la sidebar Home (si masquée ou transformée en menu) ne montre pas de lien “À propos”.  
- [ ] Sur mobile : le footer reste lisible et le lien “À propos” est accessible sans overlap.  
- [ ] Sur tablette : la grille du footer ne casse pas (alignement conservé).  
- [ ] Sur desktop : hover/focus du lien “À propos” visible et fluide.  

---

## 7) Vérification post-build
- [ ] Après `npm run build` et `npm run start`, la sidebar Home charge correctement sans “hydration error”.  
- [ ] Le footer s’affiche sur toutes les routes.  
- [ ] Le lien “À propos” redirige vers `/about` **sans 404**.  
- [ ] Aucune erreur “cannot find component SidebarRouterBridge” ou “missing import” dans la console.  

---

## 8) Vérification de cohérence globale
- [ ] Home → About via footer → retour Home via header : navigation fluide, sans décalage de style.  
- [ ] Couleurs et typographie identiques entre les deux pages.  
- [ ] La suppression du lien “About” dans la sidebar Home n’a pas modifié les classes ou le DOM global.  
- [ ] Le site conserve son niveau Lighthouse initial (≥ 95).  

---

## 9) Validation finale
✅ Une fois tous les points cochés :  
- La **Home sidebar** ne contient plus de lien vers “À propos”.  
- Le **footer Home** redirige correctement vers `/about`.  
- Aucune régression visuelle, technique ou accessibilité.  

```

```
