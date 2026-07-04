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

export async function POST(request: NextRequest) {
  try {
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

    const { sessionId, data } = await request.json();

    if (!sessionId || !data) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, data" },
        { status: 400 },
      );
    }

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
    const savedSession = await db.sessions.upsert({
      session_id: sessionId,
      started_at: new Date(data.sessionStart),
      duration_ms: data.sessionDuration || 0,
      visited_pages: data.visitedPages || [],
      landing_page: data.landingPage,
      referrer: data.referrer,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      device: data.device,
      browser: data.browser,
      os: data.os,
      wizard_started: data.wizardStarted || false,
      wizard_step: data.wizardStep || 0,
      wizard_back_clicks: data.wizardBackClicks || 0,
      info_bubbles_opened: data.infoBubbleOpened || [],
      engagement_score: data.engagementScore || 0,
      intent_score: data.intentScore || 0,
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
