````markdown
---
title: Move Contact Info into Global Footer (and remove from Contact page body)
owner: Frontend (Next.js + React + CSS)
scope: Site-wide Footer; remove duplicates from Contact page body
status: Ready to apply
---

## Goal

1) **Add a “Contact” block to the global Footer** (visible on every page) with the **real data**:
- Email: `jeanbaptiste.dhondt1@gmail.com`
- Phone: `+32 475205562`
- Service note: `Réponse sous 24h — 98% de satisfaction`

2) **Remove the same contact block from the Contact page body** (avoid duplication).  
The **Home page content remains read-only**; updating the **shared Footer component is allowed**.

---

## Hard constraints

- Reuse existing footer styles/tokens. **No new CSS files** unless a local module is strictly necessary; prefer existing utilities.
- Do **not** change global colors/tokens.
- Use semantic markup and accessible labels; add `mailto:` and `tel:` links.
- Do **not** duplicate this block elsewhere (Contact page body must not re-render it).

---

## Where to work (adjust paths)

- Footer component (shared):
  - `src/UIs/nextjs/src/components/sections/Footer/Footer.tsx`  
  - or `src/components/layout/Footer.tsx`
- Contact page body (to remove block):
  - App Router: `src/UIs/nextjs/src/app/contact/page.tsx`
  - Pages Router: `src/pages/contact.tsx`
- Optional footer CSS module (only if truly needed; otherwise reuse utilities):
  - `Footer.module.css`

---

## Implementation

### 1) Add the Contact block to the Footer

Insert this **Contact** sub-section inside the existing footer grid/stack. Reuse the same typographic utilities used elsewhere in the footer.

```tsx
// Footer.tsx (inside the main <footer> layout)
<section aria-labelledby="footer-contact-heading">
  <h3 id="footer-contact-heading" className="footer-heading">
    Contact
  </h3>

  <ul className="footer-list">
    <li>
      <a
        href="mailto:jeanbaptiste.dhondt1@gmail.com"
        className="footer-link"
        aria-label="Envoyer un e-mail à Jean-Baptiste Dhondt"
      >
        jeanbaptiste.dhondt1@gmail.com
      </a>
    </li>
    <li>
      <a
        href="tel:+32475205562"
        className="footer-link"
        aria-label="Appeler le numéro de téléphone"
      >
        +32 475205562
      </a>
    </li>
    <li className="footer-meta">
      Réponse sous 24h — 98% de satisfaction
    </li>
  </ul>
</section>
````

Notes:

* `footer-heading`, `footer-link`, `footer-list`, `footer-meta` should **map to existing footer utility classes**. If they don’t exist, **use the existing footer typographic/spacing utilities** already present; do not create new tokens.
* Ensure links inherit footer color/hover styles (no new color declarations).

### 2) Remove the duplicated block from the Contact page body

Delete (or comment) any section in the Contact page that repeats the email/phone/service-note. The page may keep a form and any content **other than** the direct contact details already shown in the footer.

Example:

```tsx
// contact/page.tsx (BEFORE)
<>
  <ContactHero />
  <ContactDetails />     // REMOVE this component or its email/phone/note part
  <ContactForm />
</>

// AFTER
<>
  <ContactHero />
  <ContactForm />
</>
```

If `ContactDetails` also renders other unique info, refactor it to **exclude** the three lines now in the footer.

---

## Optional (non-blocking but recommended)

* Add `rel="nofollow"` to the `tel:`/`mailto:` only if your SEO policy requires it (usually not necessary).
* Basic spam protection for email:

    * Either keep as-is (preferred for UX), or
    * **if** you already use a standard obfuscator utility elsewhere, reuse it (no new library).

---

## Acceptance tests

1. **Footer presence**: The Contact block appears in the footer on all pages (Home, About, Services, etc.).
2. **Contact page body**: No duplicate email/phone/service-note inside the Contact page content. Footer remains the single location.
3. **Links**:

    * `mailto:jeanbaptiste.dhondt1@gmail.com` opens the mail client.
    * `tel:+32475205562` works on mobile/desktop capable environments.
4. **Accessibility**: Section has a heading with `aria-labelledby`; links have descriptive `aria-label`s; color contrast matches existing footer styles.
5. **CSS policy**: No new tokens or global CSS files were created; existing footer utilities were reused.
6. **Regression**: Home content untouched; build passes with zero console/TS errors.

---

## Report back format

```
# FOOTER CONTACT — IMPLEMENTATION REPORT

Footer updated:
- File: <path>/Footer.tsx
- Render check: visible on all pages, including Home and About.

Contact page cleanup:
- File: <path>/contact/page.tsx
- Removed: <ContactDetails/> duplicate block.

CSS:
- Reused classes: footer grid/typography utilities (list names)
- New CSS files created: 0
- Tokens added/modified: 0

QA:
- mailto/tel links verified
- Lighthouse/axe: no new a11y issues
```

---

```
```
