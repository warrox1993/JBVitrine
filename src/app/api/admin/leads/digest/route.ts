/**
 * API Route: /api/admin/leads/digest
 *
 * Send daily email digest of new leads
 * Can be triggered by a cron job (e.g., Vercel Cron, GitHub Actions, or external cron)
 */

import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/email/resend-client";
import { db } from "@/lib/db";
import { timingSafeEqual } from "crypto";
import { escapeHtml } from "@/lib/security/escape";

// Shared handler. Vercel Cron invokes the path with GET (+ Authorization:
// Bearer CRON_SECRET), so we export BOTH GET and POST — otherwise the daily
// digest 405s and never runs.
async function handleDigest(request: NextRequest) {
  try {
    // 🔒 C2 : aucun fallback en dur — refuser si le secret n'est pas configuré
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error("CRON_SECRET manquant : endpoint digest désactivé");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const authHeader = request.headers.get("authorization") || "";
    const expected = `Bearer ${cronSecret}`;
    const provided = Buffer.from(authHeader);
    const reference = Buffer.from(expected);
    const authorized =
      provided.length === reference.length &&
      timingSafeEqual(provided, reference);

    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get date range (last 24 hours)
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    console.log(
      `📧 Generating daily digest for ${yesterday.toISOString()} to ${now.toISOString()}`,
    );

    // Fetch all leads from database
    const allLeads = await db.leads.getAll({ limit: 10000 });

    // Filter leads from last 24 hours
    const recentLeads = allLeads.filter((lead: any) => {
      const leadDate = new Date(lead.created_at);
      return leadDate >= yesterday && leadDate <= now;
    });

    if (recentLeads.length === 0) {
      console.log("ℹ️ No new leads in the last 24 hours");
      return NextResponse.json({
        success: true,
        message: "No new leads to report",
        count: 0,
      });
    }

    // Calculate stats
    const stats = {
      total: recentLeads.length,
      hot: recentLeads.filter((l: any) => l.score_grade === "HOT").length,
      warm: recentLeads.filter((l: any) => l.score_grade === "WARM").length,
      cold: recentLeads.filter((l: any) => l.score_grade === "COLD").length,
      avgScore: Math.round(
        recentLeads.reduce((sum: number, l: any) => sum + l.score_total, 0) /
          recentLeads.length,
      ),
      totalValue: recentLeads.reduce(
        (sum: number, l: any) => sum + (l.estimate?.max || 0),
        0,
      ),
    };

    // Generate email HTML
    const emailHTML = generateDigestEmail(recentLeads, stats, yesterday, now);

    // Send email
    const { data, error } = await getResend().emails.send({
      from: "Smidjan Lead Digest <contact@smidjan.be>",
      to: ["smidjan.agency@outlook.com"],
      subject: `📊 Daily Lead Digest - ${stats.total} nouveaux leads (${stats.hot} HOT)`,
      html: emailHTML,
    });

    if (error) {
      console.error("❌ Failed to send digest email:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 },
      );
    }

    console.log(`✅ Digest email sent successfully (${stats.total} leads)`);

    return NextResponse.json({
      success: true,
      emailId: data?.id,
      stats,
      leadsCount: recentLeads.length,
    });
  } catch (error) {
    console.error("❌ Error generating digest:", error);
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

function generateDigestEmail(
  leads: any[],
  stats: any,
  from: Date,
  to: Date,
): string {
  const hotLeads = leads.filter((l) => l.score_grade === "HOT");
  const warmLeads = leads.filter((l) => l.score_grade === "WARM");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 700px; margin: 0 auto; background: #f9f9f9; }
    .header { background: linear-gradient(135deg, #ff6a00, #ffc43a); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0 0 10px 0; font-size: 28px; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 30px; background: white; }
    .stat-card { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .stat-value { font-size: 32px; font-weight: 700; color: #ff6a00; margin-bottom: 5px; }
    .stat-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
    .content { padding: 0 30px 30px; background: white; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
    .lead-card { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ccc; }
    .lead-card.hot { border-left-color: #ff4444; background: #fff5f5; }
    .lead-card.warm { border-left-color: #ffaa00; background: #fffbf0; }
    .lead-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
    .lead-name { font-size: 18px; font-weight: 700; color: #1a1a1a; }
    .lead-badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .badge-hot { background: #ff4444; color: white; }
    .badge-warm { background: #ffaa00; color: white; }
    .badge-cold { background: #2196f3; color: white; }
    .lead-info { font-size: 14px; color: #666; margin: 5px 0; }
    .lead-score { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
    .score-bar { flex: 1; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
    .score-fill { height: 100%; background: linear-gradient(90deg, #ff6a00, #ffc43a); }
    .score-text { font-size: 14px; font-weight: 600; color: #333; }
    .footer { text-align: center; padding: 30px; color: #999; font-size: 12px; background: white; border-top: 1px solid #e0e0e0; }
    .cta { display: inline-block; padding: 15px 30px; background: #ff6a00; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .cta:hover { background: #e45700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Daily Lead Digest</h1>
      <p>${from.toLocaleDateString("fr-FR")} - ${to.toLocaleDateString("fr-FR")}</p>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${stats.total}</div>
        <div class="stat-label">Nouveaux Leads</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.hot}</div>
        <div class="stat-label">🔥 Hot Leads</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.avgScore}</div>
        <div class="stat-label">Score Moyen</div>
      </div>
    </div>

    <div class="content">
      ${
        hotLeads.length > 0
          ? `
      <div class="section">
        <div class="section-title">🔥 Hot Leads (${hotLeads.length})</div>
        ${hotLeads
          .map(
            (lead: any) => `
        <div class="lead-card hot">
          <div class="lead-header">
            <div class="lead-name">${escapeHtml(lead.name)}</div>
            <span class="lead-badge badge-hot">HOT ${lead.score_total}/100</span>
          </div>
          <div class="lead-info">📧 ${escapeHtml(lead.email)}</div>
          ${lead.company ? `<div class="lead-info">🏢 ${escapeHtml(lead.company)}</div>` : ""}
          ${lead.phone ? `<div class="lead-info">📞 ${escapeHtml(lead.phone)}</div>` : ""}
          <div class="lead-info">💼 ${escapeHtml(lead.project_type)} | Budget: ${lead.estimate?.min?.toLocaleString()}-${lead.estimate?.max?.toLocaleString()} EUR</div>
          <div class="lead-score">
            <div class="score-bar">
              <div class="score-fill" style="width: ${lead.score_total}%"></div>
            </div>
            <div class="score-text">${lead.score_total}/100</div>
          </div>
        </div>
        `,
          )
          .join("")}
      </div>
      `
          : ""
      }

      ${
        warmLeads.length > 0
          ? `
      <div class="section">
        <div class="section-title">⚡ Warm Leads (${warmLeads.length})</div>
        ${warmLeads
          .slice(0, 5)
          .map(
            (lead: any) => `
        <div class="lead-card warm">
          <div class="lead-header">
            <div class="lead-name">${escapeHtml(lead.name)}</div>
            <span class="lead-badge badge-warm">WARM ${lead.score_total}/100</span>
          </div>
          <div class="lead-info">📧 ${escapeHtml(lead.email)}</div>
          <div class="lead-info">💼 ${escapeHtml(lead.project_type)} | Budget: ${lead.estimate?.min?.toLocaleString()}-${lead.estimate?.max?.toLocaleString()} EUR</div>
        </div>
        `,
          )
          .join("")}
        ${warmLeads.length > 5 ? `<p style="text-align: center; color: #999;">... et ${warmLeads.length - 5} autres warm leads</p>` : ""}
      </div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://smidjan.be"}/admin/leads" class="cta">
          Voir tous les leads
        </a>
      </div>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <h3 style="margin-top: 0;">📈 Résumé</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Total leads: <strong>${stats.total}</strong></li>
          <li>Hot leads: <strong>${stats.hot}</strong></li>
          <li>Warm leads: <strong>${stats.warm}</strong></li>
          <li>Cold leads: <strong>${stats.cold}</strong></li>
          <li>Score moyen: <strong>${stats.avgScore}/100</strong></li>
          <li>Valeur totale estimée: <strong>${stats.totalValue.toLocaleString()} EUR</strong></li>
        </ul>
      </div>
    </div>

    <div class="footer">
      Smidjan Lead Scoring System<br>
      Généré automatiquement le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}
    </div>
  </div>
</body>
</html>
  `;
}

// Vercel Cron uses GET; keep POST for manual/external triggers.
export const GET = handleDigest;
export const POST = handleDigest;
