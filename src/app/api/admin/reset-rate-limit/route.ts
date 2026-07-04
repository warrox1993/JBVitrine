import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { guardRoute } from "@/lib/auth/guard";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

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

    // Delete all rate limit keys for this IP
    const patterns = [
      `rate_limit:*:${ipToReset}`,
      `smidjan_quote:${ipToReset}`,
      `smidjan_contact:${ipToReset}`,
      `smidjan_enrichment:${ipToReset}`,
    ];

    let deletedCount = 0;
    for (const pattern of patterns) {
      try {
        // Scan for keys matching pattern
        const keys = await redis.keys(pattern);
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
