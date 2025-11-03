// Email templates for contact form

export function getConfirmationEmailHtml(
  name: string,
  ticketId: string,
): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre demande</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f1115; color: #f6f7f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f1115;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e2430; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6a00, #ffc43a); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Smidjan
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Agence Digitale à Liège
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #f6f7f9; font-size: 24px; font-weight: 700;">
                Merci pour votre message, ${name}!
              </h2>

              <p style="margin: 0 0 20px; color: #c8cdd6; font-size: 16px; line-height: 1.6;">
                Nous avons bien reçu votre demande et nous vous remercions de votre intérêt pour Smidjan.
              </p>

              <div style="background-color: #0f1115; border-left: 4px solid #ff6a00; padding: 20px; margin: 30px 0; border-radius: 6px;">
                <p style="margin: 0; color: #c8cdd6; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Numéro de ticket
                </p>
                <p style="margin: 8px 0 0; color: #ff6a00; font-size: 20px; font-weight: 700; font-family: 'Courier New', monospace;">
                  ${ticketId}
                </p>
              </div>

              <p style="margin: 0 0 20px; color: #c8cdd6; font-size: 16px; line-height: 1.6;">
                Notre équipe analysera votre demande et vous contactera dans les <strong style="color: #f6f7f9;">24 heures ouvrées</strong>.
              </p>

              <div style="margin: 30px 0; padding: 20px; background-color: rgba(255, 106, 0, 0.1); border-radius: 8px;">
                <p style="margin: 0 0 10px; color: #f6f7f9; font-size: 16px; font-weight: 600;">
                  En attendant :
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #c8cdd6; font-size: 15px; line-height: 1.8;">
                  <li>Consultez notre <a href="https://smidjan.be/blog" style="color: #ff6a00; text-decoration: none;">blog</a> pour découvrir nos expertises</li>
                  <li>Suivez-nous sur les réseaux sociaux</li>
                  <li>Préparez vos questions pour notre entretien</li>
                </ul>
              </div>

              <p style="margin: 30px 0 0; color: #c8cdd6; font-size: 16px; line-height: 1.6;">
                À très bientôt,<br>
                <strong style="color: #f6f7f9;">L'équipe Smidjan</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #161a22; padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 15px; color: #c8cdd6; font-size: 14px;">
                <strong style="color: #f6f7f9;">Smidjan</strong> - Agence Web & Digitale<br>
                Liège, Belgique
              </p>
              <p style="margin: 0 0 15px; color: #8b919e; font-size: 13px;">
                📧 <a href="mailto:jeanbaptiste.dhondt1@gmail.com" style="color: #ff6a00; text-decoration: none;">jeanbaptiste.dhondt1@gmail.com</a><br>
                📞 <a href="tel:+32475205562" style="color: #ff6a00; text-decoration: none;">+32 475 20 55 62</a><br>
                🌐 <a href="https://smidjan.be" style="color: #ff6a00; text-decoration: none;">smidjan.be</a>
              </p>
              <p style="margin: 15px 0 0; color: #6b7280; font-size: 12px;">
                Ce message automatique confirme la réception de votre demande.<br>
                Si vous n'avez pas effectué cette demande, merci de nous contacter.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getTeamNotificationEmailHtml(
  data: {
    type: string;
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    budget?: string | null;
    timeline?: string | null;
    message: string;
    utm?: {
      source?: string | null;
      campaign?: string | null;
    };
  },
  ticketId: string,
): string {
  const budgetLabels: Record<string, string> = {
    "<2000": "< 2 000€",
    "2-5k": "2 000€ - 5 000€",
    "5-10k": "5 000€ - 10 000€",
    "10-25k": "10 000€ - 25 000€",
    ">25k": "> 25 000€",
  };

  const timelineLabels: Record<string, string> = {
    asap: "Dès que possible",
    "1m": "Dans le mois",
    "2-3m": "2-3 mois",
    ">3m": "Plus de 3 mois",
  };

  const typeLabels: Record<string, string> = {
    projet: "Nouveau Projet",
    support: "Support Technique",
    partenariat: "Partenariat",
  };

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de contact</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fb; color: #0c121b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6a00, #ffc43a); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                🎯 Nouvelle Demande de Contact
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.95; text-transform: uppercase; letter-spacing: 0.05em;">
                ${typeLabels[data.type] || data.type}
              </p>
            </td>
          </tr>

          <!-- Ticket ID -->
          <tr>
            <td style="padding: 20px 30px; background-color: #fff8f0; border-bottom: 3px solid #ff6a00;">
              <p style="margin: 0; font-size: 13px; color: #8b919e; text-transform: uppercase; letter-spacing: 0.05em;">
                Ticket ID
              </p>
              <p style="margin: 5px 0 0; font-size: 18px; color: #ff6a00; font-weight: 700; font-family: 'Courier New', monospace;">
                ${ticketId}
              </p>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; color: #0c121b; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                📋 Informations du contact
              </h2>

              <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 15px;">
                <tr>
                  <td style="color: #6b7280; font-weight: 600; width: 140px; vertical-align: top;">Nom :</td>
                  <td style="color: #0c121b; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: 600; vertical-align: top;">Email :</td>
                  <td style="color: #0c121b;">
                    <a href="mailto:${data.email}" style="color: #ff6a00; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${
                  data.phone
                    ? `
                <tr>
                  <td style="color: #6b7280; font-weight: 600; vertical-align: top;">Téléphone :</td>
                  <td style="color: #0c121b;">
                    <a href="tel:${data.phone}" style="color: #ff6a00; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.company
                    ? `
                <tr>
                  <td style="color: #6b7280; font-weight: 600; vertical-align: top;">Entreprise :</td>
                  <td style="color: #0c121b;">${data.company}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.budget
                    ? `
                <tr>
                  <td style="color: #6b7280; font-weight: 600; vertical-align: top;">Budget :</td>
                  <td style="color: #0c121b; font-weight: 600;">${budgetLabels[data.budget] || data.budget}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.timeline
                    ? `
                <tr>
                  <td style="color: #6b7280; font-weight: 600; vertical-align: top;">Délai :</td>
                  <td style="color: #0c121b;">${timelineLabels[data.timeline] || data.timeline}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 15px; color: #0c121b; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                💬 Message
              </h2>
              <div style="background-color: #f7f9fc; border-left: 4px solid #ff6a00; padding: 20px; border-radius: 6px;">
                <p style="margin: 0; color: #0c121b; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
              </div>
            </td>
          </tr>

          ${
            data.utm?.source || data.utm?.campaign
              ? `
          <!-- UTM Tracking -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 15px; color: #0c121b; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                📊 Tracking
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; background-color: #f7f9fc; border-radius: 6px;">
                ${
                  data.utm?.source
                    ? `
                <tr>
                  <td style="color: #6b7280; font-weight: 600; width: 140px;">Source UTM :</td>
                  <td style="color: #0c121b;">${data.utm.source}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.utm?.campaign
                    ? `
                <tr>
                  <td style="color: #6b7280; font-weight: 600;">Campagne UTM :</td>
                  <td style="color: #0c121b;">${data.utm.campaign}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- CTA -->
          <tr>
            <td style="padding: 30px; background-color: #fff8f0; text-align: center;">
              <a href="mailto:${data.email}?subject=Re: ${typeLabels[data.type]} - ${ticketId}" style="display: inline-block; background: linear-gradient(135deg, #ff6a00, #ffc43a); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(255, 106, 0, 0.3);">
                ✉️ Répondre au client
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f7f9fc; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px;">
                Notification automatique depuis <strong>smidjan.be</strong><br>
                ${new Date().toLocaleString("fr-BE", { dateStyle: "full", timeStyle: "short" })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
