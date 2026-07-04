import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/email/resend-client";
import { contactLimiter, getClientIdentifier } from "@/lib/rate-limit-redis";
import {
  isDisposableEmail,
  hasSuspiciousEmailPattern,
} from "./disposable-emails";
import { checkForSpam } from "./spam-detection";
import {
  getConfirmationEmailHtml,
  getTeamNotificationEmailHtml,
} from "./email-templates";
import { validateEmail, sanitizeString, validatePhone } from "@/lib/validation";
import {
  validateContentType,
  validateCSRF,
  validateRecaptcha,
} from "@/lib/api/middleware";

type ContactFormData = {
  type: "projet" | "support" | "partenariat";
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
  consent: boolean;
  honeypot?: string;
  formStartTime?: number;
  recaptchaToken?: string;
  utm?: {
    source?: string | null;
    campaign?: string | null;
  };
};

type FieldErrors = {
  [key: string]: string;
};

const validateField = (name: string, value: unknown): string | null => {
  switch (name) {
    case "type":
      if (
        !value ||
        !["projet", "support", "partenariat"].includes(String(value))
      ) {
        return "Type de demande invalide";
      }
      return null;

    case "name":
      if (!value || typeof value !== "string") {
        return "Le nom est requis";
      }
      if (value.length < 2 || value.length > 80) {
        return "Le nom doit contenir entre 2 et 80 caractères";
      }
      // Reject names containing numbers
      if (/\d/.test(value)) {
        return "Le nom ne peut pas contenir de chiffres";
      }
      // Reject names with excessive special characters (allow letters, spaces, hyphens, apostrophes, periods)
      if (/[^a-zA-ZÀ-ÿ\s\-'.]/g.test(value)) {
        return "Le nom contient des caractères non autorisés";
      }
      return null;

    case "email":
      if (!value || typeof value !== "string") {
        return "L'email est requis";
      }
      if (!validateEmail(value)) {
        return "Email invalide";
      }
      return null;

    case "phone":
      if (value && typeof value === "string") {
        if (!validatePhone(value)) {
          return "Format de téléphone invalide";
        }
      }
      return null;

    case "company":
      if (value && typeof value === "string") {
        if (value.length > 100) {
          return "Le nom de l'entreprise est trop long (max 100 caractères)";
        }
        // Reject if contains suspicious patterns
        if (/<script|javascript:|onerror=/i.test(value)) {
          return "Caractères non autorisés détectés";
        }
      }
      return null;

    case "message":
      if (!value || typeof value !== "string") {
        return "La description est requise";
      }
      if (value.length < 30 || value.length > 1500) {
        return "La description doit contenir entre 30 et 1 500 caractères";
      }
      return null;

    case "consent":
      if (value !== true) {
        return "Vous devez accepter les conditions";
      }
      return null;

    default:
      return null;
  }
};

// Main POST handler
export async function POST(request: NextRequest) {
  try {
    // 🔍 Dev: Verify Redis configuration
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Redis configured:", !!process.env.UPSTASH_REDIS_REST_URL);
    }

    // ✅ Rate limiting with Redis (5 requests per hour)
    const clientIdentifier = getClientIdentifier(request);
    const { success, limit, remaining, reset } =
      await contactLimiter.limit(clientIdentifier);

    if (!success) {
      console.warn("⚠️ Contact rate limit exceeded:", {
        identifier: clientIdentifier,
        limit,
        reset: new Date(reset).toISOString(),
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            "Trop de requêtes. Veuillez réessayer dans quelques instants ou nous contacter à smidjan.agency@outlook.com.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(reset).toISOString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    console.log("✅ Contact rate limit OK:", { remaining, limit });

    // ✅ Content-Type validation (middleware)
    const contentTypeCheck = validateContentType(request);
    if (!contentTypeCheck.success) return contentTypeCheck.response;

    // ✅ CSRF Protection (middleware)
    const csrfCheck = validateCSRF(request);
    if (!csrfCheck.success) return csrfCheck.response;

    const body: ContactFormData = await request.json();

    // ✅ reCAPTCHA verification (middleware)
    const recaptchaCheck = await validateRecaptcha(
      request,
      body.recaptchaToken,
      "contact_form",
    );
    if (!recaptchaCheck.success) return recaptchaCheck.response;

    // Honeypot validation - bots typically fill hidden fields
    if (body.honeypot) {
      console.warn("Bot detected via honeypot field", {
        ip: clientIdentifier,
        honeypot: body.honeypot,
      });
      // Return success to fool the bot (don't reveal detection)
      return NextResponse.json(
        {
          ok: true,
          ticketId: "BOT-DETECTED",
        },
        { status: 200 },
      );
    }

    // Timestamp validation - detect bots that fill forms too quickly
    if (body.formStartTime) {
      const fillTime = Date.now() - body.formStartTime;
      const minFillTime = 3000; // 3 seconds minimum (humans can't fill form faster)
      const maxFillTime = 3600000; // 1 hour maximum (form session timeout)

      if (fillTime < minFillTime) {
        console.warn("Form filled too quickly - bot detected", {
          ip: clientIdentifier,
          fillTime,
        });
        // Return success to fool the bot (don't reveal detection)
        return NextResponse.json(
          {
            ok: true,
            ticketId: "BOT-DETECTED-TIMING",
          },
          { status: 200 },
        );
      }

      if (fillTime > maxFillTime) {
        console.warn("Form session expired", {
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

    // Validate required fields
    const fieldErrors: FieldErrors = {};
    const requiredFields = ["type", "name", "email", "message", "consent"];

    for (const field of requiredFields) {
      const error = validateField(field, body[field as keyof ContactFormData]);
      if (error) {
        fieldErrors[field] = error;
      }
    }

    // Validate optional fields if provided
    const optionalFields = ["phone", "company"];
    for (const field of optionalFields) {
      const value = body[field as keyof ContactFormData];
      if (value) {
        const error = validateField(field, value);
        if (error) {
          fieldErrors[field] = error;
        }
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation errors",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    // Additional security checks after basic validation

    // 1. Check for disposable/temporary email addresses
    if (isDisposableEmail(body.email)) {
      console.warn("Disposable email detected", {
        ip: clientIdentifier,
        email: body.email,
      });
      return NextResponse.json(
        {
          ok: false,
          message:
            "Les emails temporaires ne sont pas autorisés. Veuillez utiliser une adresse email permanente.",
          fieldErrors: {
            email: "Email temporaire non autorisé",
          },
        },
        { status: 400 },
      );
    }

    // 2. Check for suspicious email patterns
    if (hasSuspiciousEmailPattern(body.email)) {
      console.warn("Suspicious email pattern detected", {
        ip: clientIdentifier,
        email: body.email,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "Format d'email suspect détecté.",
          fieldErrors: {
            email: "Format d'email suspect",
          },
        },
        { status: 400 },
      );
    }

    // 3. Check message for spam content
    const spamCheck = checkForSpam(body.message);
    if (spamCheck.isSpam) {
      console.warn("Spam content detected", {
        ip: clientIdentifier,
        score: spamCheck.score,
        reasons: spamCheck.reasons,
        messagePreview: body.message.substring(0, 100),
      });
      return NextResponse.json(
        {
          ok: false,
          message:
            "Votre message a été détecté comme spam. Veuillez rédiger un message professionnel sans liens excessifs ni majuscules abusives.",
          fieldErrors: {
            message: `Message suspect: ${spamCheck.reasons.join(", ")}`,
          },
        },
        { status: 400 },
      );
    }

    // 4. Validate budget value matches select options
    if (body.budget) {
      const validBudgets = ["<2000", "2-5k", "5-10k", "10-25k", ">25k"];
      if (!validBudgets.includes(body.budget)) {
        console.warn("Invalid budget value", {
          ip: clientIdentifier,
          budget: body.budget,
        });
        return NextResponse.json(
          {
            ok: false,
            message: "Valeur de budget invalide",
          },
          { status: 400 },
        );
      }
    }

    // 5. Validate timeline value matches select options
    if (body.timeline) {
      const validTimelines = ["asap", "1m", "2-3m", ">3m"];
      if (!validTimelines.includes(body.timeline)) {
        console.warn("Invalid timeline value", {
          ip: clientIdentifier,
          timeline: body.timeline,
        });
        return NextResponse.json(
          {
            ok: false,
            message: "Valeur de délai invalide",
          },
          { status: 400 },
        );
      }
    }

    // Generate ticket ID
    const ticketId = `C-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;

    // Sanitize all string inputs for safe logging and email rendering
    const sanitizedData = {
      type: body.type,
      name: sanitizeString(body.name),
      email: sanitizeString(body.email),
      phone: body.phone ? sanitizeString(body.phone) : null,
      company: body.company ? sanitizeString(body.company) : null,
      budget: body.budget,
      timeline: body.timeline,
      message: sanitizeString(body.message),
      utm: {
        source: body.utm?.source ? sanitizeString(body.utm.source) : null,
        campaign: body.utm?.campaign ? sanitizeString(body.utm.campaign) : null,
      },
    };

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email to team
    // 3. Send confirmation email to user
    // 4. Log to analytics/CRM

    console.log("Contact form submission:", {
      ticketId,
      ...sanitizedData,
      timestamp: new Date().toISOString(),
    });

    // Send emails using Resend
    await sendConfirmationEmail(
      sanitizedData.email,
      sanitizedData.name,
      ticketId,
    );
    await sendNotificationToTeam(sanitizedData as ContactFormData, ticketId);

    return NextResponse.json(
      {
        ok: true,
        ticketId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "temporary_error",
      },
      { status: 500 },
    );
  }
}

// Email sending functions using Resend
async function sendConfirmationEmail(
  email: string,
  name: string,
  ticketId: string,
): Promise<void> {
  try {
    const { data, error } = await getResend().emails.send({
      from: "Smidjan <contact@smidjan.be>",
      to: [email],
      subject: `✅ Demande reçue - ${ticketId}`,
      html: getConfirmationEmailHtml(name, ticketId),
    });

    if (error) {
      console.error("Error sending confirmation email:", error);
      throw new Error(`Failed to send confirmation email: ${error.message}`);
    }

    console.log("Confirmation email sent successfully:", {
      emailId: data?.id,
      to: email,
      ticketId,
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    // Don't throw - we don't want to fail the whole request if confirmation email fails
  }
}

async function sendNotificationToTeam(
  data: ContactFormData,
  ticketId: string,
): Promise<void> {
  try {
    const { data: emailData, error } = await getResend().emails.send({
      from: "Smidjan Contact Form <contact@smidjan.be>",
      to: ["contact@smidjan.be"], // Your team email
      replyTo: data.email, // Allow direct reply to client
      subject: `🎯 Nouveau contact : ${data.type} - ${data.name}`,
      html: getTeamNotificationEmailHtml(data, ticketId),
    });

    if (error) {
      console.error("Error sending team notification:", error);
      throw new Error(`Failed to send team notification: ${error.message}`);
    }

    console.log("Team notification sent successfully:", {
      emailId: emailData?.id,
      ticketId,
      type: data.type,
    });
  } catch (error) {
    console.error("Failed to send team notification:", error);
    throw error; // This one should fail the request if it doesn't work
  }
}
