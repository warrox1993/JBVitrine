import { NextResponse } from "next/server";
import { getSecurityStats } from "@/lib/security-logger";

export async function GET() {
  try {
    // TODO: Add authentication check here
    // For now, this endpoint should be protected by your admin authentication
    // const session = await getServerSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

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
