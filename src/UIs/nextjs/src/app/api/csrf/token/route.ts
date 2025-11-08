import { NextResponse } from "next/server";
import { generateCsrfToken, storeCsrfToken } from "@/lib/csrf";

// Get client IP
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || real || "unknown";
}

export async function GET(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // Generate CSRF token
    const token = generateCsrfToken();

    // Store token in Redis (expires in 1 hour)
    await storeCsrfToken(token, clientIp);

    return NextResponse.json({
      token,
      expiresIn: 3600, // 1 hour in seconds
    });
  } catch (error) {
    console.error("CSRF token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 },
    );
  }
}
