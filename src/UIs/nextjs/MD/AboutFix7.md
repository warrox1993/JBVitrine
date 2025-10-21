Voici le `.md` à transmettre à **Codex** pour créer la nouvelle section de la page **About**, avec les mêmes *cards* visuelles que celles de la section **“Services / Excellence”** sur la **Home page**, tout en gardant la cohérence des couleurs, espacements et animations du design actuel :

---

````markdown
# 🧱 TASK — CREATE "VALUES CARDS" SECTION IN ABOUT PAGE

## 🎯 Goal

Add a **3-card grid section** to the **About page**, reusing the **same card component** and **styling** as the “Excellence / Services” section from the Home page.  
The purpose is to visually emphasize the agency’s three core values: **Rigor, Clarity, and Impact.**

---

## 🔧 Implementation Details

### 1. Component Reuse
- Reuse the **ServiceCard** or **ExcellenceCard** component from the Home page.
- Maintain the same layout, spacing, radius, background gradient, hover effect, and typography.
- If necessary, extract the component into `/components/sections/shared/ValueCard.tsx` for reusability.

### 2. Section Structure
Place this section **below the “About SMIDJAN” hero text block** and **before any timeline or team content**.

```html
<section class="values-section">
  <h2 class="section-title">Our Core Values</h2>
  <div class="card-grid">
    <!-- Card 1 -->
    <ValueCard
      title="Rigor"
      description="Each project is documented, tested, and measured. There’s no room for approximation."
    />
    <!-- Card 2 -->
    <ValueCard
      title="Clarity"
      description="We design systems where every decision leaves a trace. Users never get lost."
    />
    <!-- Card 3 -->
    <ValueCard
      title="Impact"
      description="Success is measured through tangible results — performance, engagement, visibility, conversion."
    />
  </div>
</section>
````

### 3. Styling Guidelines

* Match **colors** and **gradient tokens** from the *Excellence* cards:

    * Title color: `var(--color-accent-text)`
    * Background gradient: same as the Home “Services / Excellence” cards
    * Text color: `var(--color-text-secondary)`
* Ensure hover animation, shadow, and transition timing (ease-in-out, 300–400ms) match the Home section.

### 4. Responsive Layout

* Use the same grid system (3 columns desktop → 1 column mobile).
* Respect spacing tokens (`--space-xl` vertical padding, `--space-l` between cards).
* Maintain consistent margins between hero text and this new section.

### 5. Section Title

* Heading: `Our Core Values`
* Alignment: centered
* Color: same gradient as “Exceptional Design” headline (Home hero).

---

## ✅ Acceptance Criteria

* [ ] Section visually identical in style to the Home “Services / Excellence” cards.
* [ ] Cards correctly aligned and responsive across all screen sizes.
* [ ] Colors and hover animations consistent with the design system.
* [ ] The About page now flows naturally from hero → values → timeline/team.

---

## 📂 Files likely involved

* `src/app/about/page.tsx` (or equivalent)
* `src/components/sections/shared/ValueCard.tsx`
* `src/styles/components/cards.css` (or the corresponding Tailwind classes)
* Global tokens in `globals.css` for colors and spacing

---

```

Souhaites-tu que j’ajoute une **variant .fr** dans le même `.md` (pour internationalisation i18n) ou qu’on garde uniquement la version anglaise pour l’instant ?
```
