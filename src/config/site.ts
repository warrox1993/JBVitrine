/**
 * Single source of truth for off-site identity: profile URLs and direct
 * contact points. Everything that would otherwise be hardcoded across pages
 * (header, footer, contact, schema.org) should read from here so there is one
 * place to change a handle or number. Extend as the "zero hardcoding" cleanup
 * folds the remaining literals in.
 */
export const social = {
  github: "https://github.com/warrox1993",
  linkedin: "https://www.linkedin.com/in/jean-baptistedhondt",
  tryhackme: "https://tryhackme.com/p/Warrox1993",
} as const;

/** Raw phone in E.164 — the single source; the tel: href is derived from it. */
const phone = "+32475205562";

export const contact = {
  email: "jeanbaptiste.dhondt1@gmail.com",
  /** Server-side sender address (transactional mail) — distinct from the public inbox. */
  senderEmail: "contact@smidjan.be",
  /**
   * Where server-side notifications land (contact form, leads digest, alerts).
   * Overridable via NOTIFICATIONS_EMAIL so the address is not pinned in git.
   */
  get notificationsEmail(): string {
    return process.env.NOTIFICATIONS_EMAIL || "smidjan.agency@outlook.com";
  },
  /** Phone in E.164 (e.g. for schema.org telephone). */
  phone,
  /** tel: link derived from the E.164 number. */
  phoneHref: `tel:${phone}`,
  /** Human-readable phone shown in the UI. */
  phoneLabel: "0475 20 55 62",
} as const;

/** Publicly-verifiable credentials (single source, reused by CV + schema.org). */
export const credentials = {
  /** Microsoft Certified: Azure Fundamentals (AZ-900), earned 2026-01-13. */
  az900VerifyUrl:
    "https://learn.microsoft.com/en-us/users/jeanbaptistedhondt-5414/credentials/certification/azure-fundamentals",
  az900EarnedDate: "2026-01-13",
} as const;

/** Canonical production origin (no trailing slash). */
export const siteUrl = "https://smidjan.be";
