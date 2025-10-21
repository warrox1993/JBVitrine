````markdown
# SMIDJAN — ABOUT_SECTION_LAYOUT_FIX.md
**Contexte :** La page `/about` affiche toutes les parties “à la suite” sans respecter la **structure par sections** utilisée sur la **Home** (rythme vertical, alternance des fonds, containers, grilles).  
**Objectif :** réaligner `/about` sur le **pattern de sectionnement** de la Home, sans changer la charte (tokens, couleurs, typo), ni la sidebar, ni le contenu.

---

## 0) Règles non négociables
- **Zéro refonte visuelle** : on **réutilise** exactement les mêmes classes/utilitaires que la Home.
- **Un seul système de sections** : `section.section > .container > …` avec **padding vertical clampé**, **max-width du texte**, **alternance de fond** via la classe prévue.
- **Ancrage** : chaque section garde son `id` existant pour la sidebar.
- **Aucune duplication CSS** : si une classe Home existe, on l’emploie telle quelle.

---

## 1) Référence — Pattern de la Home (source de vérité)
Recopier le **pattern exact** utilisé sur la Home (noms indicatifs, à lire dans le code Home) :

```html
<section class="section [is-alt]?">
  <div class="container">
    <!-- grid/stack -->
  </div>
</section>
````

**Rappels Home**

* `section.section { padding-block: clamp(6rem, 8vw, 10rem); }`
* `.container { width: min(100%, var(--container-max)); margin-inline: auto; padding-inline: var(--container-pad); }`
* Variantes d’arrière-plan (ex.) :

    * `.is-alt` : couche plus sombre/plus claire + léger overlay
    * `.has-slope` / `.with-wave` si utilisé dans le hero/footer
* Largeur de texte : `.prose { max-width: 70ch; line-height: 1.7; }`
* Grille cartes : `.grid-2`, `.grid-3` (gap = `var(--space-4|6)`)

> Si ces classes ont d’autres noms dans la Home, **reprendre exactement ces noms**.

---

## 2) Implémentation — Réappliquer le pattern à `/about`

Réécrire la page en **composants sectionnés**, en copiant l’ordre final suivant (IDs inchangés) :

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next';
import HeroAbout from '@/components/about/HeroAbout';
import Mission from '@/components/about/Mission';
import Story from '@/components/about/Story';
import Values from '@/components/about/Values';
import Team from '@/components/about/Team';
import ProcessMini from '@/components/about/ProcessMini';
import Proof from '@/components/about/Proof';
import CTA from '@/components/about/CTA';

export const metadata: Metadata = {
  title: 'À propos — SMIDJAN',
  description: 'SMIDJAN forge des expériences digitales élégantes, scalables et mesurables.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <main id="about-hero">
      {/* HERO */}
      <section className="section hero dark-gradient">
        <div className="container">
          <HeroAbout />
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="section">
        <div className="container">
          <Mission />
        </div>
      </section>

      {/* STORY (ALTERNANCE) */}
      <section id="story" className="section is-alt">
        <div className="container">
          <Story />
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="section">
        <div className="container">
          <Values />
        </div>
      </section>

      {/* TEAM (ALTERNANCE) */}
      <section id="team" className="section is-alt">
        <div className="container">
          <Team />
        </div>
      </section>

      {/* PROCESS MINI */}
      <section id="process-mini" className="section">
        <div className="container">
          <ProcessMini />
        </div>
      </section>

      {/* PROOF (ALTERNANCE) */}
      <section id="proof" className="section is-alt">
        <div className="container">
          <Proof />
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="section">
        <div className="container">
          <CTA />
        </div>
      </section>
    </main>
  );
}
```

> Si la Home utilise d’autres classes d’alternance (ex. `.bg-1` / `.bg-2`), **remplacer `is-alt` par celles de la Home**.

---

## 3) Correctifs CSS minimaux (uniquement si manquants)

Ne créer ces règles **que si** elles existent déjà dans la Home sous ces noms. Sinon, **importer les vraies classes depuis la Home**.

```css
/* Vertical rhythm (déjà présent sur la Home) */
.section { padding-block: clamp(6rem, 8vw, 10rem); }

/* Container (identique Home) */
.container {
  width: min(100%, var(--container-max, 1200px));
  margin-inline: auto;
  padding-inline: var(--container-pad, 1.25rem);
}

/* Alternance de fond – s’aligner sur la Home */
.section.is-alt {
  background: var(--color-bg-2);
}

/* Texte long */
.prose { max-width: 70ch; line-height: 1.7; }
```

---

## 4) Intégration des composants (exemples)

Appliquer **à l’intérieur** des sections les mêmes patterns de la Home :

* **Grille cartes (Values/Proof/Team)**
  Utiliser les classes de la Home (ex. `.grid-3` ou `.cards`) :

  ```html
  <div class="cards grid-3">
    <!-- cartes -->
  </div>
  ```

* **Texte long (Mission/Story)**
  Envelopper dans `.prose` pour limiter la largeur :

  ```html
  <div class="prose">
    <!-- paragraphes -->
  </div>
  ```

* **Hero**
  Réutiliser la classe `hero` et le fond gradient de la Home (`dark-gradient` + éventuel overlay/grain).

---

## 5) Ancrage & Sidebar

* Les **IDs** d’ancre sont sur **les sections** (`id="mission"`, `id="story"`, etc.).
* La **sidebar** About pointe vers ces IDs (déjà configurée).
* **Offset sticky** : conserver la même utilité de scroll que la Home (pas de décalage au clic).

---

## 6) Causes probables du problème (à corriger)

* Contenu rendu **sans wrapper** `.section`/`.container`.
* Alternance de fond **non appliquée** (classe manquante).
* Composants About **rendent des `<div>` “pleine largeur”** au lieu de suivre le pattern Home.
* CSS local dans About **override** le padding global (à supprimer).

---

## 7) Tests d’acceptation

* [ ] Chaque bloc visuel de `/about` est dans **`section.section > .container`**.
* [ ] **Alternance** visible 1/2/3… (Hero fond gradient, puis clair/sombre en quinconce comme la Home).
* [ ] **Espacement vertical** identique à la Home (mesurer le padding-block au DevTools).
* [ ] **Largeur de texte** limitée (~70ch) pour les paragraphes (Mission/Story).
* [ ] **Cartes** alignées sur les grilles Home (mêmes gaps/radius/ombres).
* [ ] Aucun **style dupliqué** : tout provient des feuilles Home.
* [ ] Sidebar : le clic sur chaque item **scroll** proprement sur la section correspondante (sans “saut”).
* [ ] Lighthouse : aucune régression LCP/CLS par rapport à la Home.

---

## 8) Journal de commits attendu

1. `refactor(about): wrap sections with home pattern (section > container) and alternate backgrounds`
2. `ui(about): align grids, prose width and hero gradient with home`
3. `fix(about): ensure anchors on section wrappers for sidebar accuracy`
4. `test(about): verify vertical rhythm parity and smooth scroll`

---

## 9) Résultat attendu

La page **About** présente un **rythme visuel identique** à la Home : mêmes blocs, mêmes espacements, même alternance, même conteneur.
Plus rien “à la suite” en pleine largeur — tout est **sectionné, lisible, et cohérent** avec le design système.

```
```
