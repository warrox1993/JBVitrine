import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteLimiter, getClientIdentifier } from "@/lib/rate-limit-redis";
import {
  isDisposableEmail,
  hasSuspiciousEmailPattern,
} from "../contact/disposable-emails";
import {
  QuoteSubmission,
  ProjectType,
} from "@/components/contact/QuoteWizard/types";
import {
  getQuoteConfirmationEmailHtml,
  getQuoteTeamNotificationEmailHtml,
} from "./email-templates";
import {
  validateEmail,
  sanitizeString,
  validatePhone,
} from "@/lib/validation";
import {
  validateContentType,
  validateCSRF,
  validateRecaptcha,
} from "@/lib/api/middleware";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Project type validation helper
const validateProjectType = (type: string): boolean => {
  const validTypes: ProjectType[] = [
    "siteVitrine",
    "ecommerce",
    "appWeb",
    "auditCyber",
    "aiAutomation",
    "cmsBlog",
  ];
  return validTypes.includes(type as ProjectType);
};

// Main POST handler
export async function POST(request: NextRequest) {
  try {
    // 🔍 Dev: Verify Redis configuration
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Redis configured:', !!process.env.UPSTASH_REDIS_REST_URL);
    }

    // Get client identifier for rate limiting
    const clientIdentifier = getClientIdentifier(request);

    // ✅ Rate limiting with Redis: Check BEFORE validations (fail fast)
    const { success, limit, remaining, reset } = await quoteLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn('⚠️ Quote rate limit exceeded:', {
        identifier: clientIdentifier,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "Trop de requêtes. Veuillez réessayer plus tard.",
          errorCode: "RATE_LIMIT_EXCEEDED",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      );
    }
    console.log('✅ Quote rate limit OK:', { remaining, limit });

    // ✅ Content-Type validation (middleware)
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) return contentTypeCheck.response;

    // ✅ CSRF Protection (middleware)
    const csrfCheck = validateCSRF(request);
    if (!csrfCheck.success) return csrfCheck.response;

    const body: QuoteSubmission = await request.json();

    // ✅ reCAPTCHA verification (middleware)
    const recaptchaCheck = await validateRecaptcha(request, body.recaptchaToken, "quote_submission");
    if (!recaptchaCheck.success) return recaptchaCheck.response;

    // Timestamp validation - quote wizard should take at least 10 seconds
    if (body.formStartTime) {
      const fillTime = Date.now() - body.formStartTime;
      const minFillTime = 10000; // 10 seconds minimum
      const maxFillTime = 3600000; // 1 hour maximum

      if (fillTime < minFillTime) {
        console.warn("Quote filled too quickly - bot detected", {
          ip: clientIdentifier,
          fillTime,
        });
        return NextResponse.json(
          {
            ok: true,
            quoteId: "BOT-DETECTED-TIMING",
          },
          { status: 200 },
        );
      }

      if (fillTime > maxFillTime) {
        console.warn("Quote session expired", {
          ip: clientIdentifier,
          fillTime,
        });
        return NextResponse.json(
          {
            ok: false,
            message:
              "Votre session a expiré. Veuillez rafraîchir la page et soumettre à nouveau.",
          },
          { status: 400 },
        );
      }
    }

    // Validate quote data structure
    if (
      !body.estimate ||
      !body.quoteData ||
      !body.contactInfo ||
      !body.leadScore
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Données de devis invalides",
        },
        { status: 400 },
      );
    }

    // Validate contact info
    const { contactInfo } = body;
    const errors: Record<string, string> = {};

    if (!contactInfo.name || contactInfo.name.length < 2) {
      errors.name = "Le nom est requis (minimum 2 caractères)";
    }

    if (!contactInfo.email || !validateEmail(contactInfo.email)) {
      errors.email = "Email invalide";
    }

    if (contactInfo.phone && !validatePhone(contactInfo.phone)) {
      errors.phone = "Numéro de téléphone invalide";
    }

    if (!contactInfo.consent) {
      errors.consent = "Vous devez accepter la politique de confidentialité";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Erreurs de validation",
          fieldErrors: errors,
        },
        { status: 400 },
      );
    }

    // Validate project type
    if (
      !body.quoteData.projectType ||
      !validateProjectType(body.quoteData.projectType)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Type de projet invalide",
        },
        { status: 400 },
      );
    }

    // Check for disposable email
    if (isDisposableEmail(contactInfo.email)) {
      console.warn("Disposable email in quote submission", {
        ip: clientIdentifier,
        email: contactInfo.email,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "Les emails temporaires ne sont pas autorisés",
          fieldErrors: {
            email: "Email temporaire non autorisé",
          },
        },
        { status: 400 },
      );
    }

    // Check for suspicious email patterns
    if (hasSuspiciousEmailPattern(contactInfo.email)) {
      console.warn("Suspicious email in quote submission", {
        ip: clientIdentifier,
        email: contactInfo.email,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "Format d'email suspect détecté",
          fieldErrors: {
            email: "Format d'email suspect",
          },
        },
        { status: 400 },
      );
    }

    // Validate estimate amounts are reasonable (prevent manipulation)
    if (body.estimate.min < 0 || body.estimate.max < body.estimate.min) {
      console.warn("Invalid price manipulation detected", {
        ip: clientIdentifier,
        estimate: body.estimate,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "Données de prix invalides",
        },
        { status: 400 },
      );
    }

    // Generate quote ID
    const quoteId = `Q-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;

    // Sanitize contact info
    const sanitizedContactInfo = {
      name: sanitizeString(contactInfo.name),
      email: sanitizeString(contactInfo.email),
      phone: contactInfo.phone ? sanitizeString(contactInfo.phone) : "",
      company: contactInfo.company ? sanitizeString(contactInfo.company) : "",
      message: contactInfo.message ? sanitizeString(contactInfo.message) : "",
      consent: contactInfo.consent,
    };

    // Log submission
    console.log("Quote submission received:", {
      quoteId,
      projectType: body.quoteData.projectType,
      estimateMin: body.estimate.min,
      estimateMax: body.estimate.max,
      leadScore: body.leadScore.score,
      leadPriority: body.leadScore.priority,
      email: sanitizedContactInfo.email,
      timestamp: new Date().toISOString(),
    });


    // ✅ Save to database (for backward compatibility)
    try {
      const { db } = await import("@/lib/db");

      await db.quotes.create({
        email: sanitizedContactInfo.email,
        name: sanitizedContactInfo.name,
        company: sanitizedContactInfo.company,
        phone: sanitizedContactInfo.phone,
        project_type: body.quoteData.projectType,
        estimate: body.estimate,
        quote_data: body.quoteData,
        lead_score: body.leadScore.score,
        utm_source: body.utm?.source || undefined,
        utm_medium: body.utm?.medium || undefined,
        utm_campaign: body.utm?.campaign || undefined,
        form_start_time: body.formStartTime,
        submission_timestamp: body.timestamp,
      });

      console.log(`✅ Quote saved to database: ${quoteId}`);
    } catch (dbError) {
      console.error("❌ Failed to save quote to database:", {
        error: dbError instanceof Error ? dbError.message : String(dbError),
        stack: dbError instanceof Error ? dbError.stack : undefined,
        quoteId,
        email: sanitizedContactInfo.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            "Erreur lors de la sauvegarde. Veuillez réessayer dans quelques instants.",
          errorCode: "DATABASE_ERROR",
        },
        { status: 500 },
      );
    }

    // Send emails
    await sendQuoteConfirmationEmail(
      sanitizedContactInfo.email,
      sanitizedContactInfo.name,
      quoteId,
      body.estimate,
    );

    await sendQuoteNotificationToTeam(body, sanitizedContactInfo, quoteId);

    return NextResponse.json(
      {
        ok: true,
        quoteId,
        message: "Demande de devis envoyée avec succès",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Quote API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur. Veuillez réessayer.",
      },
      { status: 500 },
    );
  }
}

// Email sending functions
async function sendQuoteConfirmationEmail(
  email: string,
  name: string,
  quoteId: string,
  estimate: QuoteSubmission["estimate"],
): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Smidjan <contact@smidjan.be>",
      to: [email],
      subject: `✅ Votre demande de devis - ${quoteId}`,
      html: getQuoteConfirmationEmailHtml(name, quoteId, estimate),
    });

    if (error) {
      console.error("Error sending quote confirmation email:", error);
      throw new Error(`Failed to send confirmation: ${error.message}`);
    }

    console.log("Quote confirmation email sent:", {
      emailId: data?.id,
      to: email,
      quoteId,
    });
  } catch (error) {
    console.error("Failed to send quote confirmation:", error);
    // Don't throw - non-critical
  }
}

async function sendQuoteNotificationToTeam(
  submission: QuoteSubmission,
  contactInfo: ReturnType<typeof sanitizeString> extends string
    ? Record<string, string | boolean>
    : never,
  quoteId: string,
): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Smidjan Quote System <contact@smidjan.be>",
      to: ["contact@smidjan.be"],
      replyTo: contactInfo.email as string,
      subject: `${submission.leadScore.priority === "high" ? "🔥" : submission.leadScore.priority === "medium" ? "⚡" : "📋"} Nouveau devis : ${submission.quoteData.projectType} - Score ${submission.leadScore.score}/100`,
      html: getQuoteTeamNotificationEmailHtml(submission, contactInfo, quoteId),
    });

    if (error) {
      console.error("Error sending team notification:", error);
      throw new Error(`Failed to send team notification: ${error.message}`);
    }

    console.log("Quote team notification sent:", {
      emailId: data?.id,
      quoteId,
      priority: submission.leadScore.priority,
    });
  } catch (error) {
    console.error("Failed to send team notification:", error);
    throw error; // This one should fail the request
  }
}

