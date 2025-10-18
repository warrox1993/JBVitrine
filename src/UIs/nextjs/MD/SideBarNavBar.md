T’as raison : on passe en **Next.js (App Router)**, sans Tailwind, en gardant **strictement le même rendu et le même comportement** (hover-only, pas de JS).
Voici un `.md` clé-en-main pour Codex, avec l’arborescence, les composants, le layout et le CSS exacts.

---

```markdown
# 🧭 PROJECT SPEC — Next.js App Router: Sidebar + Navbar (CSS-only, identical visual)

## 🎯 Objective
Adapter la **sidebar** et la **navbar** au **Next.js App Router** en conservant **exactement** le même rendu et le même comportement (expansion de la sidebar au `:hover`, header décalé via le sélecteur-frère `:hover ~ header`).

**Contraintes strictes :**
- **Zéro** changement visuel.
- **Zéro** JavaScript pour l’interaction (tout en CSS).
- Conserver les **variables**, transitions, couleurs, espacements.
- L’ordre DOM **Sidebar → Header → Main** est impératif pour que `:hover ~ header` et `:hover ~ main` fonctionnent.

---

## 📁 Project Structure (App Router)

Créer/mettre à jour les fichiers suivants :

```

app/
layout.tsx
globals.css
page.tsx            // page d'exemple
components/
Sidebar.tsx
Header.tsx

````

> Si le projet existant a déjà `globals.css` et `layout.tsx`, MERGE avec précaution (ne pas altérer les parties non liées).

---

## 🧩 Components

### `components/Sidebar.tsx`
```tsx
// components/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-icon">V</div>
        <span className="sidebar-brand-text">VotreBrand</span>
      </div>

      <nav className="sidebar-nav" aria-label="Navigation latérale">
        <a href="#accueil" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span className="sidebar-link-text">Accueil</span>
        </a>

        <a href="#services" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span className="sidebar-link-text">Services</span>
        </a>

        <a href="#process" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span className="sidebar-link-text">Processus</span>
        </a>

        <a href="#projets" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span className="sidebar-link-text">Projets</span>
        </a>

        <a href="#contact" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span className="sidebar-link-text">Contact</span>
        </a>
      </nav>
    </aside>
  );
}
````

### `components/Header.tsx`

```tsx
// components/Header.tsx
export default function Header() {
  return (
    <header>
      <nav className="header-nav" aria-label="Navigation principale (haut)">
        <a href="#projets" className="header-link">Work</a>
        <a href="#services" className="header-link">Services</a>
        <a href="#process"  className="header-link">Process</a>
        <a href="#contact"  className="header-link">Contact</a>
      </nav>
    </header>
  );
}
```

---

## 🧱 Layout

### `app/layout.tsx`

> Important : l’ordre **Sidebar → Header → Main** est respecté, ce qui permet à la règle CSS `:hover ~ header`/`:hover ~ main` d’opérer.

On utilise `next/font/google` pour Inter (même police que la version HTML originale).

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Consultant Full Stack | Création Web, Cybersécurité & Automatisation",
  description: "Site vitrine — sidebar/nav identiques à la maquette d'origine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* L'ordre est CRITIQUE pour les sélecteurs frères */}
        <Sidebar />
        <Header />
        <main>{children}</main>
        {/* Footer optionnel ici si besoin */}
      </body>
    </html>
  );
}
```

### `app/page.tsx` (page d’exemple)

```tsx
// app/page.tsx
export default function Page() {
  return (
    <>
      <section id="accueil" style={{ minHeight: "100vh", paddingTop: "80px" }}>
        <div style={{ padding: "48px" }}>
          <h1>Accueil</h1>
          <p>Contenu de démonstration…</p>
        </div>
      </section>

      <section id="services" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Services</h2>
          <p>…</p>
        </div>
      </section>

      <section id="process" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Process</h2>
          <p>…</p>
        </div>
      </section>

      <section id="projets" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Projets</h2>
          <p>…</p>
        </div>
      </section>

      <section id="contact" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Contact</h2>
          <p>…</p>
        </div>
      </section>
    </>
  );
}
```

---

## 💅 Styles

### `app/globals.css`

> **Copie conforme** des règles nécessaires, + offsets `main` pour suivre la sidebar comme dans ton HTML d’origine.

```css
/* ===== Design Tokens ===== */
:root {
  --bg-card: rgba(26, 26, 46, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
  --text-primary: #ffffff;
  --text-secondary: #a1a1bc;
  --accent-primary: #a855f7;
  --transition-fast: all 0.2s ease;
}

/* Reset minimal */
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; }
body { background: #0f0f1a; color: var(--text-primary); }

/* ===== Sidebar (identique) ===== */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 80px;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--glass-border);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 32px 0;
}
.sidebar:hover {
  width: 240px;
  background: rgba(26, 26, 46, 0.85);
}
.sidebar-brand {
  padding: 0 24px;
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.sidebar-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--accent-primary), #6366f1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
}
.sidebar-brand-text {
  font-weight: 700;
  font-size: 20px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.sidebar:hover .sidebar-brand-text { opacity: 1; }

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-fast);
  position: relative;
  overflow: hidden;
}
.sidebar-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--accent-primary);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}
.sidebar-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.03);
}
.sidebar-link:hover::before { transform: scaleY(1); }
.sidebar-link-icon { width: 24px; height: 24px; flex-shrink: 0; }
.sidebar-link-text {
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-weight: 500;
}
.sidebar:hover .sidebar-link-text { opacity: 1; }

/* ===== Header (identique) ===== */
header {
  position: fixed;
  top: 0;
  left: 80px;
  right: 0;
  height: 80px;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 48px;
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
}
/* Le sélecteur-frère fonctionne car l'ordre est: Sidebar ~ Header ~ Main */
.sidebar:hover ~ header,
.sidebar:hover ~ main {
  left: 240px; /* header se décale exactement comme dans la version HTML */
}

/* Header nav links */
.header-nav { display: flex; gap: 40px; align-items: center; }
.header-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: var(--transition-fast);
  position: relative;
}
.header-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}
.header-link:hover { color: var(--text-primary); }
.header-link:hover::after { width: 100%; }

/* ===== Main offset (suivre la sidebar) ===== */
main {
  margin-left: 80px;   /* position de base */
  padding-top: 80px;   /* hauteur header */
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  left: 0;
}
.sidebar:hover ~ main {
  margin-left: 240px;  /* suit l’expansion */
}

/* (Facultatif) Footer si présent, même logique */
footer {
  margin-left: 80px;
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar:hover ~ footer {
  margin-left: 240px;
}
```

---

## 🧪 Acceptance Criteria

* Rendu **visuellement identique** à la version HTML/CSS fournie.
* **Aucun** JS d’interaction : expansion **uniquement au `:hover`**.
* Le header (et `main`) **se décalent** correctement grâce au sélecteur-frère.
* L’ordre DOM est **Sidebar → Header → Main** dans `layout.tsx`.
* Les **variables CSS**, couleurs, transitions, tailles et espacements sont inchangés.

---

## ✅ Deliverables

* `components/Sidebar.tsx`, `components/Header.tsx`
* `app/layout.tsx` avec **ordre exact** des éléments
* `app/globals.css` contenant **toutes** les règles nécessaires (copie conforme)
* Page d’exemple `app/page.tsx` (peut être remplacée par le contenu réel)

**Aucune modification esthétique n’est autorisée**. Tout doit se comporter exactement comme le design d’origine (hover → 240px, header qui suit).

```

---

Parfait. Voici le **bloc additionnel** à rajouter à la suite de ton `.md`.
Il complète le fichier pour couvrir le **cas Next.js "pages/" router**, ainsi que la version utilisant `next/link` tout en gardant le même rendu visuel et comportement au `:hover`.

---

```markdown
---

## 🔄 Variante pour Next.js (Pages Router 12/13)

Si le projet utilise encore le **Pages Router** (structure `pages/`), le fonctionnement visuel et les styles restent identiques.  
Seules les importations et l’organisation des composants changent.

### 📁 Structure du projet
```

pages/
_app.tsx
index.tsx
components/
Sidebar.tsx
Header.tsx
styles/
globals.css

````

---

### 🧩 `components/Sidebar.tsx`

Même structure que la version App Router, **à l’exception de l’import de `Link`**.  
Les balises `<a>` sont remplacées par `<Link>` pour les navigations internes Next.js, tout en gardant les ancres (pour le comportement de scroll ou d’ancrage local).

```tsx
// components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-icon">V</div>
        <span className="sidebar-brand-text">VotreBrand</span>
      </div>

      <nav className="sidebar-nav" aria-label="Navigation latérale">
        <Link href="#accueil" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span className="sidebar-link-text">Accueil</span>
        </Link>

        <Link href="#services" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span className="sidebar-link-text">Services</span>
        </Link>

        <Link href="#process" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span className="sidebar-link-text">Processus</span>
        </Link>

        <Link href="#projets" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span className="sidebar-link-text">Projets</span>
        </Link>

        <Link href="#contact" className="sidebar-link">
          <svg className="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span className="sidebar-link-text">Contact</span>
        </Link>
      </nav>
    </aside>
  );
}
````

---

### 🧩 `components/Header.tsx`

```tsx
// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="header-nav" aria-label="Navigation principale">
        <Link href="#projets" className="header-link">Work</Link>
        <Link href="#services" className="header-link">Services</Link>
        <Link href="#process" className="header-link">Process</Link>
        <Link href="#contact" className="header-link">Contact</Link>
      </nav>
    </header>
  );
}
```

---

### 📄 `pages/_app.tsx`

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
```

---

### 📄 `pages/index.tsx`

```tsx
// pages/index.tsx
export default function Home() {
  return (
    <>
      <section id="accueil" style={{ minHeight: "100vh", paddingTop: "80px" }}>
        <div style={{ padding: "48px" }}>
          <h1>Accueil</h1>
          <p>Contenu de démonstration.</p>
        </div>
      </section>
      <section id="services" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Services</h2>
          <p>Exemples de section.</p>
        </div>
      </section>
      <section id="process" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Process</h2>
          <p>...</p>
        </div>
      </section>
      <section id="projets" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Projets</h2>
          <p>...</p>
        </div>
      </section>
      <section id="contact" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "48px" }}>
          <h2>Contact</h2>
          <p>...</p>
        </div>
      </section>
    </>
  );
}
```

---

### 🎨 `styles/globals.css`

Réutilise **exactement le même CSS** que la version App Router :
aucun changement de code, seulement le chemin du fichier.

---

### ⚙️ Spécificités pour le Pages Router

1. L’ordre rendu par `_app.tsx` doit toujours être :
   **Sidebar → Header → Main → Component.**

2. Le comportement `:hover ~ header` et `:hover ~ main` reste fonctionnel, car ces éléments sont au même niveau DOM.

3. `next/link` est utilisé **même pour les ancres** (`href="#section"`) afin d’uniformiser la gestion de la navigation dans Next.js.

4. Aucune dépendance, animation ou librairie supplémentaire n’est requise.

5. Les styles doivent être chargés **globalement** (pas de CSS modules).

---

## ✅ Deliverables supplémentaires (Pages Router)

* `components/Sidebar.tsx`, `components/Header.tsx`
* `pages/_app.tsx` intégrant la structure de base
* `pages/index.tsx` d’exemple (sections d’ancrage)
* `styles/globals.css` (identique au précédent)
* Résultat visuel : **strictement identique** à la maquette d’origine.

```