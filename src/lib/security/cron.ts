/**
 * Shared authentication for Vercel Cron endpoints.
 *
 * A cron path is publicly reachable on Vercel — the scheduler simply performs an
 * HTTP request to it. The ONLY thing separating "the platform ran my job" from
 * "anyone on the internet ran my job" is this shared secret, so the check must
 * fail closed when CRON_SECRET is unset and compare in constant time.
 *
 * Extracted from /api/admin/leads/digest so every cron route enforces the same
 * check instead of re-implementing it (and drifting).
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export type CronAuthResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

/**
 * Verify the `Authorization: Bearer <CRON_SECRET>` header.
 *
 * @returns `{ ok: true }` when authorised, otherwise the response to return.
 */
export function requireCronAuth(request: Request): CronAuthResult {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    // Fail CLOSED: an unset secret must disable the endpoint, never open it.
    console.error("CRON_SECRET missing: cron endpoint disabled");
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 },
      ),
    };
  }

  const authHeader = request.headers.get("authorization") || "";
  const provided = Buffer.from(authHeader);
  const reference = Buffer.from(`Bearer ${cronSecret}`);

  // Length must match before timingSafeEqual, which throws on unequal lengths.
  const authorized =
    provided.length === reference.length && timingSafeEqual(provided, reference);

  if (!authorized) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true };
}
