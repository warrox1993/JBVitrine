# PROMPT MAÎTRE — **Ajout du mode clair (ADD‑ON)** pour le site SMIDJAN

> Objectif : **ajouter** un thème clair cohérent, **sans modifier AUCUNE couleur** du thème sombre actuel. Le dark mode reste la référence et doit être pixel‑identique après livraison. Le light mode est injecté **uniquement** via un second set de variables CSS et un switch `data-theme`.

---

## 1) Règles intangibles

* **NE PAS toucher** aux couleurs, gradients, ombres, rayons, espacements existants du **thème sombre**.
* **NE PAS refactor** global.
* **UNIQUEMENT** ajouter : variables CSS pour `light`, préférences système, toggle texte, persistance `localStorage`, anti‑flash SSR.
* Aucune icône, aucun nouvel asset. **Texte seul** pour le toggle.

---

## 2) Architecture de theming (CSS variables)

* Fichier central (ou existant) : `styles/theme.css`.
* Conserver les variables actuelles (dark) telles quelles : elles deviennent le **par défaut**.
* Ajouter un bloc `:root[data-theme="light"]` avec les équivalents clairs.
* **Interdiction** de modifier les valeurs dark existantes.

```css
:root {
  /* DARK — valeurs ACTUELLES (exemples; NE PAS CHANGER) */
  --bg: #0b0f14;
  --surface: #121821;
  --surface-2: #0f141b;
  --text: #e8edf4;
  --text-muted: #b5c0cf;
  --border: rgba(255,255,255,.08);
  --accent: #ff8a2a;
  --accent-contrast: #20160f;
  /* radius/space/shadows existants */
}

/* LIGHT — AJOUT UNIQUEMENT */
:root[data-theme="light"] {
  --bg: #ffffff;
  --surface: #f7f9fc;   /* surfaces cartes */
  --surface-2: #eef2f8; /* blocs accent */
  --text: #0b0f14;
  --text-muted: #4a5565;
  --border: rgba(10,15,20,.10);
  --accent: #e86e10;     /* orange ajusté pour lisibilité sur clair */
  --accent-contrast: #ffffff;
}
```

> Si d’autres tokens existent (success/warn/info), **dupliquer** en version claire **sans** toucher aux valeurs sombres.

---

## 3) Application globale (SSR + anti‑flash)

Dans le layout racine (`app/layout.tsx` ou `_document.tsx` selon stack), injecter **avant paint** :

```html
<script>
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) { document.documentElement.setAttribute('data-theme','dark'); }
})();
</script>
```

* Par défaut : `dark`.
* Si préférence système light et aucun choix stocké → `light`.
* **Aucun flash** : le script précède tout CSS asynchrone.

---

## 4) Toggle dans la navbar (texte seul)

* Bouton texte : `Thème : Clair` / `Thème : Sombre`.
* Même style que les autres liens (tokens).
* Accessibilité : `aria-pressed`.

```ts
function toggleTheme(){
  const el = document.documentElement;
  const next = el.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  el.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch {}
}
```

> **Ne pas** ajouter d’icône. Pas de nouvelle dépendance.

---

## 5) Mapping sémantique (raccord composants)

S’assurer que tous les composants utilisent les variables (pas de couleurs en dur) :

* Page/bg : `background: var(--bg)`
* Cards/sections : `background: var(--surface)` ; `border-color: var(--border)`
* Titres/texte : `color: var(--text)` ; muted → `var(--text-muted)`
* Bouton primaire : `background: var(--accent)` ; `color: var(--accent-contrast)`
* Bouton secondaire : bordure `var(--border)` ; hover `var(--surface-2)`
* Inputs/accordéons/tabs : mêmes surfaces & bordures
* Gradients existants : **inchangés en dark** ; en light, si superposition de texte, ajuster l’overlay via variable (opacity) sans toucher à la palette dark.

---

## 6) Accessibilité et QA

* Contrastes WCAG AA vérifiés pour `--text` sur `--bg` et boutons primaires/secondaires.
* Focus visibles dans les deux thèmes.
* Tester pages : Home, À propos, Produit CMS, Contact, Mentions.
* Tester composants : Navbar, Sidebar, Cards, Accordéons, Formulaires, Toasts.

---

## 7) Non‑régressions (à cocher)

* [ ] Aucune valeur **dark** modifiée.
* [ ] Pas de flash au chargement.
* [ ] Tous les composants basculent via variables.
* [ ] Pas de couleur en dur résiduelle.
* [ ] Le site en dark est **strictement** identique au build actuel.
* [ ] Choix utilisateur persisté et relu correctement.

---

## 8) Plan de livraison

1. Ajouter bloc `:root[data-theme="light"]` avec variables claires.
2. Injecter script anti‑flash + lecture `localStorage`.
3. Ajouter le toggle texte dans la navbar.
4. Passer en revue les composants pour brancher les tokens.
5. QA contrastes + responsive.
6. Merge.

---

## 9) Commit attendu

`feat(theme): add light mode as addon (no changes to dark palette)`
