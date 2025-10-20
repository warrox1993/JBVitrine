````markdown
# fixBackground.md — Eliminate Horizontal Lines & Dark Bands (Home Page)

## 🎯 Goal
Fix all **horizontal “lines” and dark banding zones** visible in the Home page background.  
These artifacts are caused by overlapping background layers, overly strong gradients, and `background-attachment: fixed`.  
The goal: achieve a **continuous, seamless, and stable background** from top to bottom without changing the site’s palette or structure.

---

## 1. Diagnostic (before editing)
1. **Identify background layers**
   - Inspect `body`, `main`, `.container`, `.section`, `.surface`, `header`, and `footer`.
   - Note every `background`, `background-color`, or `background-image` (including pseudo-elements).
2. **Check for `background-attachment: fixed`**
   - Temporarily disable in DevTools; if lines disappear → culprit confirmed.
3. **Find tone discontinuities**
   - If each section uses a different token (like `--color-bg`, `--color-bg-alt`, `--color-surface`), you’ll see visible horizontal bands.
   - The goal is to unify them visually.

---

## 2. Strategy (3-step correction plan)

### Step A — Single source of background truth
- The **only** background gradient must live on `body`.
- All wrappers and sections (`main`, `.container`, `.section`) must use **transparent backgrounds** by default.
- Only cards or UI “surfaces” keep their own local background color for contrast.

**Action:**
- In `globals.css`:
  - Keep the main gradient only on `body`.
  - Replace all non-essential `background`/`background-color` in other layers with `transparent`.
  - Remove any `background-attachment: fixed`.

---

### Step B — Extend and soften the gradient
Avoid visible “bands” and sudden tone jumps.

**Recommended gradient (uses existing tokens):**
```css
body {
  background-color: var(--color-bg); /* Graphite base #0F1115 */
  background-image:
    radial-gradient(1600px 1400px at 15% 20%, color-mix(in srgb, var(--color-primary) 10%, transparent)),
    radial-gradient(1800px 1600px at 85% 80%, color-mix(in srgb, var(--color-secondary) 8%, transparent));
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-blend-mode: normal;
}
```

**Visual intent:**
- Two large radial glows (copper + amber), subtle and soft.
- No harsh stops, no fixed attachment.
- One solid graphite base (`--color-bg`).

---

### Step C — Optional anti-banding (noise overlay)
A faint noise texture removes visible gradient “steps” (8-bit banding) on large monitors.

Add this block at the end of `globals.css`:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("/images/noise-2pct.png"); /* small seamless noise (alpha 2%) */
  background-repeat: repeat;
  opacity: 0.025;
  mix-blend-mode: normal;
  z-index: 0;
}
```

- Keep opacity between **0.02–0.03** max.
- The effect must not be visible; only smooths color transitions.

---

## 3. File changes summary

### In `globals.css`
- Unify `background` on `body`.
- Delete any `background-attachment: fixed`.
- Remove `background-color` from `.container`, `.section`, `.surface` unless truly needed.
- Keep `header` and `footer` either transparent or with the same token (`--color-bg-alt`).

### In component-specific CSS (`elements.css`, `utilities.css`, `Hero.module.css`, etc.)
- Remove any secondary gradients or pseudo-element backgrounds that overlap the body gradient.
- If a decorative layer (`::before`) creates dark blocks, lower opacity to ≤ 0.15 or remove it.

### In utility styles
- Check `.surface`, `.glass`, `.section`:
  - Ensure `background: transparent;` by default.
  - Keep only borders or shadows if visually required.

---

## 4. QA checklist

- Scroll from top to bottom: **no visible horizontal bands** or tone jumps.
- No `background-attachment: fixed` anywhere.
- Gradient transition smooth even on 4K monitors.
- Hero → Services → Process → Footer share a unified background.
- Optional noise overlay: toggling `body::before` on/off should change **only smoothness**, not color.

---

## 5. Acceptance criteria

- Background unified and continuous.
- No “dark cuts” or sudden color seams between sections.
- One gradient source (body), no competing layers.
- Visual stability under scroll.
- No regression on performance or text contrast.

---

## 6. Commit plan

- `fix(bg): unify background on body, remove competing section backgrounds`
- `fix(bg): remove background-attachment: fixed`
- `feat(bg): add optional noise overlay to reduce banding`
- `chore(qc): clean section borders and verify transparency`

---

## 7. QA command
After applying, run:
```bash
npm run dev
```
Then visually inspect in Chrome + Firefox + Edge (dark mode) with DevTools throttled scroll and GPU compositing enabled.  
If seams persist, re-check for hidden pseudo-elements or local `background-color` overrides.

---

✅ **Expected result:**  
A seamless, forge-inspired copper/amber gradient backdrop with no banding, no horizontal lines, and full visual continuity.
````
