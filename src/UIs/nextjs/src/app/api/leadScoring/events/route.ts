/**
 * API Route: /api/leadScoring/events
 *
 * Enregistre les événements de tracking comportemental
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, events } = await request.json();

    if (!sessionId || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, events" },
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

    for (const event of events) {
      try {
        await db.events.create({
          session_id: sessionId,
          type: event.type,
          element: event.element,
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
