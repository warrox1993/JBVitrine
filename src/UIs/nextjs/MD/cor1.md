---

# 🧹 HERO FIX — Suppression du badge “✨ Transforming Digital Experiences”

## 🎯 Objectif

Éliminer la ligne décorative supérieure du hero qui affiche :
> ✨ Transforming Digital Experiences

## 🧩 Détails techniques

- Supprimer complètement le composant ou élément correspondant (souvent un `<span>`, `<Badge>` ou `<p>`).
- Vérifier que la section principale (`<h1>` ou son conteneur) conserve un **alignement vertical et une marge supérieure cohérente** après suppression.
- Ajuster les marges ou le `gap` du container parent (`flex`, `grid` ou `stack`) si nécessaire pour éviter un vide visuel.

## ✅ À vérifier après modification

1. L’en-tête principal **“Design Exceptionnel, Code Impeccable, Résultats Mesurables”** reste centré verticalement dans le viewport.
2. Le contraste et le spacing entre le titre, le texte descriptif et les boutons sont conservés.
3. Aucun artefact visuel (ligne fantôme, padding résiduel, espace vide) ne subsiste à l’emplacement du badge.

---

### Exemple de correctif CSS (si le badge est un élément identifiable)

```css
.hero-badge {
  display: none;
}
```

### Exemple JSX/HTML (si présent dans le composant Hero)

```jsx
{/* ❌ Supprimer cette ligne */}
<span className="hero-badge">✨ Transforming Digital Experiences</span>
```

---

📍 **Note de style :**
La suppression du badge rend le hero plus sobre et professionnel, en concentrant l’attention sur le message principal et les CTA.  
Tu pourras envisager plus tard d’y ajouter une **accroche plus spécifique à ta marque** (ex. “Expertise web & IA depuis Liège”) pour conserver une touche d’identité sans artifice visuel.



# HERO — Ajuster la hauteur et animer le fond

## 1) Hauteur du hero: -10 px

### Option A — CSS classique
- Si ton hero prend tout le viewport (ex: `min-height: 100vh`), remplace par:
```css
.hero {
  /* ancien: min-height: 100vh; */
  min-height: calc(100vh - 10px);
}
```

- Si la hauteur vient des paddings:
```css
.hero {
  /* exemple: */
  padding-top: calc(var(--hero-pt, 120px) - 5px);
  padding-bottom: calc(var(--hero-pb, 120px) - 5px);
}
```

### Option B — Tailwind
- Si tu utilises `min-h-screen`, passe à:
```html
<section class="min-h-[calc(100vh-10px)] ..."> … </section>
```
- Ou réduis les paddings (ex: `py-32` → `py-[calc(theme(space.32)-5px)]`).

> Point d’attention: vérifie la rupture mobile. Si tu utilises déjà une valeur spécifique côté mobile, applique la réduction de 10 px à chaque breakpoint concerné.

---

## 2) Animation de fond du hero (douce et performante)

Objectif: mouvement subtil en continu, sans jank, en n’animant que des propriétés GPU-friendly (transform, opacity, filter). On encapsule l’animation dans un pseudo-élément pour ne pas impacter le layout.

### CSS (agnostique framework)
```css
/* Couche d'arrière-plan dédiée à l'animation */
.hero {
  position: relative;
  isolation: isolate; /* évite les fuites de blending */
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  inset: -20%;
  z-index: -1;
  pointer-events: none;

  /* Exemple: gradient + léger bruit pour casser les bandes */
  background:
    radial-gradient(60% 80% at 20% 30%, rgba(200, 120, 255, 0.25), transparent 60%),
    radial-gradient(50% 70% at 80% 70%, rgba(120, 80, 220, 0.25), transparent 60%),
    linear-gradient(180deg, rgba(10,10,20,0.8), rgba(10,10,20,0.9));

  filter: blur(24px);
  opacity: 0.9;

  /* Animation continue et douce */
  animation: heroFloat 22s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

/* Mouvement lent: translation + rotation légère */
@keyframes heroFloat {
  0%   { transform: translate3d(-2%, -1%, 0) rotate(-0.75deg) scale(1.05); opacity: 0.88; }
  50%  { transform: translate3d( 1%,  1%, 0) rotate( 0.5deg)  scale(1.08); opacity: 0.92; }
  100% { transform: translate3d( 3%, -2%, 0) rotate(-0.25deg) scale(1.06); opacity: 0.90; }
}

/* Accessibilité: désactiver l’animation si l’utilisateur le demande */
@media (prefers-reduced-motion: reduce) {
  .hero::before {
    animation: none;
    transform: none;
  }
}
```

### Tailwind (si nécessaire)
- Ajoute les keyframes et animations dans `tailwind.config.js`:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        heroFloat: {
          '0%':   { transform: 'translate3d(-2%,-1%,0) rotate(-0.75deg) scale(1.05)', opacity: '0.88' },
          '50%':  { transform: 'translate3d(1%,1%,0) rotate(0.5deg) scale(1.08)',  opacity: '0.92' },
          '100%': { transform: 'translate3d(3%,-2%,0) rotate(-0.25deg) scale(1.06)', opacity: '0.90' },
        },
      },
      animation: { heroFloat: 'heroFloat 22s ease-in-out infinite alternate' },
    },
  },
};
```
- Dans le composant:
```html
<section class="relative overflow-hidden isolate">
  <div class="pointer-events-none absolute -inset-[20%] -z-10 animate-heroFloat blur-2xl opacity-90"
       style="background:
         radial-gradient(60% 80% at 20% 30%, rgba(200,120,255,0.25), transparent 60%),
         radial-gradient(50% 70% at 80% 70%, rgba(120,80,220,0.25), transparent 60%),
         linear-gradient(180deg, rgba(10,10,20,0.8), rgba(10,10,20,0.9));">
  </div>
  <!-- contenu -->
</section>
```

> Teste les perf avec Lighthouse ou Performance panel. Si besoin, baisse `blur` ou l’opacité.

---

# FOOTER — Réseaux sociaux avec liens réels

## 3) Ajouter Facebook, Instagram, Discord, GitHub, LinkedIn, X

### Structure recommandée (Next.js / React)
- Centraliser les URLs dans une config unique. Si tu me fournis tes vraies URLs, remplace les placeholders ci-dessous.

```ts
// src/config/social.ts
export const socialLinks = {
  facebook:  "https://www.facebook.com/REPLACE_WITH_YOUR_PAGE",
  instagram: "https://www.instagram.com/REPLACE_WITH_YOUR_PROFILE",
  discord:   "https://discord.gg/REPLACE_WITH_INVITE",
  github:    "https://github.com/REPLACE_WITH_ACCOUNT_OR_ORG",
  linkedin:  "https://www.linkedin.com/in/REPLACE_WITH_PROFILE", // ou /company/
  x:         "https://x.com/REPLACE_WITH_HANDLE"
} as const;
```

```tsx
// src/components/FooterSocial.tsx
import Link from "next/link";
import { socialLinks } from "@/config/social";

const items = [
  { key: "facebook", label: "Facebook", href: socialLinks.facebook,  icon: FacebookIcon },
  { key: "instagram",label: "Instagram",href: socialLinks.instagram, icon: InstagramIcon },
  { key: "discord",  label: "Discord",  href: socialLinks.discord,   icon: DiscordIcon },
  { key: "github",   label: "GitHub",   href: socialLinks.github,    icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", href: socialLinks.linkedin,  icon: LinkedinIcon },
  { key: "x",        label: "X",        href: socialLinks.x,         icon: XIcon },
];

export default function FooterSocial() {
  return (
    <nav aria-label="Réseaux sociaux" className="flex items-center gap-4">
      {items.map(({ key, label, href, icon: Icon }) => (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/10 hover:ring-white/30 transition"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}

/* Icônes SVG minimalistes (aucune lib requise) */
function GithubIcon(props: any){ return (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.19-3.37-1.19-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.01.07 1.55 1.04 1.55 1.04.9 1.54 2.36 1.09 2.94.83.09-.66.35-1.09.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>
  </svg>
); }
function LinkedinIcon(props: any){ return (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.06c.53-.95 1.82-1.95 3.74-1.95 4 0 4.74 2.63 4.74 6.05V21h-4v-5.35c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.06 1.39-2.06 2.8V21H9z"/>
  </svg>
); }
function FacebookIcon(props: any){ return (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.56 9.9v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.9h-2.34v7A10 10 0 0 0 22 12z"/>
  </svg>
); }
function InstagramIcon(props: any){ return (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.75 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
  </svg>
); }
function DiscordIcon(props: any){ return (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 4a18 18 0 0 0-4.5-1l-.22.44A13.2 13.2 0 0 1 12 4.1a13 13 0 0 1-3.28-.66L8.5 3A18 18 0 0 0 4 4C1.78 7.43 1 10.76 1 14c0 0 1.64 2.77 6 3a4.5 4.5 0 0 0 1.24-1.57c-.68-.26-1.47-.7-2.2-1.33 1.45 1.06 3.15 1.72 6.96 1.72s5.51-.66 6.96-1.72c-.73.63-1.52 1.07-2.2 1.33A4.5 4.5 0 0 0 17 17c4.36-.23 6-3 6-3 0-3.24-.78-6.57-3-10zM8.75 13.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm6.5 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/>
  </svg>
); }
function XIcon(props: any){ return (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.98 3H20l-6.5 7.43L21 21h-6.02l-4.71-5.86L4.86 21H2l7.2-8.23L3 3h6.11l4.2 5.43L16.98 3zM8.3 4.5H5.6l10.21 13h2.67L8.3 4.5z"/>
  </svg>
); }
```

- Utilisation dans le footer:
```tsx
// src/components/Footer.tsx
import FooterSocial from "@/components/FooterSocial";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
        <p className="text-sm text-white/60">© {new Date().getFullYear()} VotreBrand. Tous droits réservés.</p>
        <FooterSocial />
      </div>
    </footer>
  );
}
```

### Vérifications
1. Tous les liens ouvrent en nouvel onglet (`target="_blank"`, `rel="noopener noreferrer"`).
2. Les icônes ont des `aria-label` pour l’accessibilité.
3. Le contraste des icônes en hover reste AA sur le fond actuel.

---

## Checklist de validation

- [ ] Le badge d’accroche a bien disparu.
- [ ] La hauteur du hero est 10 px plus faible sur les viewports ciblés, sans rupture de mise en page.
- [ ] L’animation de fond est douce (aucun à-coup sur 60 s d’observation), et désactivée sous `prefers-reduced-motion`.
- [ ] Les liens sociaux du footer sont visibles, accessibles et pointent vers les URL réelles.

---

# NAV — Remettre l’ordre de la sidebar pour refléter l’ordre du contenu

## Objectif
Aligner l’ordre des liens de la sidebar sur l’ordre réel des sections de la page. Exigence:
1) Projets en 2e position
2) Processus en 3e position
3) Services en 4e position

> Rappel accessibilité: l’ordre visuel du menu doit suivre l’ordre logique du document. Cela facilite la navigation clavier, les lecteurs d’écran et le “scroll-spy”.

## Source de vérité unique
Centraliser la config de navigation et des ancres pour éviter les divergences.

```ts
// src/config/nav.ts
export const sections = [
  { id: "hero",     label: "Accueil",   href: "#hero" },        // 1
  { id: "projects", label: "Projets",   href: "#projects" },    // 2
  { id: "process",  label: "Processus", href: "#process" },     // 3
  { id: "services", label: "Services",  href: "#services" },    // 4
  { id: "contact",  label: "Contact",   href: "#contact" },     // 5
] as const;
```

## Sidebar — utiliser la config (et non un ordre en dur)
```tsx
// src/components/Sidebar.tsx
import Link from "next/link";
import { sections } from "@/config/nav";

export default function Sidebar() {
  return (
    <nav aria-label="Navigation latérale" className="flex flex-col gap-2">
      {sections.map(s => (
        <Link key={s.id}
              href={s.href}
              className="sidebar-link"
              data-section={s.id}>
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
```

## Body — sections dans le même ordre
```tsx
// src/app/page.tsx (extrait)
<section id="hero" className="section">…</section>
<section id="projects" className="section">…</section>
<section id="process" className="section">…</section>
<section id="services" className="section">…</section>
<section id="contact" className="section">…</section>
```

## Scroll-spy et aria-current (facultatif mais recommandé)
```ts
// src/hooks/useScrollSpy.ts
export function useScrollSpy(ids: string[], offset = 120) {
  // IntersectionObserver pour marquer le lien actif
}
```

```tsx
// src/components/Sidebar.tsx (idéal)
const activeId = useScrollSpy(sections.map(s => s.id));

<Link
  aria-current={activeId === s.id ? "page" : undefined}
  className={clsx("sidebar-link", activeId === s.id && "is-active")}
/>
```

## Tests manuels
- Tabulation: l’ordre de focus suit Accueil → Projets → Processus → Services → Contact.
- Lecteur d’écran (NVDA/VoiceOver): la liste de liens est annoncée dans cet ordre.
- Le clic sur chaque lien amène bien à la section correspondante; le “retour arrière” restaure l’ancre correcte dans l’URL.

## Checklist
- [ ] La sidebar consomme `src/config/nav.ts`.
- [ ] Projets est bien 2e; Processus 3e; Services 4e.
- [ ] L’ordre visuel = ordre DOM = ordre du contenu.
- [ ] `aria-current="page"` est appliqué au lien actif (optionnel mais conseillé).

---
