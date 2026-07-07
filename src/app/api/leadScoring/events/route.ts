/**
 * API Route: /api/leadScoring/events
 *
 * Enregistre les événements de tracking comportemental
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  leadScoringLimiter,
  getClientIdentifier,
} from "@/lib/rate-limit-redis";
import { validateContentType, validateCSRF } from "@/lib/api/middleware";

// Hard cap on request body size for this route.
const MAX_EVENTS_BODY_BYTES = 100 * 1024; // 100 KB
// Maximum number of events accepted in a single batch (bound the DB loop).
const MAX_EVENTS_PER_BATCH = 500;

export async function POST(request: NextRequest) {
  try {
    // ✅ Payload size guard
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_EVENTS_BODY_BYTES
    ) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    // Rate limiting check
    const clientIdentifier = getClientIdentifier(request);
    const { success, reset } = await leadScoringLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn(
        "[LeadScoring/events] Rate limit exceeded for:",
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

    const { sessionId, events } = await request.json();

    if (
      !sessionId ||
      typeof sessionId !== "string" ||
      sessionId.length > 200 ||
      !events ||
      !Array.isArray(events)
    ) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, events" },
        { status: 400 },
      );
    }

    // ✅ Bound batch size to avoid unbounded DB insert loops.
    if (events.length > MAX_EVENTS_PER_BATCH) {
      return NextResponse.json(
        {
          error: `Too many events in a single batch (max ${MAX_EVENTS_PER_BATCH})`,
        },
        { status: 400 },
      );
    }

    // Log for debugging
    console.log(`📊 Tracking events for session ${sessionId}:`, {
      count: events.length,
      types: events.reduce((acc: any, e: any) => {
        acc[e.type] = (acc[e.type] || 0) + 1;
        return acc;
      }, {}),
    });

    // ✅ Save events to database (batch insert for performance)
    let savedCount = 0;

    const ALLOWED_EVENT_TYPES = ["click", "scroll", "hover", "form_focus"];

    for (const event of events) {
      // Validate each event's shape before insert (nothing enforces the
      // TypeScript types at runtime, so untrusted input could persist garbage).
      if (
        !event ||
        typeof event !== "object" ||
        !ALLOWED_EVENT_TYPES.includes(event.type) ||
        (event.element != null && typeof event.element !== "string") ||
        !Number.isFinite(event.timestamp)
      ) {
        continue; // skip malformed events
      }
      try {
        await db.events.create({
          session_id: sessionId,
          type: event.type,
          element: typeof event.element === "string" ? event.element : "",
          timestamp: event.timestamp,
        });
        savedCount++;
      } catch (error) {
        console.error(`Failed to save event:`, error);
        // Continue saving other events even if one fails
      }
    }

    console.log(`✅ Saved ${savedCount}/${events.length} events to database`);

    return NextResponse.json({ success: true, saved: savedCount });
  } catch (error) {
    console.error("❌ Error saving tracking events:", error);
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
