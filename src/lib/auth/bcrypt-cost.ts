/**
 * Single source of truth for the bcrypt cost factor.
 *
 * Kept in its own leaf module (no next-auth / next/headers imports) so both the
 * runtime auth code and the standalone `scripts/create-users-table.ts` CLI can
 * import it without dragging the whole auth stack along.
 *
 * SECURITY: the dummy hash used by the anti-enumeration path in
 * src/lib/auth/index.ts MUST be generated with this same cost. If real password
 * hashes are more expensive than the dummy one, the "unknown account" path
 * answers measurably faster and the timing side-channel reopens.
 */
export const BCRYPT_COST = 12;

/**
 * Maximum password length bcrypt can actually hash, in BYTES.
 *
 * bcrypt silently truncates anything beyond 72 bytes — everything past that is
 * ignored with no error. On a FR/NL/EN site that bites well before 72
 * characters: accented letters cost 2 bytes in UTF-8, so a 64-character
 * passphrase can already exceed the limit and have its tail discarded.
 * OWASP's Password Storage Cheat Sheet requires enforcing this explicitly
 * rather than relying on the silent truncation.
 */
export const BCRYPT_MAX_PASSWORD_BYTES = 72;

/** True when the password fits in bcrypt's input window. */
export function isPasswordLengthValid(password: string): boolean {
  return Buffer.byteLength(password, "utf8") <= BCRYPT_MAX_PASSWORD_BYTES;
}
