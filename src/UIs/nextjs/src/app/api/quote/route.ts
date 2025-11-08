import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitInfo,
} from "../contact/ratelimit";
import {
  isDisposableEmail,
  hasSuspiciousEmailPattern,
} from "../contact/disposable-emails";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  QuoteSubmission,
  ProjectType,
} from "@/components/contact/QuoteWizard/types";
import {
  getQuoteConfirmationEmailHtml,
  getQuoteTeamNotificationEmailHtml,
} from "./email-templates";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Sanitization helper
const sanitizeString = (input: string): string => {
  return input
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\n/g, " ") // Replace newlines with spaces for logs
    .replace(/\r/g, "")
    .trim();
};

// Validation helpers
const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  try {
    return isValidPhoneNumber(phone);
  } catch (error) {
    return false;
  }
};

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
    // Get client IP
    const clientIP = getClientIP(request);

    // Rate limiting: 3 quote requests per hour (stricter than contact form)
    if (!checkRateLimit(clientIP, 3, 3600000)) {
      const rateLimitInfo = getRateLimitInfo(clientIP, 3);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Trop de demandes de devis. Veuillez réessayer plus tard ou nous contacter directement.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "3",
            "X-RateLimit-Remaining": String(rateLimitInfo.remaining),
            "X-RateLimit-Reset": String(
              Math.floor(rateLimitInfo.resetTime / 1000),
            ),
            "Retry-After": String(
              Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000),
            ),
          },
        },
      );
    }

    // Validate Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        {
          ok: false,
          message: "Content-Type must be application/json",
        },
        { status: 415 },
      );
    }

    // CSRF Protection
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const host = request.headers.get("host");

    const isLocalhost =
      host?.includes("localhost") || host?.includes("127.0.0.1");
    const isValidOrigin =
      isLocalhost ||
      origin?.includes(host || "") ||
      referer?.includes(host || "");

    if (!isValidOrigin) {
      console.warn("CSRF attempt detected on quote API", {
        ip: clientIP,
        origin,
        referer,
        host,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid request origin",
        },
        { status: 403 },
      );
    }

    const body: QuoteSubmission = await request.json();

    // Timestamp validation - quote wizard should take at least 10 seconds
    if (body.formStartTime) {
      const fillTime = Date.now() - body.formStartTime;
      const minFillTime = 10000; // 10 seconds minimum
      const maxFillTime = 3600000; // 1 hour maximum

      if (fillTime < minFillTime) {
        console.warn("Quote filled too quickly - bot detected", {
          ip: clientIP,
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
          ip: clientIP,
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
        ip: clientIP,
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
        ip: clientIP,
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
        ip: clientIP,
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
      console.error("❌ Failed to save quote to database:", dbError);
      // Don't fail the request if database save fails
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
      to: ["jeanbaptiste.dhondt1@gmail.com"],
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
