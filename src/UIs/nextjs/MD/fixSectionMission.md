# AboutMission_H2.md — Afficher le H2 “Notre mission” (section ciblée uniquement)

## Objectif

Ajouter un **H2 “Notre mission”** visible en tête de la section Mission, sans impacter le reste du site.
Portée ultra-ciblée: fichiers `about/Mission.tsx` et `about/mission.css` **uniquement**.

---

## 1) `src/UIs/nextjs/src/app/about/Mission.tsx` — insertion du H2

**Action:** insérer le H2 tout en haut du wrapper de la section Mission, au-dessus des cartes.

```diff
 export default function Mission() {
   return (
     <section className="mission" aria-labelledby="mission-title">
       <div className="mission__bg" aria-hidden="true">
         <span className="mission__orb mission__orb--1" />
         <span className="mission__orb mission__orb--2" />
         <span className="mission__orb mission__orb--3" />
       </div>

       <div className="mission__wrap">
-        <header className="mission__header">
-          <span className="mission__tag">Notre mission</span>
-          <h2 id="mission-title" className="mission__title">
-            Forger l’excellence numérique
-          </h2>
-        </header>
+        {/* H2 principal de section */}
+        <h2 id="mission-title" className="mission__h2">Notre mission</h2>
```

> Note: on garde le même `id="mission-title"` pour l’accessibilité et les ancres internes.

---

## 2) `src/UIs/nextjs/src/app/about/mission.css` — styles du H2

**Action:** ajouter un bloc de style minimal, aligné au thème (tokens uniquement), sans toucher aux autres règles.

```diff
 :root{
   --acc: var(--color-accent-1, #d4a024);
   --bg: var(--color-bg-1, #0b0f14);
   --fg: var(--color-fg-1, #ffffff);
   --fg2: var(--color-fg-2, #c7c7c7);
   --fg3: var(--color-fg-3, #9aa0a6);
   --bd: var(--color-border, rgba(255,255,255,.12));
   --radius: 20px;
 }

+/* ===== H2 de section ===== */
+.mission__h2{
+  margin: 0 0 clamp(16px, 3vw, 32px);
+  text-align: center;
+  font-weight: 800;
+  font-size: clamp(1.6rem, 1rem + 2.2vw, 2.4rem);
+  line-height: 1.15;
+  color: var(--fg);
+  /* Légère touche de marque sans créer un nouveau style global */
+  background: linear-gradient(120deg, var(--fg) 0%, var(--acc) 100%);
+  -webkit-background-clip: text;
+  background-clip: text;
+  -webkit-text-fill-color: transparent;
+}
```

---

## 3) Vérifications (bloquant)

* Le texte **“Notre mission”** s’affiche au-dessus des trois cartes.
* Aucune autre section n’a changé d’aspect.
* Aucune nouvelle couleur brute: **uniquement des tokens**.
* Responsive: le H2 reste lisible et centré sur mobile et desktop.
* Lighthouse: aucun avertissement d’accessibilité nouveau.

---

## Fichiers modifiés

* `src/UIs/nextjs/src/app/about/Mission.tsx`
* `src/UIs/nextjs/src/app/about/mission.css`


