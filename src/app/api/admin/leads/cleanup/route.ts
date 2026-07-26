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
 * NOT scheduled in vercel.json for now — the deletes are irreversible (plain
 * DELETE, no soft-delete) and nobody has yet confirmed how old the live data
 * is. Trigger it by hand, starting with the dry run:
 *
 *   # count only, deletes nothing
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *        "https://smidjan.be/api/admin/leads/cleanup?dryRun=1"
 *
 *   # actually purge
 *   curl -X POST -H "Authorization: Bearer $CRON_SECRET" \
 *        "https://smidjan.be/api/admin/leads/cleanup"
 *
 * Re-add the cron entry to vercel.json once the dry-run numbers look right.
 * The path must stay in CRON_PATHS in src/proxy.ts either way, otherwise the
 * proxy's admin gate answers 401 before this handler ever runs.
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

  // Dry run: report what WOULD be deleted, touch nothing. Default for GET so a
  // stray browser hit or an accidental cron re-enable cannot destroy data;
  // deleting requires an explicit POST.
  const dryRun =
    request.method === "GET" ||
    request.nextUrl.searchParams.get("dryRun") === "1";

  try {
    if (dryRun) {
      const counts = await db.retention.countOlderThan(windows);
      console.log("🔍 Retention dry run", { windows, wouldDelete: counts });
      return NextResponse.json({
        success: true,
        dryRun: true,
        retentionMonths: windows,
        wouldDelete: counts,
        hint: "POST (sans dryRun) pour supprimer réellement.",
      });
    }

    // Order matters: purge events first, then sessions (whose cascade would
    // remove events anyway), then leads and quotes. Each step is reported
    // separately so a partial failure is visible rather than silent.
    const events = await db.events.deleteOlderThan(windows.events);
    const sessions = await db.sessions.deleteOlderThan(windows.sessions);
    const leads = await db.leads.deleteOlderThan(windows.leads);
    // `quotes` holds the same direct identifiers as `leads` (email, name,
    // company, phone). It was missing from the first version of this job, so
    // the route advertised art. 5.1.e compliance while one table kept its data
    // for ever.
    const quotes = await db.quotes.deleteOlderThan(windows.leads);

    console.log("🧹 Retention cleanup complete", {
      windows,
      deleted: { events, sessions, leads, quotes },
    });

    return NextResponse.json({
      success: true,
      retentionMonths: windows,
      deleted: { events, sessions, leads, quotes },
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
