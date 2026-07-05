/**
 * Shared output-encoding helpers (V-W4).
 *
 * Centralized encoders for the different sinks where dynamic/user-controlled
 * values are interpolated: HTML emails, CSV/Excel exports, and JSON-LD.
 * These are output-encoders (context-aware escaping), NOT input validators —
 * always encode at the point of interpolation.
 */

/**
 * Encode a value for safe interpolation into HTML text/attribute context.
 * Encodes & < > " ' and coerces null/undefined to "".
 */
export function escapeHtml(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Neutralize CSV/spreadsheet formula injection.
 * If the stringified value begins with one of the formula-trigger characters
 * (= + - @), a TAB, or a CR, prefix a single quote so spreadsheet apps treat
 * it as literal text. The caller is still responsible for wrapping the result
 * in quotes and doubling internal quotes as needed.
 */
export function escapeCsvCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  // Prefix cells starting with whitespace or a formula trigger (= + - @),
  // covering leading space/newline/tab/CR variants some spreadsheets evaluate.
  if (/^[\s=+\-@]/.test(s)) {
    return `'${s}`;
  }
  return s;
}

/**
 * Encode a value for safe interpolation into XML text/attribute context.
 * Encodes & < > " ' and coerces null/undefined to "".
 */
export function escapeXml(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Serialize an object to JSON safe for embedding inside an inline
 * <script type="application/ld+json"> block via dangerouslySetInnerHTML.
 * Escapes `<` (prevents </script> breakout) and the U+2028 / U+2029 line
 * separators (which are invalid raw in JS/JSON string literals).
 */
export function jsonLdSafe(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
