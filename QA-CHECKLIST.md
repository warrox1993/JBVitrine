UI Refactor QA Checklist — Status: Pass

Scope: src/UIs/nextjs/src

Automated checks (regex-based)
- No hardcoded z-index >= 100 not using tokens
  - Pattern: z-index: <number> (>=100)
  - Result: 0 hits
- No transition: all <duration>
  - Pattern: transition: all <n>s
  - Result: 0 hits
- No font-size in px/rem outside tokens/clamp
  - Pattern: font-size: <number>(px|rem)
  - Result: 0 hits
- No raw hex or rgba colors in CSS Modules
  - Pattern: color: #..., rgba(...), linear/radial gradients with rgba/hex
  - Result: 0 hits
- No outlines using hardcoded white/hex
  - Pattern: outline: <n>px solid white|#...
  - Result: 0 hits

Manual notes and allowed exceptions
- Media queries cannot use CSS custom properties; breakpoints remain numeric (e.g., 768px, 980px).
- Local small z-index values (e.g., 2, 10) are acceptable for intra-component stacking.
- Decorative effect sizes (e.g., CursorGlow dimensions) kept as constants; motion/z-index are tokenized.

How to re-run locally
1) From repo root (Windows PowerShell):
   rg -n --pcre2 "z-index:\s*(?!var)\d{3,}|transition:\s*all\s*[\d\.]+s|font-size:\s*(?!var|clamp|inherit)[0-9\.]+(rem|px)|color:\s*#|rgba\(|outline:\s*\d+px\s+solid\s+(white|#)" src/UIs/nextjs/src -g "**/*.module.css" -S
2) Expect no output. Any hit = refactor required.

Last run
- Date: Updated during this commit
- Result: 0 hits

