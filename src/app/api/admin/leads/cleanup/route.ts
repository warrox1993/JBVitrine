/**
 * API Route: /api/admin/leads/cleanup
 *
 * Data-retention job. Deletes personal data past its retention window.
 *
 * WHY THIS EXISTS (GDPR art. 5.1.e — storage limitation): the `leads` table
 * stores email, name, company, phone plus `enrichment_data` / `behavioral_data`
 * JSONB blobs, and `sessions` stores navigation history, referrer, UTM and
 * device information. Nothing in the schema or in vercel.json ever expired any
 * of it: db/schema.sql defines cleanup_old_events() but no cron, script or route
 * ever called it, so retention was effectively unlimited.
 *
 * Invoked daily by Vercel Cron (see vercel.json) with
 * `Authorization: Bearer <CRON_SECRET>`.
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireCronAuth } from "@/lib/security/cron";

/**
 * Retention windows, in months. Overridable by env so the policy can be tuned
 * without a deploy, but with conservative defaults.
 *
 * Leads are kept longer than raw analytics: a lead is a business record, whereas
 * behavioural sessions/events lose value quickly and are the most intrusive.
 */
function retention() {
  const months = (name: string, fallback: number) => {
    const parsed = Number(process.env[name]);
    return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : fallback;
  };

  return {
    leads: months("RETENTION_LEADS_MONTHS", 24),
    sessions: months("RETENTION_SESSIONS_MONTHS", 6),
    events: months("RETENTION_EVENTS_MONTHS", 3),
  };
}

async function handleCleanup(request: NextRequest) {
  const auth = requireCronAuth(request);
  if (!auth.ok) return auth.response;

  const windows = retention();

  try {
    // Order matters: purge events first, then sessions (whose cascade would
    // remove events anyway), then leads. Each step is reported separately so a
    // partial failure is visible rather than silent.
    const events = await db.events.deleteOlderThan(windows.events);
    const sessions = await db.sessions.deleteOlderThan(windows.sessions);
    const leads = await db.leads.deleteOlderThan(windows.leads);

    console.log("🧹 Retention cleanup complete", {
      windows,
      deleted: { events, sessions, leads },
    });

    return NextResponse.json({
      success: true,
      retentionMonths: windows,
      deleted: { events, sessions, leads },
    });
  } catch (error) {
    console.error("❌ Retention cleanup failed:", error);
    return NextResponse.json(
      {
        error: "Cleanup failed",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 },
    );
  }
}

// Vercel Cron issues a GET; POST is exported for manual/authorised triggering.
export async function GET(request: NextRequest) {
  return handleCleanup(request);
}

export async function POST(request: NextRequest) {
  return handleCleanup(request);
}
