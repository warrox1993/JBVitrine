import { NextResponse } from "next/server";
import { getSecurityStats } from "@/lib/security-logger";
import { guardRoute } from "@/lib/auth/guard";

export async function GET() {
  const denied = await guardRoute("sales");
  if (denied) return denied;
  try {
    const stats = await getSecurityStats();

    return NextResponse.json({
      stats,
      timestamp: Date.now(),
      summary: {
        totalViolations:
          stats.rateLimitViolations +
          stats.xssAttempts +
          stats.invalidInputs +
          stats.csrfViolations +
          stats.suspiciousPatterns +
          stats.captchaFailures,
        criticalEvents: stats.xssAttempts + stats.csrfViolations,
        rateLimitEvents: stats.rateLimitViolations,
        botAttempts: stats.captchaFailures,
      },
    });
  } catch (error) {
    console.error("Security stats error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve security stats" },
      { status: 500 },
    );
  }
}
