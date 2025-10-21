# AboutTeam.md — Appliquer le thème SMIDJAN à la section “Équipe” (Next.js + tokens, zéro débordement, zéro emoji)

## But

Reprendre ton HTML “Équipe” et l’**intégrer** proprement dans la page About avec:

* **Couleurs = tokens du design system** (pas de nouvelles valeurs).
* **Composants et boutons** alignés au style du site (CTA, radius, ombres).
* **A11y + responsive** solides.
* **Zéro emoji** (exigence permanente).

Cible: Next.js App Router. CSS pur. Pas de SCSS.

---

## Arborescence ciblée

```
src/UIs/nextjs/src/app/about/
  Team.tsx            // composant équipe
  team.css            // styles dédiés, tokens uniquement
```

---

## Mapping couleurs (remplace les hex de la maquette)

* Fond section: `var(--color-bg-1)`
* Texte principal: `var(--color-fg-1)`
* Texte secondaire: `var(--color-fg-3)` ou `var(--color-fg-2)` selon contraste
* Accent (orange marque): `var(--color-accent-1)`  (fallback local si absent)
* Bordures faibles: `var(--color-border, hsla(0,0%,100%,.12))`
* Ombres: utiliser `rgba(0,0,0,.3~.5)` (pas de `color-mix` ici)

---

## Composant — `Team.tsx`

```tsx
"use client";

import "./team.css";

export default function Team() {
  return (
    <section className="team-section" aria-labelledby="team-title">
      <div className="team-container">
        <header className="team-header">
          <h2 id="team-title" className="team-title">Notre Équipe</h2>
          <p className="team-sub">
            Une équipe en construction, avec l’excellence au cœur de notre ADN et l’ambition
            de créer des expériences digitales mesurables.
          </p>
        </header>

        <div className="team-grid" role="list">
          {/* Slot 1 – À recruter (Frontend) */}
          <article className="member" role="listitem" aria-label="Consultant Frontend à recruter">
            <div className="avatar-wrap">
              <div className="recruit-ph" aria-hidden="true">
                <span className="qmark" aria-hidden="true">?</span>
              </div>
            </div>
            <span className="recruit-badge" aria-hidden="true">Nous recrutons</span>
            <h3 className="member-name">Consultant Frontend</h3>
            <p className="member-role">Développeur·se Senior</p>
            <p className="member-desc">
              Expert·e React/Next.js et design systems. Focalisé·e performance et UX. Rejoignez-nous pour façonner des interfaces élégantes et scalables.
            </p>
          </article>

          {/* Slot 2 – Membre central */}
          <article className="member member--center" role="listitem" aria-label="Alexandre N. — Fondateur & Designer Produit">
            <div className="avatar-wrap">
              <img
                className="avatar"
                src="/images/team/alexandre.jpg"
                alt="Portrait de Alexandre N."
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="member-name">Alexandre N.</h3>
            <p className="member-role">Fondateur & Designer Produit</p>
            <p className="member-desc">
              Conçoit des systèmes clairs où chaque détail sert le parcours. Esthétique utile, mesurable, durable.
            </p>
          </article>

          {/* Slot 3 – À recruter (Backend) */}
          <article className="member" role="listitem" aria-label="Consultant Backend à recruter">
            <div className="avatar-wrap">
              <div className="recruit-ph" aria-hidden="true">
                <span className="qmark" aria-hidden="true">?</span>
              </div>
            </div>
            <span className="recruit-badge" aria-hidden="true">Nous recrutons</span>
            <h3 className="member-name">Consultant Backend</h3>
            <p className="member-role">Développeur·se Senior</p>
            <p className="member-desc">
              Expert·e Node.js/Python/Java. Architecture scalable, APIs robustes, fiabilité en production.
            </p>
          </article>
        </div>

        <p className="team-note">
          Selon le projet, nous activons un réseau d’experts associés (recherche utilisateur, contenu, vidéo, data).
        </p>

        <div className="team-cta">
          <h3 className="team-cta-title">Rejoindre SMIDJAN</h3>
          <p className="team-cta-sub">
            Senior orienté excellence et impact business, autonome et exigeant ? Parlons-en.
          </p>

          {/* Aligner au style du bouton “voir le cas complet” */}
          <a href="#contact" className="btn btn--primary" aria-label="Postuler maintenant">
            Postuler maintenant
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## Styles — `team.css` (tokens only, pas d’emoji)

```css
:root{
  --accent: var(--color-accent-1, #d4a024);
  --fg: var(--color-fg-1, #ffffff);
  --fg-2: var(--color-fg-2, #c9c9c9);
  --fg-3: var(--color-fg-3, #9aa0a6);
  --bg: var(--color-bg-1, #111316);
  --panel: color-mix(in oklab, var(--bg), black 5%); /* si non supporté, remplacé plus bas */
  --border: var(--color-border, rgba(255,255,255,.12));
  --radius: 20px;
}

/* fallback si color-mix non supporté */
@supports not (color-mix(in oklab, white, black)) {
  :root { --panel: rgba(255,255,255,0.03); }
}

.team-section{
  background: transparent;
  color: var(--fg);
  padding: clamp(40px, 4vw, 80px) 0;
}

.team-container{
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(12px, 3vw, 32px);
}

.team-header{
  text-align: center;
  margin-bottom: clamp(32px, 6vw, 72px);
}

.team-title{
  font-weight: 800;
  font-size: clamp(2rem, 1.2rem + 2.2vw, 3.2rem);
  margin: 0 0 12px;
  /* gradient titre aligné marque */
  background: linear-gradient(120deg, var(--fg) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.team-sub{
  max-width: 760px;
  margin: 0 auto;
  color: var(--fg-3);
  line-height: 1.6;
  font-size: 1.06rem;
}

.team-grid{
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: clamp(20px, 3vw, 48px);
  align-items: start;
  margin-bottom: clamp(32px, 6vw, 64px);
}

.member{
  text-align: center;
  position: relative;
  transition: transform .25s ease, box-shadow .25s ease;
  padding: clamp(8px, 1vw, 12px);
  border-radius: var(--radius);
}

.member:hover{
  transform: translateY(-6px);
}

.avatar-wrap{
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1;
  margin: 0 auto clamp(16px, 2vw, 24px);
}

.avatar{
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  object-fit: cover;
  border: 2px solid transparent;
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
  transition: border-color .25s ease, box-shadow .25s ease;
}

.member--center .avatar{
  border-color: var(--accent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent), transparent 60%);
}
@supports not (color-mix(in srgb, white, black)){
  .member--center .avatar{ box-shadow: 0 0 40px rgba(212,160,36,.4); }
}

/* Placeholder recrutement */
.recruit-ph{
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  background: linear-gradient(135deg, rgba(255,255,255,.03), rgba(255,255,255,.06));
  display: grid;
  place-items: center;
  border: 2px dashed var(--accent);
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.recruit-ph::before{
  content:"";
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 40%, color-mix(in srgb, var(--accent), transparent 90%) 50%, transparent 60%);
  transform: translateX(-100%);
  animation: shimmer 3s linear infinite;
  z-index: -1;
}
@supports not (color-mix(in srgb, white, black)){
  .recruit-ph::before{ background: linear-gradient(45deg, transparent 40%, rgba(212,160,36,.1) 50%, transparent 60%); }
}

@keyframes shimmer{ to { transform: translateX(100%);} }

.qmark{
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--accent);
  font-weight: 800;
  opacity: .9;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse{ 50%{ transform: scale(1.06); opacity: 1;} }

.member-name{
  font-size: 1.5rem;
  font-weight: 800;
  margin: 6px 0 6px;
  color: var(--fg);
}

.member--center .member-name{ color: var(--accent); }

.member-role{
  font-size: 1rem;
  color: var(--fg-2);
  margin-bottom: 10px;
  font-weight: 600;
}

.member-desc{
  font-size: .98rem;
  color: var(--fg-3);
  line-height: 1.55;
  max-width: 36ch;
  margin: 0 auto;
}

/* Badge recrutement — sans emoji */
.recruit-badge{
  display: inline-block;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent), white 8%), var(--accent));
  color: #fff;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: .86rem;
  font-weight: 700;
  margin-bottom: 10px;
  box-shadow: 0 6px 24px rgba(0,0,0,.28);
  letter-spacing: .2px;
}

.team-note{
  text-align: center;
  font-size: .95rem;
  color: var(--fg-3);
  font-style: italic;
  margin-top: clamp(16px, 3vw, 32px);
  padding: 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
}

/* CTA panel aligné aux cartes du site */
.team-cta{
  text-align: center;
  margin-top: clamp(32px, 6vw, 72px);
  padding: clamp(24px, 4vw, 48px);
  background: var(--panel);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
}

.team-cta-title{
  font-size: clamp(1.6rem, 1.1rem + 1.4vw, 2.2rem);
  margin: 0 0 8px;
  color: var(--fg);
}

.team-cta-sub{
  font-size: 1.05rem;
  color: var(--fg-2);
  margin: 0 auto 18px;
  max-width: 70ch;
}

/* Bouton – calqué sur le style "voir le cas complet" */
.btn{
  display: inline-block;
  border-radius: 999px;
  padding: 14px 28px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
}
.btn--primary{
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent), white 10%), var(--accent));
  color: #111;
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
}
.btn--primary:hover{
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(0,0,0,.35);
  border-color: color-mix(in srgb, var(--accent), black 20%);
}

/* Responsive */
@media (max-width: 1024px){
  .team-grid{ gap: 32px; }
}
@media (max-width: 768px){
  .team-grid{ grid-template-columns: 1fr; gap: 40px; }
  .avatar-wrap{ max-width: 360px; }
}
```

---

## Intégration dans About

Dans `about/page.tsx`, insérer la section équipe à l’endroit voulu:

```tsx
import Team from "./Team";

export default function AboutPage(){
  return (
    <>
      {/* … autres sections About … */}
      <Team />
      {/* … suite … */}
    </>
  );
}
```

---

## Nettoyage par rapport au HTML fourni

* Supprimé toutes les couleurs hex (#ff8533, etc.) au profit des **tokens**.
* Bouton/CTA aligné à ton style existant (gradient + hover + radius).
* **Emoji retirés** (badge recrutement).
* Images: pointer vers `/public/images/team/*` (pas d’URL externe en prod).
* Typo responsive, grilles fluides, animations légères compatibles `prefers-reduced-motion`.

---

## Check de validation (bloquant)

1. Aucune nouvelle couleur; tout passe par `var(--color-*)`.
2. La grille 3-colonnes desktop → 1 colonne mobile fonctionne sans débordement.
3. Les cartes “recrutement” brillent subtilement, sans agressivité visuelle.
4. Le bouton reprend exactement les interactions du bouton de référence du site.
5. Lighthouse: aucun warning de contraste sur le texte des cartes et du CTA.
6. Aucun emoji présent.

Quand c’est mergé, on passe à la version “équipe dynamique” (données JSON/MDX + images optimisées) et on branche le formulaire de contact sur le CTA.
