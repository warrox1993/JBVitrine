/** Extrait le host (avec port) d'une URL, ou null si invalide. */
function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/**
 * Validation same-origin stricte : le host de `origin` (ou `referer` en repli)
 * doit être STRICTEMENT égal au host de la requête. Pas de sous-chaîne.
 */
export function isSameOrigin(
  origin: string | null,
  referer: string | null,
  host: string | null,
): boolean {
  if (!host) return false;
  const source = hostOf(origin) ?? hostOf(referer);
  return source !== null && source === host;
}
