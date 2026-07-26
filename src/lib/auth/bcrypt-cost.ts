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
