/**
 * API Route: /api/leadScoring/session
 *
 * Enregistre les données de session complètes
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  leadScoringLimiter,
  getClientIdentifier,
} from "@/lib/rate-limit-redis";
import { validateContentType, validateCSRF } from "@/lib/api/middleware";

// Hard cap on request body size for this route (session blobs can be large).
const MAX_SESSION_BODY_BYTES = 200 * 1024; // 200 KB
// Maximum number of entries accepted in the session arrays.
const MAX_SESSION_ARRAY_LEN = 500;

/** Safe array: only keep arrays, truncated to a bounded length. */
function boundedArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value.slice(0, MAX_SESSION_ARRAY_LEN) : [];
}

/** Coerce a client numeric into a finite non-negative bounded number. */
function boundedNumber(value: unknown, max: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(max, Math.max(0, n));
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Payload size guard
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_SESSION_BODY_BYTES
    ) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    // Rate limiting check
    const clientIdentifier = getClientIdentifier(request);
    const { success, reset } = await leadScoringLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn(
        "[LeadScoring/session] Rate limit exceeded for:",
        clientIdentifier,
      );
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    // ✅ Content-Type validation (middleware)
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) return contentTypeCheck.response;

    // ✅ CSRF Protection (middleware)
    const csrfCheck = validateCSRF(request);
    if (!csrfCheck.success) return csrfCheck.response;

    const { sessionId, data } = await request.json();

    if (
      !sessionId ||
      typeof sessionId !== "string" ||
      sessionId.length > 200 ||
      !data ||
      typeof data !== "object"
    ) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, data" },
        { status: 400 },
      );
    }

    // ✅ Loose schema validation: bound string lengths on stored scalar fields.
    const boundStr = (v: unknown): string | undefined =>
      typeof v === "string" ? v.slice(0, 500) : undefined;

    // Log for debugging
    console.log(`💾 Saving session ${sessionId}:`, {
      duration: data.sessionDuration,
      pages: data.visitedPages?.length,
      interactions: data.interactions?.length,
      engagementScore: data.engagementScore,
      intentScore: data.intentScore,
      wizardStarted: data.wizardStarted,
    });

    // ✅ Save to database
    const startedAt = new Date(data.sessionStart);
    const savedSession = await db.sessions.upsert({
      session_id: sessionId,
      started_at: Number.isNaN(startedAt.getTime()) ? new Date() : startedAt,
      duration_ms: boundedNumber(data.sessionDuration, 30 * 24 * 3600 * 1000),
      visited_pages: boundedArray(data.visitedPages),
      landing_page: boundStr(data.landingPage),
      referrer: boundStr(data.referrer),
      utm_source: boundStr(data.utm_source),
      utm_medium: boundStr(data.utm_medium),
      utm_campaign: boundStr(data.utm_campaign),
      device: (["mobile", "tablet", "desktop"] as const).includes(
        data.device,
      )
        ? (data.device as "mobile" | "tablet" | "desktop")
        : undefined,
      browser: boundStr(data.browser),
      os: boundStr(data.os),
      wizard_started: data.wizardStarted === true,
      wizard_step: boundedNumber(data.wizardStep, 1000),
      wizard_back_clicks: boundedNumber(data.wizardBackClicks, 100000),
      info_bubbles_opened: boundedArray(data.infoBubbleOpened).filter(
        (x): x is string => typeof x === "string",
      ),
      engagement_score: boundedNumber(data.engagementScore, 100),
      intent_score: boundedNumber(data.intentScore, 100),
    });

    console.log(`✅ Session saved to database: ${savedSession.id}`);

    return NextResponse.json({ success: true, sessionId: savedSession.id });
  } catch (error) {
    console.error("❌ Error saving session:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 },
    );
  }
}
