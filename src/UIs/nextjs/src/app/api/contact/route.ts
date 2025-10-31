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

// Validation helpers
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email to team
    // 3. Send confirmation email to user
    // 4. Log to analytics/CRM

    console.log("Contact form submission:", {
      ticketId,
      type: body.type,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      budget: body.budget,
      timeline: body.timeline,
      message: body.message,
      utm: body.utm,
      timestamp: new Date().toISOString(),
    });

    // Mock email sending
    await sendConfirmationEmail(body.email, body.name, ticketId);
    await sendNotificationToTeam(body);

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
