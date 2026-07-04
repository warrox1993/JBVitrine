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
import {
  validateContentType,
  validateCSRF,
  validateRecaptcha,
} from "@/lib/api/middleware";
import { validateEmail, validateName } from "@/lib/validation";

// Hard cap on request body size for this route (defense against blob spam).
const MAX_LEADS_BODY_BYTES = 100 * 1024; // 100 KB

const VALID_GRADES = ["HOT", "WARM", "COLD", "SPAM"] as const;
type LeadGrade = (typeof VALID_GRADES)[number];

/**
 * Clamp an arbitrary client-provided numeric field into [0, 100].
 * NaN / Infinity / non-numeric → 0 (never trusted blindly).
 */
function clampScore(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n)));
}

/**
 * Coerce a client numeric into a finite bounded number (for estimates).
 */
function boundedNumber(value: unknown, min: number, max: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(max, Math.max(min, n));
}

/**
 * Authoritative server-side grade derived ONLY from the validated total score.
 * The client-provided `grade` is never trusted to trigger notifications.
 * Thresholds mirror RealTimeScorer.calculateTotalScore().
 */
function gradeFromScore(total: number): LeadGrade {
  if (total >= 80) return "HOT";
  if (total >= 60) return "WARM";
  if (total >= 40) return "COLD";
  return "SPAM";
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Payload size guard (reject oversized blobs before parsing)
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_LEADS_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload too large" },
        { status: 413 },
      );
    }

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

    // ✅ Content-Type validation (middleware)
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) return contentTypeCheck.response;

    // ✅ CSRF Protection (middleware)
    const csrfCheck = validateCSRF(request);
    if (!csrfCheck.success) return csrfCheck.response;

    const body = await request.json();
    const {
      lead,
      score,
      quoteData,
      estimate,
      behavioral,
      recaptchaToken,
    } = body ?? {};

    // ✅ reCAPTCHA verification (middleware) — closest existing action name
    const recaptchaCheck = await validateRecaptcha(
      request,
      recaptchaToken,
      "lead_capture",
    );
    if (!recaptchaCheck.success) return recaptchaCheck.response;

    if (!lead || typeof lead !== "object" || !score || !quoteData) {
      return NextResponse.json(
        { error: "Missing required fields: lead, score, quoteData" },
        { status: 400 },
      );
    }

    // ---- Strict input validation (never trust client scoring) ----

    // Email is required and must be a valid address.
    if (typeof lead.email !== "string" || !validateEmail(lead.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Name is optional but, when present, must pass shared validation.
    if (lead.name !== undefined && lead.name !== null && lead.name !== "") {
      const nameError = validateName(String(lead.name));
      if (nameError) {
        return NextResponse.json({ error: nameError }, { status: 400 });
      }
    }

    // Company / phone length bounds (loose; stored as enrichment blob).
    if (typeof lead.company === "string" && lead.company.length > 100) {
      return NextResponse.json({ error: "Company too long" }, { status: 400 });
    }
    if (typeof lead.phone === "string" && lead.phone.length > 40) {
      return NextResponse.json({ error: "Phone too long" }, { status: 400 });
    }

    // projectType must be a bounded string.
    if (
      quoteData.projectType !== undefined &&
      (typeof quoteData.projectType !== "string" ||
        quoteData.projectType.length > 100)
    ) {
      return NextResponse.json(
        { error: "Invalid projectType" },
        { status: 400 },
      );
    }

    // The client-provided grade, if present, must be in the whitelist.
    if (
      score.grade !== undefined &&
      !VALID_GRADES.includes(score.grade as LeadGrade)
    ) {
      return NextResponse.json({ error: "Invalid grade" }, { status: 400 });
    }

    // Clamp all numeric score fields; recompute grade server-side.
    const safeTotal = clampScore(score.total);
    const safeConfidence = clampScore(score.confidence);
    const safeGrade = gradeFromScore(safeTotal);
    const safeEstimateMin = boundedNumber(estimate?.min, 0, 100_000_000);
    const safeEstimateMax = boundedNumber(estimate?.max, 0, 100_000_000);
    // Only keep breakdown if it is a plain object.
    const safeBreakdown =
      score.breakdown && typeof score.breakdown === "object"
        ? score.breakdown
        : {};

    const timestamp = new Date().toISOString();

    // Log for debugging
    console.log(`🎯 New lead captured:`, {
      email: lead.email,
      company: lead.company,
      grade: safeGrade,
      total: safeTotal,
      confidence: safeConfidence,
      projectType: quoteData.projectType,
      budget: `${safeEstimateMin}-${safeEstimateMax}`,
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
      score_total: safeTotal,
      score_grade: safeGrade,
      score_confidence: safeConfidence,
      score_breakdown: safeBreakdown,
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
    //    Uses the SERVER-recomputed grade — never the client-provided one —
    //    so a forged `grade: "HOT"` cannot trigger email/Slack/Discord bombs.
    if (safeGrade === "HOT" || safeGrade === "WARM") {
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
            estimateMin: safeEstimateMin,
            estimateMax: safeEstimateMax,
            score: safeTotal,
            grade: safeGrade,
            confidence: safeConfidence,
            breakdown: safeBreakdown,
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
      score: safeTotal,
      grade: safeGrade,
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

    // Get query parameters for pagination (clamped; reject NaN abuse)
    const { searchParams } = new URL(request.url);
    const rawLimit = parseInt(searchParams.get("limit") || "50", 10);
    const rawOffset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = Math.min(Math.max(1, Number.isNaN(rawLimit) ? 50 : rawLimit), 100);
    const offset = Math.max(0, Number.isNaN(rawOffset) ? 0 : rawOffset);
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
