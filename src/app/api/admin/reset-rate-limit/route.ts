import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { guardRoute } from "@/lib/auth/guard";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
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

    // Verify secret
    if (secret !== process.env.ADMIN_SECRET) {
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

    // SECURITY (V-W7): prefixes below match the CURRENT limiter instances in
    // src/lib/rate-limit-redis.ts (the old smidjan_quote/smidjan_contact/
    // smidjan_enrichment prefixes were stale and matched nothing).
    const patterns = [
      `rate_limit:*:${ipToReset}`,
      `smidjan_v4_quote:${ipToReset}`,
      `smidjan_v3_contact:${ipToReset}`,
      `smidjan_v3_login:${ipToReset}`,
      `smidjan_v3_enrichment:${ipToReset}`,
      `smidjan_v3_csrf:${ipToReset}`,
      `smidjan_v3_leadscore:${ipToReset}`,
    ];

    let deletedCount = 0;
    for (const pattern of patterns) {
      try {
        // SECURITY (V-W7): SCAN instead of KEYS — KEYS is O(N) blocking over
        // the whole keyspace; SCAN iterates incrementally without blocking
        // other Redis clients.
        const keys = await scanAllKeys(pattern);
        if (keys && keys.length > 0) {
          await redis.del(...keys);
          deletedCount += keys.length;
        }
      } catch (e) {
        console.error(`Error deleting keys for pattern ${pattern}:`, e);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} rate limit keys for IP ${ipToReset}`,
      deletedCount,
    });
  } catch (error) {
    console.error("Reset rate limit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
