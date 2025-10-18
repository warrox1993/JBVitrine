````markdown
---
title: Enhancement Round 3 — Sidebar hover performance, Testimonials visuals & timing, Accordion clarity, Services order, and Home text storytelling
scope: full homepage
impact: smoother interactions, stronger UX perception, more professional content tone
---

## 1) Sidebar hover — performance & smooth animation

**Problem**
- On initial hover, the sidebar expansion pushes the main body abruptly instead of animating smoothly.
- After a few interactions, the animation becomes smooth (likely due to layout caching or hydration delay).

**Objective**
- Make the sidebar reveal fluid from the very first hover.
- Prevent layout reflows that shift the body; instead, use transforms for GPU acceleration.

### CSS Fix (replace old hover animation)
```css
.sidebar {
  transition: width 0.3s cubic-bezier(.4, 0, .2, 1), background-color 0.2s ease;
  will-change: width, transform;
}

.sidebar:hover {
  width: var(--sidebar-expanded, 220px);
}

/* Prevent body layout shift */
.main-content {
  transition: margin-left 0.3s cubic-bezier(.4, 0, .2, 1);
}
body.sidebar-hovered .main-content {
  transform: translateX(var(--sidebar-shift, 50px));
}

/* Optional JS fallback if reactivity delay persists */
<script>
const sidebar = document.querySelector('.sidebar');
const body = document.body;
sidebar.addEventListener('mouseenter', () => body.classList.add('sidebar-hovered'));
sidebar.addEventListener('mouseleave', () => body.classList.remove('sidebar-hovered'));
</script>
````

**Note:**
If you’re using Next.js + hydration, test if the flicker occurs only before hydration; if yes, delay CSS transitions until hydration completes (e.g., `document.body.classList.add('hydrated')`).

---

## 2) Testimonials — shorter interval + add photos

**Current issue**

* Autoplay interval is too long (appears >7s).
* Reviewer images are missing; need circular avatars centered below name & role.

**Fix summary**

* Set autoplay interval to 5s max.
* Add `<img>` inside each testimonial.
* Center everything inside `.proof-item`.

### HTML

```html
<article class="proof-item" role="listitem" tabindex="0">
  <blockquote>“The team turned our vision into an outstanding web experience.”</blockquote>
  <footer>
    <div class="proof-person">
      <img src="/images/testimonials/sarah.jpg" alt="Sarah Laurent" class="proof-avatar">
      <div>
        <span class="proof-name">Sarah Laurent</span><br>
        <span class="proof-role">CMO, TechStart</span>
      </div>
    </div>
  </footer>
</article>
```

### CSS

```css
.proof-person {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  gap: 6px;
}
.proof-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--brand-400);
}
```

### JS

```js
const intervalMs = 5000; // 5 seconds
```

---

## 3) Accordion (“Our Creative Process”) — improve clarity, clickability & content depth

**Current issue**

* Lacks visual affordance for interaction.
* Too little descriptive content.

**Goals**

* Make summary area look interactive.
* Add clear hover/focus feedback.
* Expand with richer descriptive text.

### HTML (example for one accordion)

```html
<details class="process-acc" open>
  <summary><span class="step">01</span> Discovery</summary>
  <div class="panel">
    <p>We dive deep into your goals, audience, and market landscape to identify what truly differentiates your brand. Through workshops and data analysis, we uncover both risks and untapped opportunities.</p>
    <p>Deliverables: benchmark report, UX strategy outline, technical feasibility notes.</p>
  </div>
</details>
```

### CSS

```css
.process-acc summary {
  list-style: none;
  cursor: pointer;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 600;
  transition: background-color .25s ease, color .25s ease;
}
.process-acc summary:hover,
.process-acc[open] summary {
  background: rgba(255,255,255,0.05);
  color: var(--brand-400);
}
.process-acc summary::after {
  content: "›";
  margin-left: auto;
  transition: transform .25s ease;
}
.process-acc[open] summary::after {
  transform: rotate(90deg);
}
```

---

## 4) Services — reposition Web Development to the center

**Change**

* Current order: [Dev Web | Cybersecurity | Automation]
* Desired order: [Cybersecurity | Dev Web | Automation]

### CSS Grid adjustment

```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.services-grid > .service-dev { order: 2; }
.services-grid > .service-cyber { order: 1; }
.services-grid > .service-auto { order: 3; }
```

---

## 5) Home page text — improve storytelling and professional tone

**Goal**
Make the text sound expert-level, emotionally engaging, and client-focused. Replace flat descriptions with benefit-oriented storytelling.

### Suggested rewrite for hero section

```html
<h1>Exceptional Design, Flawless Code, Measurable Results</h1>
<p>
  We craft premium digital experiences that don’t just look elegant — they perform.  
  Our approach blends high-end design systems, scalable engineering, and measurable business outcomes.  
  Every pixel, every line of code, every decision is made to grow your brand’s digital impact.
</p>
<a href="#projects" class="btn-primary">View Our Projects</a>
<a href="#contact" class="btn-secondary">Let’s Discuss Your Vision</a>
```

### Subsection examples

**Process intro**

> A proven methodology that balances creativity and technical precision.
> Each stage — from discovery to launch — is built to align strategy, design, and technology into one coherent journey.

**Services tagline**

> Tailored digital solutions designed to elevate your brand, secure your infrastructure, and automate your growth.

**Testimonials intro**

> Trusted by ambitious brands who seek design that delights and code that endures.

---

### General Notes

* Keep consistent `transition: all .25s ease` for interactive components to ensure global smoothness.
* Optimize images (`.webp` preferred) for testimonials.
* Recheck the `sidebar hover` performance in both Chrome and Safari — some hydration frameworks may trigger first-load lag that requires delaying CSS transitions until after `DOMContentLoaded`.

```
```
