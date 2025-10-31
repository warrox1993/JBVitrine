import { NextRequest, NextResponse } from "next/server";

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
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  // International format: + followed by 1-3 digit country code, then 4-14 digits
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(cleaned);
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
    const body: ContactFormData = await request.json();

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
