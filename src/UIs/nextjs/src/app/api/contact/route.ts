import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP, getRateLimitInfo } from "./ratelimit";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  isDisposableEmail,
  hasSuspiciousEmailPattern,
} from "./disposable-emails";
import { checkForSpam } from "./spam-detection";

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
  utm?: {
    source?: string | null;
    campaign?: string | null;
  };
};

type FieldErrors = {
  [key: string]: string;
};

// Sanitization helper - prevent log injection and basic XSS
const sanitizeString = (input: string): string => {
  return input
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\n/g, " ") // Replace newlines with spaces for logs
    .replace(/\r/g, "")
    .trim();
};

// Validation helpers
const validateEmail = (email: string): boolean => {
  // Improved email regex (RFC 5322 simplified)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Use libphonenumber-js for accurate international validation
  try {
    return isValidPhoneNumber(phone);
  } catch (error) {
    return false;
  }
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
    // Get client IP
    const clientIP = getClientIP(request);

    // Rate limiting: 5 requests per minute
    if (!checkRateLimit(clientIP, 5, 60000)) {
      const rateLimitInfo = getRateLimitInfo(clientIP, 5);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Trop de requêtes. Veuillez réessayer dans quelques instants ou nous contacter à contact@smidjan.dev.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
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

    // CSRF Protection via Origin/Referer validation
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const host = request.headers.get("host");

    // Allow requests from same origin or localhost (development)
    const isLocalhost =
      host?.includes("localhost") || host?.includes("127.0.0.1");
    const isValidOrigin =
      isLocalhost ||
      origin?.includes(host || "") ||
      referer?.includes(host || "");

    if (!isValidOrigin) {
      console.warn("CSRF attempt detected", {
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

    const body: ContactFormData = await request.json();

    // Honeypot validation - bots typically fill hidden fields
    if (body.honeypot) {
      console.warn("Bot detected via honeypot field", {
        ip: clientIP,
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
          ip: clientIP,
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
        ip: clientIP,
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
        ip: clientIP,
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
        ip: clientIP,
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
          ip: clientIP,
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
          ip: clientIP,
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

    // Mock email sending (using sanitized data)
    await sendConfirmationEmail(
      sanitizedData.email,
      sanitizedData.name,
      ticketId,
    );
    await sendNotificationToTeam(sanitizedData as ContactFormData);

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

// Mock functions for email sending (replace with actual implementation)
async function sendConfirmationEmail(
  email: string,
  name: string,
  ticketId: string,
): Promise<void> {
  // TODO: Implement with your email service (SendGrid, Resend, etc.)
  console.log(`Sending confirmation email to ${email}:

    Bonjour ${name},

    Merci pour votre message ! Nous avons bien reçu votre demande.
    Numéro de ticket : ${ticketId}

    Nous reviendrons vers vous sous 24h ouvrées.

    L'équipe Smidjan
    `);
}

async function sendNotificationToTeam(data: ContactFormData): Promise<void> {
  // TODO: Implement with your email service or Slack notification
  console.log("Sending notification to team:", {
    type: data.type,
    name: data.name,
    email: data.email,
    message: data.message.substring(0, 100) + "...",
  });
}
