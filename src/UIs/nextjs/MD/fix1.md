# fixHeroSpacing_v2.md — Final hero bottom fix (decor alignment + seamless transition)

## 🎯 Goal
Corriger définitivement le “trou visuel” sous le Hero en **recalant le décor cuivre** et en **harmonisant la fin du gradient** avec le fond global.  
Le Hero doit s’intégrer parfaitement au fond général, sans aucune ligne sombre, séparation, ni “gap” visuel.

---

## 1. Diagnostic
Le padding-bottom actuel (`var(--space-6)`) est OK, mais le décor `.pattern` (ou `.gradientBg`) reste trop haut.  
Résultat :
- Bande sombre visible entre la fin du Hero et le début du fond global.
- La forme en cuivre semble “flotter”.
- Sur certains écrans, la coupure crée un léger “jump” visuel à la jonction.

---

## 2. Correction à appliquer

### Fichier : `src/UIs/nextjs/src/components/sections/Hero/Hero.module.css`

#### A) Recalage du décor cuivre

Remplacer la section `.pattern` (ou `.gradientBg`, selon le nom exact) par :

```css
.pattern {
  position: absolute;
  bottom: -6vh; /* avant : 0 ou trop haut */
  left: 0;
  width: 100%;
  height: clamp(120px, 20vw, 240px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.9; /* un peu plus fondu pour éviter contraste dur */
}
```

**Explication :**
- `bottom: -6vh` abaisse le décor pour qu’il fonde dans le fond global sombre.
- La hauteur adaptative permet d’éviter les ruptures sur 1080p / 1440p / 4K.
- `opacity: 0.9` conserve la nuance cuivre sans créer de bande opaque.

---

#### B) Ajustement du padding Hero
Dans `.hero`, remplace :
```css
padding-bottom: var(--space-6);
```
par :
```css
padding-bottom: var(--space-4);
```
**Raison :** le décor repositionné prend visuellement le relais du padding, sinon le Hero paraît “décollé”.

---

#### C) Nettoyage des pseudo-éléments parasites
Vérifier et neutraliser :
```css
.hero::after,
.hero::before {
  content: none !important;
  background: none !important;
  border: none !important;
}
```
Ces éléments sont souvent les restes d’un ancien effet “wave” ou “gradient overlay”.

---

## 3. Validation visuelle

- Test sur 1080p et 1440p : la courbe cuivre doit rejoindre parfaitement le fond sombre, sans rupture.
- Scroll fluide : aucune “barre” ne doit apparaître entre Hero et section suivante.
- Sur fond global noir (`--color-bg`), le cuivre se fond naturellement sans “bande de transition”.
- Les CTAs restent centrés et ne sont pas poussés vers le haut.

---

## 4. Optional polish (si encore une légère rupture)
Ajouter un **overlay de fusion** pour lisser la jonction Hero → fond global :
```css
.hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--color-bg) 100%);
  pointer-events: none;
  z-index: 1;
}
```
Cet effet crée un dégradé fondu subtil sur 80px pour gommer toute couture, quel que soit l’écran.

---

## 5. Commit plan

- `fix(hero): align copper decor with bottom background`
- `fix(hero): reduce padding-bottom and smooth visual transition`
- `chore(hero): remove pseudo-elements causing seams`

---

✅ **Expected result:**
Le Hero rejoint parfaitement le fond, sans aucun gap ni bande visible.  
Le décor cuivre devient partie intégrante du fond — fluide, stable et sans saut visuel entre sections.
