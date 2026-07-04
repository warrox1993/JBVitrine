/**
 * Email templates centralisés - DRY principle
 * Fonctions pour générer les emails HTML
 */

import { EMAIL_STYLES } from "./styles";

/**
 * Template de base pour tous les emails
 */
export const createEmailTemplate = ({
  title,
  content,
  preheader,
}: {
  title: string;
  content: string;
  preheader?: string;
}): string => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${preheader ? `<meta name="description" content="${preheader}">` : ""}
</head>
<body style="${EMAIL_STYLES.body}">
  ${
    preheader
      ? `
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${preheader}
  </div>
  `
      : ""
  }

  <div style="${EMAIL_STYLES.wrapper}">
    <!-- Header -->
    <div style="${EMAIL_STYLES.header}">
      <h1 style="${EMAIL_STYLES.headerTitle}">Smidjan</h1>
    </div>

    <!-- Content -->
    <div style="${EMAIL_STYLES.content}">
      ${content}
    </div>

    <!-- Footer -->
    <div style="${EMAIL_STYLES.footer}">
      <p>Smidjan - Agence Web & Cybersécurité</p>
      <p>
        <a href="https://smidjan.be" style="${EMAIL_STYLES.footerLink}">Visitez notre site</a> •
        <a href="https://smidjan.be/contact" style="${EMAIL_STYLES.footerLink}">Nous contacter</a>
      </p>
      <p style="margin-top: 20px; font-size: 11px; color: #aaa;">
        Vous recevez cet email car vous avez contacté Smidjan.<br>
        Rue Mont Saint-Martin 31, 4000 Liège, Belgique
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Email de confirmation de contact
 */
export const createContactConfirmationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string => {
  const content = `
    <h2 style="${EMAIL_STYLES.sectionTitle}">Message reçu !</h2>

    <p style="${EMAIL_STYLES.paragraph}">
      Bonjour <strong>${firstName} ${lastName}</strong>,
    </p>

    <p style="${EMAIL_STYLES.paragraph}">
      Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais (généralement sous 24h ouvrées).
    </p>

    <div style="${EMAIL_STYLES.infoBox}">
      <p style="${EMAIL_STYLES.label}">Récapitulatif de votre message :</p>
      <p style="${EMAIL_STYLES.value}"><strong>Sujet :</strong> ${subject}</p>
      <p style="${EMAIL_STYLES.value}"><strong>Email :</strong> ${email}</p>
      ${phone ? `<p style="${EMAIL_STYLES.value}"><strong>Téléphone :</strong> ${phone}</p>` : ""}
      <p style="${EMAIL_STYLES.value}"><strong>Message :</strong></p>
      <p style="${EMAIL_STYLES.paragraph}">${message}</p>
    </div>

    <p style="${EMAIL_STYLES.paragraph}">
      En attendant, n'hésitez pas à consulter notre blog ou découvrir nos services :
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://smidjan.be/blog" style="${EMAIL_STYLES.buttonSecondary}">Voir le Blog</a>
      <a href="https://smidjan.be/services" style="${EMAIL_STYLES.buttonSecondary}">Nos Services</a>
    </div>

    <p style="${EMAIL_STYLES.paragraph}">
      À bientôt,<br>
      <strong>L'équipe Smidjan</strong>
    </p>
  `;

  return createEmailTemplate({
    title: "Message reçu - Smidjan",
    content,
    preheader:
      "Nous avons bien reçu votre message et vous répondrons sous 24h.",
  });
};

/**
 * Email de notification interne (admin)
 */
export const createAdminNotificationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
  source,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: "contact" | "quote";
}): string => {
  const content = `
    <h2 style="${EMAIL_STYLES.sectionTitle}">
      ${source === "quote" ? "NOUVEAU DEVIS DEMANDE" : "NOUVEAU MESSAGE"}
    </h2>

    <div style="${EMAIL_STYLES.infoBox}">
      <p style="${EMAIL_STYLES.label}">Informations du contact :</p>
      <p style="${EMAIL_STYLES.value}"><strong>Nom :</strong> ${firstName} ${lastName}</p>
      <p style="${EMAIL_STYLES.value}"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p style="${EMAIL_STYLES.value}"><strong>Téléphone :</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
      <p style="${EMAIL_STYLES.value}"><strong>Sujet :</strong> ${subject}</p>
    </div>

    <h3 style="${EMAIL_STYLES.sectionTitle}">Message :</h3>
    <div style="${EMAIL_STYLES.paragraph}; background: #f8f9fa; padding: 20px; border-radius: 4px;">
      ${message}
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="${EMAIL_STYLES.button}">
        Répondre maintenant
      </a>
    </div>

    <hr style="${EMAIL_STYLES.divider}">

    <p style="font-size: 13px; color: #999;">
      Cet email a été envoyé automatiquement depuis le formulaire ${source === "quote" ? "de devis" : "de contact"} du site Smidjan.be
    </p>
  `;

  return createEmailTemplate({
    title: `${source === "quote" ? "Nouveau devis" : "Nouveau message"} - Smidjan Admin`,
    content,
  });
};

/**
 * Email de confirmation de devis
 */
export const createQuoteConfirmationEmail = ({
  firstName,
  lastName,
  projectDetails,
}: {
  firstName: string;
  lastName: string;
  email: string;
  projectDetails: string;
}): string => {
  const content = `
    <h2 style="${EMAIL_STYLES.sectionTitle}">Demande de devis reçue !</h2>

    <p style="${EMAIL_STYLES.paragraph}">
      Bonjour <strong>${firstName} ${lastName}</strong>,
    </p>

    <p style="${EMAIL_STYLES.paragraph}">
      Merci pour votre demande de devis. Nous avons bien reçu les informations concernant votre projet et nous vous enverrons une proposition détaillée sous 48h maximum.
    </p>

    <div style="${EMAIL_STYLES.infoBox}">
      <p style="${EMAIL_STYLES.label}">Votre projet :</p>
      <div style="${EMAIL_STYLES.paragraph}">
        ${projectDetails}
      </div>
    </div>

    <p style="${EMAIL_STYLES.paragraph}">
      Notre équipe va analyser vos besoins et vous proposer une solution sur-mesure adaptée à votre budget et vos objectifs.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://smidjan.be/contact" style="${EMAIL_STYLES.button}">
        Besoin d'échanger avant ?
      </a>
    </div>

    <p style="${EMAIL_STYLES.paragraph}">
      À très bientôt,<br>
      <strong>L'équipe Smidjan</strong>
    </p>
  `;

  return createEmailTemplate({
    title: "Devis reçu - Smidjan",
    content,
    preheader:
      "Votre demande de devis a bien été reçue. Nous vous répondrons sous 48h.",
  });
};

/**
 * Utilitaire pour échapper le HTML dans les messages utilisateur
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Convertit les retours à la ligne en <br>
 */
export const nl2br = (text: string): string => {
  return escapeHtml(text).replace(/\n/g, "<br>");
};
