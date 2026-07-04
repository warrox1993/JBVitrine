import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/email/resend-client";
import { quoteLimiter, getClientIdentifier } from "@/lib/rate-limit-redis";
import {
  isDisposableEmail,
  hasSuspiciousEmailPattern,
} from "../contact/disposable-emails";
import {
  QuoteSubmission,
  ProjectType,
} from "@/components/features/contact/QuoteWizard/types";
import {
  getQuoteConfirmationEmailHtml,
  getQuoteTeamNotificationEmailHtml,
} from "./email-templates";
import { validateEmail, sanitizeString, validatePhone } from "@/lib/validation";
import {
  validateContentType,
  validateCSRF,
  validateRecaptcha,
} from "@/lib/api/middleware";

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
  const apiStartTime = Date.now();
  console.log("[Quote API] ===== REQUEST START =====");

  try {
    // 🔍 Dev: Verify Redis configuration
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[Quote API] 🔍 Redis configured:",
        !!process.env.UPSTASH_REDIS_REST_URL,
      );
    }

    // Get client identifier for rate limiting
    const clientIdentifier = getClientIdentifier(request);
    console.log(
      "[Quote API] 📍 Client identifier:",
      clientIdentifier.substring(0, 15) + "...",
    );

    // ✅ Rate limiting with Redis: Check BEFORE validations (fail fast)
    const { success, limit, remaining, reset } =
      await quoteLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn("[Quote API] ⚠️ Rate limit exceeded:", {
        identifier: clientIdentifier.substring(0, 15) + "...",
        resetIn: Math.ceil((reset - Date.now()) / 1000) + "s",
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
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      );
    }
    console.log("[Quote API] ✅ Rate limit OK:", { remaining, limit });

    // ✅ Content-Type validation (middleware)
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) {
      console.warn("[Quote API] ❌ Content-Type validation failed");
      return contentTypeCheck.response;
    }
    console.log("[Quote API] ✅ Content-Type OK");

    // ✅ CSRF Protection (middleware)
    const csrfCheck = validateCSRF(request);
    if (!csrfCheck.success) {
      console.warn("[Quote API] ❌ CSRF validation failed");
      return csrfCheck.response;
    }
    console.log("[Quote API] ✅ CSRF OK");

    const body: QuoteSubmission = await request.json();
    console.log("[Quote API] 📦 Body received:", {
      hasEstimate: !!body.estimate,
      hasQuoteData: !!body.quoteData,
      hasContactInfo: !!body.contactInfo,
      hasLeadScore: !!body.leadScore,
      hasRecaptchaToken: !!body.recaptchaToken,
      recaptchaTokenLength: body.recaptchaToken?.length || 0,
      projectType: body.quoteData?.projectType,
      email: body.contactInfo?.email,
    });

    // ✅ reCAPTCHA verification (middleware)
    console.log("[Quote API] 🔐 Verifying reCAPTCHA...");
    const recaptchaCheck = await validateRecaptcha(
      request,
      body.recaptchaToken,
      "quote_submission",
    );
    if (!recaptchaCheck.success) {
      console.warn("[Quote API] ❌ reCAPTCHA validation failed");
      return recaptchaCheck.response;
    }
    console.log("[Quote API] ✅ reCAPTCHA OK");

    // Timestamp validation - quote wizard should take at least 10 seconds
    if (body.formStartTime) {
      const fillTime = Date.now() - body.formStartTime;
      const minFillTime = 10000; // 10 seconds minimum
      const maxFillTime = 3600000; // 1 hour maximum

      console.log("[Quote API] ⏱️ Timestamp validation:", {
        fillTime: `${fillTime}ms`,
        fillTimeSeconds: Math.round(fillTime / 1000),
        minRequired: `${minFillTime}ms`,
        maxAllowed: `${maxFillTime}ms`,
      });

      if (fillTime < minFillTime) {
        console.warn("[Quote API] 🤖 Bot detected - form filled too quickly:", {
          ip: clientIdentifier.substring(0, 15) + "...",
          fillTime: `${fillTime}ms`,
          minRequired: `${minFillTime}ms`,
        });
        // ✅ FIX: Return 400 with ok: false instead of 200 with ok: true
        return NextResponse.json(
          {
            ok: false,
            message:
              "Formulaire soumis trop rapidement. Veuillez prendre votre temps.",
            errorCode: "BOT_DETECTED",
          },
          { status: 400 },
        );
      }

      if (fillTime > maxFillTime) {
        console.warn("[Quote API] ⏰ Session expired:", {
          ip: clientIdentifier.substring(0, 15) + "...",
          fillTime: `${fillTime}ms`,
        });
        return NextResponse.json(
          {
            ok: false,
            message:
              "Votre session a expiré. Veuillez rafraîchir la page et soumettre à nouveau.",
            errorCode: "SESSION_EXPIRED",
          },
          { status: 400 },
        );
      }
      console.log("[Quote API] ✅ Timestamp OK");
    } else {
      console.warn("[Quote API] ⚠️ No formStartTime provided");
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
    console.log(
      "[Quote API] 📧 Sending confirmation email to:",
      sanitizedContactInfo.email,
    );
    await sendQuoteConfirmationEmail(
      sanitizedContactInfo.email,
      sanitizedContactInfo.name,
      quoteId,
      body.estimate,
    );

    console.log("[Quote API] 📧 Sending team notification email...");
    await sendQuoteNotificationToTeam(body, sanitizedContactInfo, quoteId);

    const totalDuration = Date.now() - apiStartTime;
    console.log("[Quote API] ===== REQUEST SUCCESS =====", {
      quoteId,
      totalDuration: `${totalDuration}ms`,
      email: sanitizedContactInfo.email,
    });

    return NextResponse.json(
      {
        ok: true,
        quoteId,
        message: "Demande de devis envoyée avec succès",
      },
      { status: 200 },
    );
  } catch (error) {
    const totalDuration = Date.now() - apiStartTime;
    console.error("[Quote API] ===== REQUEST FAILED =====", {
      error: error instanceof Error ? error.message : String(error),
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      totalDuration: `${totalDuration}ms`,
    });

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
  const startTime = Date.now();
  console.log("[Email] 📧 Sending confirmation email...", {
    to: email,
    quoteId,
  });

  try {
    const { data, error } = await getResend().emails.send({
      from: "Smidjan <contact@smidjan.be>",
      to: [email],
      subject: `Votre demande de devis - ${quoteId}`,
      html: getQuoteConfirmationEmailHtml(name, quoteId, estimate),
    });

    const duration = Date.now() - startTime;

    if (error) {
      console.error("[Email] ❌ Resend API error (confirmation):", {
        error: error.message,
        to: email,
        quoteId,
        duration: `${duration}ms`,
      });
      throw new Error(`Failed to send confirmation: ${error.message}`);
    }

    console.log("[Email] ✅ Confirmation email sent:", {
      emailId: data?.id,
      to: email,
      quoteId,
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[Email] ❌ Failed to send confirmation:", {
      error: error instanceof Error ? error.message : String(error),
      to: email,
      quoteId,
      duration: `${duration}ms`,
    });
    // Don't throw - non-critical (user still gets their quote saved)
  }
}

async function sendQuoteNotificationToTeam(
  submission: QuoteSubmission,
  contactInfo: ReturnType<typeof sanitizeString> extends string
    ? Record<string, string | boolean>
    : never,
  quoteId: string,
): Promise<void> {
  const startTime = Date.now();
  console.log("[Email] 📧 Sending team notification...", {
    quoteId,
    priority: submission.leadScore.priority,
  });

  try {
    const { data, error } = await getResend().emails.send({
      from: "Smidjan Quote System <contact@smidjan.be>",
      to: ["smidjan.agency@outlook.com"],
      replyTo: contactInfo.email as string,
      subject: `[${submission.leadScore.priority === "high" ? "URGENT" : submission.leadScore.priority === "medium" ? "MOYEN" : "STANDARD"}] Nouveau devis : ${submission.quoteData.projectType} - Score ${submission.leadScore.score}/100`,
      html: getQuoteTeamNotificationEmailHtml(submission, contactInfo, quoteId),
    });

    const duration = Date.now() - startTime;

    if (error) {
      console.error("[Email] ❌ Resend API error (team notification):", {
        error: error.message,
        quoteId,
        duration: `${duration}ms`,
      });
      throw new Error(`Failed to send team notification: ${error.message}`);
    }

    console.log("[Email] ✅ Team notification sent:", {
      emailId: data?.id,
      quoteId,
      priority: submission.leadScore.priority,
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[Email] ❌ Failed to send team notification:", {
      error: error instanceof Error ? error.message : String(error),
      quoteId,
      duration: `${duration}ms`,
    });
    throw error; // This one should fail the request - we need to know about quote requests
  }
}
