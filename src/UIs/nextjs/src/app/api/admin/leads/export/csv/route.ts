/**
 * API Route: /api/admin/leads/export/csv
 *
 * Export leads as CSV file
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { guardRoute } from "@/lib/auth/guard";
import { escapeCsvCell } from "@/lib/security/escape";

/**
 * Neutralize CSV formula injection then wrap the value as a quoted CSV cell
 * (internal double-quotes escaped per RFC 4180).
 */
function csvCell(v: unknown): string {
  return `"${escapeCsvCell(v).replace(/"/g, '""')}"`;
}

export async function GET() {
  const denied = await guardRoute("sales");
  if (denied) return denied;
  try {
    // Fetch all leads from database
    const leads = await db.leads.getAll({ limit: 10000 });

    if (leads.length === 0) {
      return new NextResponse("No leads found", { status: 404 });
    }

    // CSV Headers
    const headers = [
      "ID",
      "Date",
      "Grade",
      "Score",
      "Confiance",
      "Nom",
      "Email",
      "Entreprise",
      "Téléphone",
      "Type de projet",
      "Budget Min",
      "Budget Max",
      "Score Projet",
      "Score Engagement",
      "Score Complétion",
      "Score Enrichissement",
      "Score Comportement",
    ];

    // Generate CSV rows
    const rows = leads.map((lead: any) => {
      const breakdown = lead.score_breakdown || {};
      const estimate = lead.estimate || {};

      return [
        lead.id,
        new Date(lead.created_at).toISOString(),
        lead.score_grade,
        lead.score_total,
        lead.score_confidence,
        lead.name,
        lead.email,
        lead.company || "",
        lead.phone || "",
        lead.project_type || "",
        estimate.min || 0,
        estimate.max || 0,
        breakdown.project || 0,
        breakdown.engagement || 0,
        breakdown.completion || 0,
        breakdown.enrichment || 0,
        breakdown.behavioral || 0,
      ]
        .map(csvCell)
        .join(",");
    });

    // Combine headers and rows
    const csv = [headers.map(csvCell).join(","), ...rows].join("\n");

    // Return CSV file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("❌ Error exporting CSV:", error);
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
