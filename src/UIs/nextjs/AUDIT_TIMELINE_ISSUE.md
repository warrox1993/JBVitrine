# AUDIT TIMELINE ISSUE - READ ONLY ANALYSIS

**Date**: 2025-11-09
**Mode**: Read-Only Audit (No Code Changes)
**Component**: Timeline on About Page
**Scope**: Mobile + Desktop (Large Screen)

---

## 📋 EXECUTIVE SUMMARY

The Timeline component on the About page (`/about`) displays all timeline sections (2000-2026) continuously in a scrollable container. Users can see multiple sections at once by scrolling.

**Expected Behavior**: Only ONE timeline section should be visible at a time. When viewing "2005", the user should NOT see the previous (2000) or next (2008) sections until they scroll to navigate between them.

**Current Behavior**: All 9 timeline sections are rendered continuously with scroll-snap functionality. While each section takes full viewport height on desktop, all sections are visible in the scroll container simultaneously.

**Impact**:
- **UX Confusion**: Users see multiple timeline sections at once, diluting focus
- **Design Intent**: Breaks the intended single-section storytelling experience
- **Mobile**: Even worse - scroll snap is disabled, creating a long continuous scroll
- **Engagement**: Reduced immersion and attention to individual timeline moments

---

## 🔍 ISSUE ANALYSIS

### Component Location
- **File**: `src/app/about/Timeline.tsx` (203 lines, Client Component)
- **Styles**: `src/app/about/Timeline.module.css` (564 lines)
- **Data**: `src/lib/aboutTimelineData.ts` (9 timeline items)
- **Integration**: `src/app/about/page.tsx` line 57 (mounted in SectionWithBackground)

---

## 🐛 PROBLEM IDENTIFICATION

### Root Cause 1: All Items Rendered Simultaneously

**Location**: `src/app/about/Timeline.tsx:127-186`

```tsx
{TIMELINE_ITEMS.map((item, index) => (
  <div
    key={item.year}
    ref={(el) => {
      itemRefs.current[index] = el;
    }}
    className={`${styles.timelineItem} ${isMobile ? styles.timelineItemMobile : ''}`}
  >
    {/* All 9 items rendered at once */}
    <div className={styles.itemContent}>
      {/* Year display, title, text, progress bar */}
    </div>
  </div>
))}
```

**Analysis**:
- ❌ All 9 timeline items (2000-2026) are rendered in a single pass
- ❌ No conditional rendering based on `activeIndex`
- ❌ Users can scroll and see multiple sections simultaneously
- ✅ IntersectionObserver tracks which section is "active" (line 17-34)
- ✅ Active section gets visual emphasis (opacity/scale), but others remain visible

**Expected**:
- Only `TIMELINE_ITEMS[activeIndex]` should be rendered/visible
- Previous/next items should be hidden until user navigates to them

---

### Root Cause 2: Scroll-Snap Architecture (Not True Single-Item Display)

**Location**: `src/app/about/Timeline.module.css:127-136`

```css
.scrollableContent {
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;  /* Snaps to sections, but doesn't hide them */
  scroll-behavior: smooth;
}

.scrollableContent.scrollableContentMobile {
  scroll-snap-type: none;  /* Mobile: No snap at all! */
}
```

**Analysis**:
- ⚠️ Desktop: `scroll-snap-type: y mandatory` creates snap points, but all items are scrollable
- ❌ Mobile: `scroll-snap-type: none` disables snapping entirely → continuous scroll
- ❌ Scroll snap ≠ single-item visibility (it's just smooth scroll positioning)
- ❌ The container is scrollable with all sections accessible at once

**Scroll Snap Behavior**:
```
User Scroll Experience:
┌─────────────────────┐
│   2000 (visible)    │ ← Snap point 1
├─────────────────────┤
│   2005 (visible)    │ ← Snap point 2 (user can scroll down and see this)
├─────────────────────┤
│   2008 (visible)    │ ← Snap point 3 (also accessible)
└─────────────────────┘
```

**Expected Carousel Behavior**:
```
User Navigation Experience:
┌─────────────────────┐
│   2005 (ONLY ONE)   │ ← Only this section visible
│                     │
│  [Prev]     [Next]  │ ← Navigation controls
└─────────────────────┘

Previous (2000) and Next (2008) are completely hidden until navigation
```

---

### Root Cause 3: Height Allocation Exposes All Items

**Location**: `src/app/about/Timeline.module.css:237-251`

```css
.timelineItem {
  min-height: 100vh;          /* Each item takes full viewport */
  scroll-snap-align: start;   /* Snap to top of item */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: var(--space-6) var(--space-5);
}

.timelineItem.timelineItemMobile {
  min-height: auto;           /* Mobile: Auto height */
  scroll-snap-align: none;    /* No snap point */
  padding: var(--space-4) var(--space-4);
}
```

**Analysis**:
- **Desktop**: Each section has `min-height: 100vh` → 9 items = 900vh total scrollable height
- **Mobile**: `min-height: auto` → Sections stack with natural height, creating even longer scroll
- All items are in the DOM and laid out sequentially
- User can scroll through all 9 sections continuously

**Visualization of Current State**:
```
Desktop (.scrollableContent - height: 100vh, overflow-y: scroll):
┌───────────────────────┐ ← Viewport (visible area)
│ 2000 (100vh)          │
├───────────────────────┤
│ 2005 (100vh)          │ ← User can scroll here
├───────────────────────┤
│ 2008 (100vh)          │ ← And here
├───────────────────────┤
│ 2012 (100vh)          │ ← And here
├───────────────────────┤
│ ... (5 more items)    │
└───────────────────────┘
Total: 900vh of scrollable content
```

**Expected State**:
```
Viewport (100vh):
┌───────────────────────┐
│                       │
│   2005 ONLY           │ ← activeIndex = 1
│   (No other items)    │
│                       │
└───────────────────────┘
Navigation: Keyboard/Buttons/Swipe to change activeIndex
```

---

### Root Cause 4: Mobile Experience Degradation

**Location**: `src/app/about/Timeline.tsx:10-12, 58-69`

```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const update = () => {
    if (typeof window === "undefined") return;
    setIsLg(window.innerWidth >= 1024);
    setIsMobile(window.innerWidth < 768);  // < 768px = mobile
  };
  update();
  // ...
}, []);
```

**Mobile-Specific Changes**:
- `scroll-snap-type: none` → No section snapping
- `min-height: auto` → Natural height (shorter sections)
- `.timelineItemMobile` → Different padding

**Result**:
- Mobile users experience a LONG continuous scroll through 9 sections
- No clear boundaries between timeline periods
- Harder to focus on individual moments
- Scroll fatigue for users

---

### Root Cause 5: IntersectionObserver Only Tracks, Doesn't Control Visibility

**Location**: `src/app/about/Timeline.tsx:16-34`

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setActiveIndex(index);  // ← Only updates state, doesn't hide/show
        }
      });
    },
    {
      threshold: [0, 0.3, 0.6, 1],
      rootMargin: "-15% 0px -15% 0px",
    }
  );

  itemRefs.current.forEach((ref) => ref && observer.observe(ref));
  return () => observer.disconnect();
}, []);
```

**Analysis**:
- ✅ Correctly identifies which section is currently in viewport
- ✅ Updates `activeIndex` when section has 60%+ visibility
- ❌ `activeIndex` only used for visual styling (opacity/scale/glow)
- ❌ Doesn't control rendering or DOM presence of items
- ❌ All items remain in the DOM regardless of `activeIndex`

**Current Usage of `activeIndex`**:
```tsx
{/* Line 138 */}
<div className={`${styles.yearDisplay} ${activeIndex === index ? styles.yearDisplayActive : ''}`}>

{/* Line 147 */}
<div className={`${styles.itemDetails} ${activeIndex === index ? styles.itemDetailsActive : ''}`}>

{/* Only adds CSS classes for visual emphasis, doesn't hide items */}
```

---

## 📊 TECHNICAL DETAILS

### Data Structure (aboutTimelineData.ts)

```typescript
export type TimelineItem = {
  year: string;        // "2000", "2005", etc.
  title: string;       // "Premiers pas dans l'informatique"
  text: string;        // Description (100-200 characters)
  imageUrl: string;    // Background image (unused in current design)
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  { year: "2000", title: "...", text: "...", imageUrl: "/images/timeline/2000.jpg" },
  { year: "2005", title: "...", text: "...", imageUrl: "/images/timeline/2005.jpg" },
  // ... 9 items total (2000-2026)
];
```

**Note**: `imageUrl` property exists but is NOT used in the current Timeline.tsx rendering.

---

### CSS Architecture Analysis

**Container Hierarchy**:
```
.timelineContainer (100vh, overflow: hidden)
  └── .scrollableContent (100%, overflow-y: scroll, snap-type: y mandatory)
        ├── .timelineHeader (sticky top)
        ├── .spacerTop (0 height desktop, 4vh mobile)
        ├── .timelineItem (min-height: 100vh) ← Item 1 (2000)
        ├── .timelineItem (min-height: 100vh) ← Item 2 (2005)
        ├── .timelineItem (min-height: 100vh) ← Item 3 (2008)
        ├── ... (6 more items)
        └── .spacerBottom (0 height desktop, 4vh mobile)
```

**Visual Styling for Active State**:
```css
/* Timeline.module.css:278-281 */
.yearDisplay.yearDisplayActive {
  opacity: 1;
  transform: scale(1.05);  /* Slight zoom on active year */
}

/* Timeline.module.css:346-349 */
.itemDetails.itemDetailsActive {
  opacity: 1;
  transform: scale(1.05);  /* Slight zoom on active content */
}

/* Glow effects on active (line 312-314, 330-332) */
.yearGlow1.yearGlowActive { transform: scale(1); }
.yearGlow2.yearGlowActive { transform: scale(1); }
```

**Observation**:
- Visual emphasis is subtle (5% scale, glow effects)
- Non-active items still have `opacity: 1` → Fully visible
- No CSS rules to hide inactive items

---

### Desktop vs Mobile Comparison

| Aspect | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (<768px) |
|--------|------------------|-------------------|-----------------|
| **Container Height** | 100vh fixed | 100vh fixed | auto (no height limit) |
| **Item Height** | min-height: 100vh | min-height: 100vh | min-height: auto |
| **Scroll Snap** | `y mandatory` | `y mandatory` | `none` ❌ |
| **Timeline Rail** | Visible (right side) | Hidden | Hidden |
| **Year Display** | Large (3-6rem) | Large | Large |
| **Spacers** | 0 height | 0 height | 4vh top/bottom |
| **Navigation** | Scroll wheel | Touch scroll | Touch scroll |
| **UX Issue** | All sections scrollable | All sections scrollable | **Worse**: Long continuous scroll |

---

## 💡 SOLUTION OPTIONS

### Option 1: True Carousel with Navigation Controls ⭐ RECOMMENDED

**Approach**: Convert to single-item display with prev/next navigation

**Changes Required**:

1. **Conditional Rendering** - Only render active item:
```tsx
// Timeline.tsx line 127
// BEFORE: {TIMELINE_ITEMS.map((item, index) => ...)}
// AFTER:
const activeItem = TIMELINE_ITEMS[activeIndex];

<div className={styles.timelineItem}>
  {/* Render only activeItem */}
  <div className={styles.itemContent}>
    <div className={styles.yearDisplay}>
      <div className={styles.yearText}>{activeItem.year}</div>
    </div>
    <div className={styles.itemDetails}>
      <h2>{activeItem.title}</h2>
      <p>{activeItem.text}</p>
    </div>
  </div>
</div>
```

2. **Navigation Controls** - Add prev/next buttons:
```tsx
<div className={styles.navigationControls}>
  <button
    onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
    disabled={activeIndex === 0}
    className={styles.navButton}
  >
    <ChevronLeftIcon /> Précédent
  </button>

  <div className={styles.yearIndicator}>
    {activeItem.year}
  </div>

  <button
    onClick={() => setActiveIndex(prev => Math.min(TIMELINE_ITEMS.length - 1, prev + 1))}
    disabled={activeIndex === TIMELINE_ITEMS.length - 1}
    className={styles.navButton}
  >
    Suivant <ChevronRightIcon />
  </button>
</div>
```

3. **Keyboard Navigation** - Add arrow key support:
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      setActiveIndex(prev => Math.min(TIMELINE_ITEMS.length - 1, prev + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      setActiveIndex(prev => Math.max(0, prev - 1));
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

4. **Touch/Swipe Support** (Mobile):
```tsx
const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStart(e.touches[0].clientY);
};

const handleTouchEnd = () => {
  if (touchStart - touchEnd > 50) {
    // Swipe up → Next
    setActiveIndex(prev => Math.min(TIMELINE_ITEMS.length - 1, prev + 1));
  }
  if (touchEnd - touchStart > 50) {
    // Swipe down → Previous
    setActiveIndex(prev => Math.max(0, prev - 1));
  }
};

<div
  onTouchStart={handleTouchStart}
  onTouchMove={(e) => setTouchEnd(e.touches[0].clientY)}
  onTouchEnd={handleTouchEnd}
>
  {/* Timeline content */}
</div>
```

5. **CSS Changes** - Remove scroll container:
```css
/* Timeline.module.css */
.scrollableContent {
  height: 100%;
  overflow: hidden;  /* Changed from overflow-y: scroll */
  /* Remove scroll-snap-type */
}

.timelineItem {
  min-height: 100vh;
  height: 100vh;  /* Fixed height, no scroll */
  /* Remove scroll-snap-align */
}
```

6. **Transition Animation** - Smooth slide between sections:
```css
.itemContent {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.5s ease-out;
}

.itemContent.entering {
  transform: translateY(100%);
  opacity: 0;
}

.itemContent.active {
  transform: translateY(0);
  opacity: 1;
}

.itemContent.exiting {
  transform: translateY(-100%);
  opacity: 0;
}
```

**Pros**:
- ✅ True single-section experience (matches expected behavior)
- ✅ Clear navigation with visual feedback
- ✅ Keyboard accessible
- ✅ Touch/swipe friendly on mobile
- ✅ No scroll confusion
- ✅ Better focus on individual timeline moments

**Cons**:
- ❌ Requires significant component refactoring
- ❌ Need to add navigation UI elements
- ❌ Must handle transition animations

**Effort**: Medium (4-6 hours)

---

### Option 2: CSS-Only Hidden Inactive Items

**Approach**: Keep scroll architecture but hide non-active items with CSS

**Changes Required**:

1. **Conditional CSS Classes**:
```tsx
{TIMELINE_ITEMS.map((item, index) => (
  <div
    key={item.year}
    className={`${styles.timelineItem} ${index === activeIndex ? styles.active : styles.inactive}`}
  >
    {/* Content */}
  </div>
))}
```

2. **Visibility CSS**:
```css
/* Timeline.module.css */
.timelineItem.inactive {
  opacity: 0 !important;
  pointer-events: none;
  position: absolute;  /* Remove from flow */
  visibility: hidden;
}

.timelineItem.active {
  opacity: 1;
  pointer-events: auto;
  position: relative;
  visibility: visible;
}
```

3. **Disable Scroll Snap** (since only one item visible):
```css
.scrollableContent {
  scroll-snap-type: none;  /* Not needed anymore */
}
```

4. **Navigation via Scroll Wheel/Touch**:
```tsx
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (e.deltaY > 0) {
    // Scroll down → Next
    setActiveIndex(prev => Math.min(TIMELINE_ITEMS.length - 1, prev + 1));
  } else {
    // Scroll up → Previous
    setActiveIndex(prev => Math.max(0, prev - 1));
  }
};
```

**Pros**:
- ✅ Simpler than full carousel (less code changes)
- ✅ Reuses existing IntersectionObserver logic
- ✅ Maintains scroll-based navigation feel

**Cons**:
- ⚠️ Scroll hijacking can feel unnatural
- ❌ Still renders all items in DOM (performance impact)
- ❌ Harder to implement smooth transitions
- ❌ Accessibility concerns (scroll behavior modification)

**Effort**: Low-Medium (2-3 hours)

---

### Option 3: Slider Library Integration (e.g., Swiper)

**Approach**: Replace custom scroll logic with battle-tested slider library

**Changes Required**:

1. **Install Swiper**:
```bash
npm install swiper
```

2. **Replace Timeline Component**:
```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Timeline() {
  return (
    <div className={styles.timelineContainer}>
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Mousewheel]}
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {TIMELINE_ITEMS.map((item) => (
          <SwiperSlide key={item.year}>
            <div className={styles.itemContent}>
              {/* Timeline item content */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
```

3. **Custom Styling**:
```css
/* Override Swiper defaults to match design */
.swiper {
  height: 100vh;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Pros**:
- ✅ Production-ready, battle-tested
- ✅ Built-in touch/swipe support
- ✅ Keyboard navigation included
- ✅ Accessible (ARIA labels)
- ✅ Smooth transitions out of the box
- ✅ Less custom code to maintain

**Cons**:
- ❌ External dependency (+~30KB)
- ❌ Opinionated CSS structure
- ❌ May require style overrides to match design
- ❌ Learning curve for customization

**Effort**: Low (1-2 hours implementation, 2-3 hours styling refinement)

---

### Option 4: Hybrid Approach - Pagination Dots Navigation

**Approach**: Keep scroll but add pagination dots that control which section is visible

**Changes Required**:

1. **Pagination Dots Component**:
```tsx
<div className={styles.paginationDots}>
  {TIMELINE_ITEMS.map((item, index) => (
    <button
      key={item.year}
      className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
      onClick={() => {
        setActiveIndex(index);
        itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
      }}
      aria-label={`Aller à ${item.year}`}
    >
      <span className={styles.dotYear}>{item.year}</span>
    </button>
  ))}
</div>
```

2. **Auto-Hide Non-Active Sections** (similar to Option 2):
```css
.timelineItem {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timelineItem:not(.active) {
  opacity: 0.1;
  pointer-events: none;
  filter: blur(8px);
}
```

3. **Lock Scrolling Between Items**:
```tsx
useEffect(() => {
  let scrollTimeout: NodeJS.Timeout;

  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Snap to nearest section after scroll stops
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const itemHeight = window.innerHeight;
      const nearestIndex = Math.round(scrollTop / itemHeight);

      setActiveIndex(nearestIndex);
      itemRefs.current[nearestIndex]?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const el = containerRef.current;
  el?.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    el?.removeEventListener('scroll', handleScroll);
    clearTimeout(scrollTimeout);
  };
}, []);
```

**Pros**:
- ✅ Visual pagination dots (easy to see progress)
- ✅ Click-to-navigate on dots
- ✅ Maintains scroll feel with enhancements
- ✅ Can keep existing rail dots on desktop

**Cons**:
- ⚠️ Still allows scrolling between sections (not pure single-item)
- ❌ Blur/opacity trick may not fully hide content
- ❌ More complex state management

**Effort**: Medium (3-4 hours)

---

## 🎯 RECOMMENDATION

### Best Solution: **Option 1 - True Carousel with Navigation Controls**

**Rationale**:
1. **Matches Expected Behavior**: User explicitly wants ONE section visible at a time
2. **Better UX**: Clear navigation, no scroll confusion
3. **Mobile-Friendly**: Touch/swipe gestures are intuitive
4. **Accessibility**: Keyboard navigation + clear focus management
5. **Performance**: Only renders active item (can optimize with lazy loading)
6. **Design Control**: Full control over transitions and animations

### Implementation Priority:

**Phase 1 - Core Functionality** (2-3 hours):
- [ ] Refactor to conditional rendering (only render `TIMELINE_ITEMS[activeIndex]`)
- [ ] Add prev/next buttons with state management
- [ ] Remove scroll container logic (`overflow: hidden`)
- [ ] Test keyboard navigation (arrow keys)

**Phase 2 - Mobile Enhancements** (1-2 hours):
- [ ] Implement touch/swipe gestures
- [ ] Adjust button sizing for mobile (44px touch targets)
- [ ] Test on real devices (iOS Safari, Android Chrome)

**Phase 3 - Polish & Animations** (1-2 hours):
- [ ] Add slide transition animations (enter/exit)
- [ ] Implement progress indicator (e.g., "3/9")
- [ ] Add subtle parallax or fade effects
- [ ] Ensure reduced-motion support

**Phase 4 - Accessibility** (1 hour):
- [ ] ARIA labels for navigation buttons
- [ ] Announce section changes to screen readers
- [ ] Ensure keyboard focus management
- [ ] Test with screen reader (NVDA/JAWS)

**Total Estimated Effort**: 5-8 hours

---

## 📝 TESTING CHECKLIST

Once solution is implemented, verify:

### Desktop (≥1024px)
- [ ] Only ONE timeline section visible at a time
- [ ] Prev/Next buttons work correctly
- [ ] Arrow keys navigate between sections
- [ ] First section: Prev button disabled
- [ ] Last section: Next button disabled
- [ ] Smooth transitions between sections
- [ ] Timeline rail dots still functional (optional)
- [ ] No scroll bar visible

### Tablet (768-1023px)
- [ ] Same behavior as desktop
- [ ] Touch targets minimum 44x44px
- [ ] Buttons positioned clearly
- [ ] Text remains readable

### Mobile (<768px)
- [ ] Swipe up/down to navigate
- [ ] Swipe gestures feel natural
- [ ] Only ONE section visible
- [ ] Navigation buttons accessible (not hidden)
- [ ] Section content fits viewport
- [ ] No horizontal scroll

### Accessibility
- [ ] Keyboard navigation works (Tab, Arrow keys, Enter)
- [ ] Screen reader announces section changes
- [ ] Focus visible on navigation controls
- [ ] Reduced motion respected (prefers-reduced-motion)

### Performance
- [ ] No layout shift on section change
- [ ] Smooth 60fps transitions
- [ ] No memory leaks (unmount cleanup)
- [ ] Lazy load images (if using imageUrl in future)

---

## 🔗 RELATED FILES

### Files to Modify (for Option 1):
1. `src/app/about/Timeline.tsx` - Component logic
2. `src/app/about/Timeline.module.css` - Styles
3. `src/lib/aboutTimelineData.ts` - No changes needed (data structure OK)

### Files to Reference:
- `src/app/about/page.tsx` - Integration point (line 57)
- `src/components/about/HeroAbout.tsx` - Similar animation patterns
- `src/components/ui/Button.tsx` - Reuse button component for navigation

---

## 📚 ADDITIONAL CONTEXT

### User's Original Request (Translation):
> "once you've completely finished this first read-only audit, you must audit in read-only mode the timeline on the about page because it's not correct on mobile or large screen. Currently it displays its time sections in continuous file. Whereas normally you can only see one section of the timeline per section, for example if I see 2005 I don't see the previous or next one until I scroll"

### Design Intent:
The timeline is meant to be an immersive storytelling experience where each year (2000-2026) is presented individually. This creates:
- **Focus**: User attention on one moment at a time
- **Impact**: Each milestone gets full spotlight
- **Flow**: Clear progression through founder's journey
- **Engagement**: Interactive navigation encourages exploration

### SEO Note:
While single-item rendering improves UX, ensure:
- All timeline items are server-rendered (SSR) for SEO
- Consider adding hidden text content for crawlers
- Schema.org markup for timeline/events (optional enhancement)

---

## ⚠️ IMPORTANT NOTES

1. **This is a READ-ONLY audit** - No code changes have been made
2. **User approval required** before implementation
3. **Current site is production** - Test thoroughly in development first
4. **Backup Timeline component** before refactoring
5. **Consider creating Timeline v2** as separate component for A/B testing

---

## 📊 IMPACT ASSESSMENT

| Aspect | Current State | After Fix (Option 1) | Improvement |
|--------|--------------|---------------------|-------------|
| **UX Clarity** | ⭐⭐ Confusing multi-section scroll | ⭐⭐⭐⭐⭐ Clear single-section focus | +150% |
| **Mobile Experience** | ⭐⭐ Long scroll, no snap | ⭐⭐⭐⭐⭐ Intuitive swipe navigation | +150% |
| **Engagement** | ⭐⭐⭐ Passive scrolling | ⭐⭐⭐⭐⭐ Active exploration | +66% |
| **Accessibility** | ⭐⭐⭐ Scroll-only | ⭐⭐⭐⭐⭐ Keyboard + screen reader | +66% |
| **Performance** | ⭐⭐⭐⭐ All items rendered | ⭐⭐⭐⭐⭐ Single item rendered | +25% |
| **Design Intent** | ❌ Broken | ✅ Matches vision | Critical Fix |

**Overall**: This is a **HIGH PRIORITY UX fix** that aligns the implementation with the intended user experience.

---

## 🏁 CONCLUSION

The Timeline component on the About page currently displays all 9 timeline sections (2000-2026) in a scrollable container, allowing users to see multiple sections simultaneously. This breaks the intended single-section storytelling experience.

**Root Cause**: Scroll-snap architecture renders all items continuously instead of implementing true single-item visibility with navigation controls.

**Recommended Solution**: Convert to carousel pattern with prev/next navigation, keyboard support, and touch/swipe gestures (Option 1).

**Next Steps**:
1. ✅ Read-only audit complete (this document)
2. ⏳ Await user approval for implementation
3. ⏳ Create feature branch for Timeline refactoring
4. ⏳ Implement Option 1 (or user's preferred solution)
5. ⏳ Test thoroughly across devices
6. ⏳ Deploy to production

---

**Audit Completed By**: Claude Code
**Date**: 2025-11-09
**Status**: ✅ COMPLETE - Awaiting User Decision
