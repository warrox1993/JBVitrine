import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { Redis } from "@upstash/redis";
import { guardRoute } from "@/lib/auth/guard";
import { resetRateLimitsForIp } from "@/lib/rate-limit-redis";

/** Constant-time string comparison (returns false on length mismatch). */
function secretsMatch(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

// Support both the Vercel Marketplace Upstash integration vars (KV_REST_API_*)
// and the legacy UPSTASH_REDIS_REST_* names — same fallback order as
// src/lib/rate-limit-redis.ts. Without this, the purge tool silently connected
// to an unconfigured client (200 OK, 0 keys deleted), making it impossible to
// lift a rate-limit block manually.
const redis = new Redis({
  url: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)!,
  token: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)!,
});

// SECURITY (V-W7): strict IPv4/IPv6 shape check. Rejects globs/wildcards
// (`*`, `?`) and anything else that isn't a plausible literal IP, since the
// value is interpolated into a Redis key-scan pattern below.
const IPV4_RE =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IPV6_RE = /^[0-9a-fA-F:]+$/;

function isValidIp(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > 45) {
    return false;
  }
  if (value.includes("*") || value.includes("?")) {
    return false;
  }
  if (IPV4_RE.test(value)) return true;
  if (value.includes(":") && IPV6_RE.test(value)) return true;
  return false;
}

// SCAN-based key iteration (non-blocking, unlike KEYS which can stall Redis
// on large keyspaces). Cursor "0" returned by Upstash means the scan is done.
async function scanAllKeys(pattern: string): Promise<string[]> {
  const found: string[] = [];
  let cursor: string = "0";
  do {
    const [nextCursor, keys] = (await redis.scan(cursor, {
      match: pattern,
      count: 100,
    })) as [string, string[]];
    found.push(...keys);
    cursor = nextCursor;
  } while (cursor !== "0");
  return found;
}

export async function POST(request: NextRequest) {
  const denied = await guardRoute("admin");
  if (denied) return denied;
  try {
    const body = await request.json();
    const { secret, ipToReset } = body;

    // Verify the secondary ADMIN_SECRET gate. Fail CLOSED if it isn't
    // configured (never grant access when the secret is unset), and compare
    // in constant time to avoid timing leaks.
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      return NextResponse.json(
        { error: "Server misconfigured: ADMIN_SECRET not set" },
        { status: 500 }
      );
    }
    if (typeof secret !== "string" || !secretsMatch(secret, adminSecret)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!ipToReset) {
      return NextResponse.json(
        { error: "IP address required" },
        { status: 400 }
      );
    }

    // SECURITY (V-W7): reject anything that isn't a literal IP address
    // (no wildcards/globs) before using it inside a SCAN match pattern.
    if (!isValidIp(ipToReset)) {
      return NextResponse.json(
        { error: "Invalid IP address format" },
        { status: 400 }
      );
    }

    // AVAILABILITY (bug 429): purge the @upstash/ratelimit limiters through the
    // library's own resetUsedTokens rather than a hand-written key glob.
    //
    // The previous implementation matched `smidjan_v3_contact:<ip>` exactly, but
    // a sliding window stores `prefix:identifier:<window number>` — so SCAN
    // matched nothing, deletedCount stayed 0, and the route still answered
    // `success: true`. The block looked permanent and unfixable. resetUsedTokens
    // knows the real key layout AND clears the in-process ephemeral cache.
    const limiterResults = await resetRateLimitsForIp(ipToReset);
    const failed = limiterResults.filter((r) => !r.ok);

    // The legacy counter in src/lib/redis.ts uses plain `rate_limit:<ns>:<ip>`
    // keys (no window suffix), so those still need a SCAN sweep.
    let deletedCount = 0;
    const legacyPattern = `rate_limit:*:${ipToReset}`;
    let legacyError: string | null = null;
    try {
      // SECURITY (V-W7): SCAN instead of KEYS — KEYS is O(N) blocking over
      // the whole keyspace; SCAN iterates incrementally without blocking
      // other Redis clients.
      const keys = await scanAllKeys(legacyPattern);
      if (keys && keys.length > 0) {
        await redis.del(...keys);
        deletedCount += keys.length;
      }
    } catch (e) {
      legacyError = e instanceof Error ? e.message : "unknown error";
      console.error(`Error deleting keys for pattern ${legacyPattern}:`, e);
    }

    // Report honestly: never claim success when nothing could be purged.
    if (failed.length > 0 || legacyError) {
      return NextResponse.json(
        {
          success: false,
          message: `Partial reset for IP ${ipToReset}: ${failed.length} limiter(s) failed`,
          limiters: limiterResults,
          legacyKeysDeleted: deletedCount,
          legacyError,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Reset ${limiterResults.length} rate limiters (+${deletedCount} legacy key(s)) for IP ${ipToReset}`,
      limiters: limiterResults.map((r) => r.name),
      legacyKeysDeleted: deletedCount,
    });
  } catch (error) {
    console.error("Reset rate limit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
