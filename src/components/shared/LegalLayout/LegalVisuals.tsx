import React from "react";

/**
 * Discreet decorative legal illustrations, ported from the approved
 * `page-legal.html` mockup (inline stroke SVGs, navy/orange palette).
 * Purely decorative - always rendered with aria-hidden by the caller.
 */

/** Document + shield-check - used on the Mentions légales hero. */
export function MentionsVisual() {
  return (
    <svg viewBox="0 0 140 140" fill="none" focusable="false">
      <rect x="16" y="12" width="76" height="100" rx="10" fill="#f5f7fa" stroke="#d3dae6" strokeWidth="2" />
      <path d="M30 34h48M30 48h48M30 62h34" stroke="#8b96a8" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="30" cy="76" r="3.5" fill="#ff6a00" />
      <path d="M40 76h38" stroke="#8b96a8" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M96 64l28 10v22c0 20-13 33-28 40-15-7-28-20-28-40V74l28-10Z"
        fill="#fff"
        stroke="#0b1f3a"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M85 96l8 8 16-18" stroke="#1c3a63" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Network dots + padlock - used on the Confidentialité (RGPD) hero. */
export function PrivacyVisual() {
  return (
    <svg viewBox="0 0 140 140" fill="none" focusable="false">
      <circle cx="70" cy="70" r="62" fill="#eef2f7" stroke="#d3dae6" strokeWidth="1.5" />
      <circle cx="32" cy="42" r="3.2" fill="#1c3a63" />
      <circle cx="108" cy="38" r="3.2" fill="#1c3a63" />
      <circle cx="110" cy="100" r="3.2" fill="#1c3a63" />
      <circle cx="30" cy="102" r="3.2" fill="#1c3a63" />
      <path
        d="M32 42 52 62M108 38 88 58M110 100 88 74M30 102 52 78"
        stroke="#c3cdda"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="48" y="60" width="44" height="36" rx="8" fill="#fff" stroke="#0b1f3a" strokeWidth="2.4" />
      <path d="M56 60v-13a14 14 0 0 1 28 0v13" fill="none" stroke="#0b1f3a" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="70" cy="78" r="4.5" fill="#ff6a00" />
    </svg>
  );
}

/** Signed document / scales-style contract mark - used on the CGV hero. */
export function TermsVisual() {
  return (
    <svg viewBox="0 0 140 140" fill="none" focusable="false">
      <rect x="20" y="16" width="72" height="96" rx="10" fill="#f5f7fa" stroke="#d3dae6" strokeWidth="2" />
      <path d="M34 38h44M34 52h44M34 66h30" stroke="#8b96a8" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M34 84h24" stroke="#8b96a8" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M34 96c6-4 12-4 18 0s12 4 18 0"
        stroke="#ff6a00"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M92 58l24 8v18c0 17-11 28-24 34-13-6-24-17-24-34V66l24-8Z"
        fill="#fff"
        stroke="#0b1f3a"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M83 84l7 7 14-15" stroke="#1c3a63" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
