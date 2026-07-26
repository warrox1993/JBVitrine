import { createHash } from "crypto";

/**
 * The no-flash theme initialiser, as a single source of truth.
 *
 * It must run before first paint, so it has to be inline — a deferred external
 * file would repaint. Being inline, a strict `script-src` has to allow it
 * somehow: either a per-request nonce (which forces dynamic rendering of every
 * page, see the note in src/proxy.ts) or a static hash, which is what this
 * module exists to provide.
 *
 * Keeping the source and the hash in the same module makes them impossible to
 * desynchronise: change the script and the hash follows automatically. The unit
 * test pins the pair so a silent CSP break cannot ship.
 */
export const THEME_INIT_SCRIPT =
  "(function(){try{var s=localStorage.getItem('smidjan-theme');document.documentElement.setAttribute('data-theme',(s==='dark'||s==='light')?s:'light');}catch(e){}})();";

/**
 * CSP source expression for the script above, e.g. `'sha256-abc…='`.
 *
 * The digest must cover the script text EXACTLY as it appears between the
 * <script> tags — no surrounding whitespace, no trailing newline — otherwise the
 * browser computes a different hash and silently refuses to execute it.
 */
export function themeScriptCspHash(): string {
  const digest = createHash("sha256").update(THEME_INIT_SCRIPT, "utf8").digest("base64");
  return `'sha256-${digest}'`;
}
