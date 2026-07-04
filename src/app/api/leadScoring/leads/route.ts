/**
 * API Route: /api/leadScoring/leads
 *
 * Enregistre les leads complets avec scoring et enrichissement
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import {
  leadScoringLimiter,
  getClientIdentifier,
} from "@/lib/rate-limit-redis";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIdentifier = getClientIdentifier(request);
    const { success, limit, reset } =
      await leadScoringLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn(
        "[LeadScoring/leads] Rate limit exceeded for:",
        clientIdentifier,
      );
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          errorCode: "RATE_LIMIT_EXCEEDED",
        },
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    // Log database connection status
    console.log(
      "[LeadScoring/leads] DATABASE_URL loaded:",
      !!process.env.DATABASE_URL,
    );
    console.log(
      "[LeadScoring/leads] POSTGRES_URL loaded:",
      !!process.env.POSTGRES_URL,
    );

    const {
      lead,
      score,
      quoteData,
      estimate,
      behavioral,
    } = await request.json();

    if (!lead || !score || !quoteData) {
      return NextResponse.json(
        { error: "Missing required fields: lead, score, quoteData" },
        { status: 400 },
      );
    }

    const timestamp = new Date().toISOString();

    // Log for debugging
    console.log(`🎯 New lead captured:`, {
      email: lead.email,
      company: lead.company,
      grade: score.grade,
      total: score.total,
      confidence: score.confidence,
      projectType: quoteData.projectType,
      budget: `${estimate?.min}-${estimate?.max}`,
      timestamp,
    });

    // Afficher le breakdown du score
    console.log(`📊 Score breakdown:`, score.breakdown);

    // Afficher l'enrichissement
    if (lead.clearbit) {
      console.log(`💼 Company enrichment:`, {
        name: lead.clearbit.company.name,
        employees: lead.clearbit.company.employees,
        industry: lead.clearbit.company.industry,
      });
    }

    // Afficher les données comportementales
    if (behavioral) {
      console.log(`🧠 Behavioral data:`, {
        engagementScore: behavioral.engagementScore,
        intentScore: behavioral.intentScore,
        visitedPages: behavioral.visitedPages?.length,
        wizardStep: behavioral.wizardStep,
      });
    }

    // ✅ Save to database
    const savedLead = await db.leads.create({
      email: lead.email,
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      score_total: Math.round(score.total),
      score_grade: score.grade,
      score_confidence: Math.round(score.confidence),
      score_breakdown: score.breakdown,
      enrichment_data: lead,
      enrichment_score: lead.enrichmentScore || 0,
      confidence_level: lead.confidenceLevel || "low",
      project_type: quoteData.projectType,
      quote_data: quoteData,
      estimate: estimate,
      behavioral_data: behavioral,
      session_id: behavioral?.sessionId,
    });

    console.log(`✅ Lead saved to database with ID: ${savedLead.id}`);

    // ✅ Automatic routing for HOT and WARM leads
    if (score.grade === "HOT" || score.grade === "WARM") {
      // Import notification system dynamically to avoid blocking the response
      import("@/lib/notifications")
        .then(({ notifyNewLead }) => {
          notifyNewLead({
            leadId: savedLead.id,
            name: lead.name,
            email: lead.email,
            company: lead.company,
            phone: lead.phone,
            projectType: quoteData.projectType,
            estimateMin: estimate.min,
            estimateMax: estimate.max,
            score: score.total,
            grade: score.grade,
            confidence: score.confidence,
            breakdown: score.breakdown,
          });
        })
        .catch((error) => {
          console.error("❌ Failed to send notifications:", error);
          // Don't fail the request if notifications fail
        });
    }

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      score: score.total,
      grade: score.grade,
    });
  } catch (error) {
    console.error("❌ Error saving lead:", error);
    console.error("❌ Error details:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name,
    });
    return NextResponse.json(
      {
        error: "Failed to save lead",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 🔒 C1 : cet endpoint expose des données personnelles (PII) — réservé au staff
    try {
      await requireAuth("sales");
    } catch (authError) {
      const message = (authError as Error).message || "Unauthorized";
      const status = message.startsWith("Forbidden") ? 403 : 401;
      return NextResponse.json({ error: message }, { status });
    }

    // Rate limiting check
    const clientIdentifier = getClientIdentifier(request);
    const { success, reset } = await leadScoringLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn(
        "[LeadScoring/leads] GET rate limit exceeded for:",
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

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const grade = searchParams.get("grade") as
      | "HOT"
      | "WARM"
      | "COLD"
      | "SPAM"
      | null;

    let leads;

    if (grade) {
      leads = await db.leads.getByGrade(grade);
    } else {
      leads = await db.leads.getAll({ limit, offset });
    }

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("[LeadScoring/leads] Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
