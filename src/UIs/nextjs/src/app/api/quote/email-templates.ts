import { QuoteSubmission } from "@/components/contact/QuoteWizard/types";
import { formatPriceRange } from "@/lib/pricing/calculator";
import { getProjectTypeConfig } from "@/lib/pricing/features";

// Client confirmation email
export function getQuoteConfirmationEmailHtml(
  name: string,
  quoteId: string,
  estimate: QuoteSubmission["estimate"],
): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre demande de devis</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6a00 0%, #ffc43a 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Demande reçue</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Bonjour <strong>${name}</strong>,
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Nous avons bien reçu votre demande de devis. Notre équipe l'analyse et vous enverra une estimation détaillée dans les <strong>24 heures</strong>.
              </p>

              <!-- Quote Summary -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #ff6a00; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #333333;">
                  Récapitulatif de votre demande
                </h2>

                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Référence :</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #333333; text-align: right;">${quoteId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Budget estimé :</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #ff6a00; text-align: right;">${formatPriceRange(estimate.min, estimate.max)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Délai :</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #333333; text-align: right;">${estimate.timeline}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Fonctionnalités :</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #333333; text-align: right;">${estimate.totalFeatures} sélectionnées</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <h3 style="margin: 30px 0 15px 0; font-size: 18px; font-weight: 600; color: #333333;">
                Prochaines étapes
              </h3>

              <ol style="margin: 0; padding-left: 20px; color: #666666; line-height: 1.8;">
                <li style="margin-bottom: 8px;">Notre équipe analyse votre projet en détail</li>
                <li style="margin-bottom: 8px;">Vous recevrez un devis personnalisé par email</li>
                <li style="margin-bottom: 8px;">Nous planifierons un appel pour discuter de vos besoins</li>
                <li style="margin-bottom: 8px;">Nous affinerons ensemble les détails du projet</li>
              </ol>

              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: #666666;">
                <strong>Conseil :</strong> En attendant, n'hésitez pas à préparer vos questions et à rassembler vos visuels/documents de référence.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666666;">
                Des questions ? Répondez directement à cet email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #999999;">
                Smidjan - Agence digitale basée à Liège, Belgique
              </p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #999999;">
                <a href="https://smidjan.be" style="color: #ff6a00; text-decoration: none;">smidjan.be</a> |
                <a href="mailto:contact@smidjan.be" style="color: #ff6a00; text-decoration: none;">contact@smidjan.be</a>
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

// Team notification email with lead score
export function getQuoteTeamNotificationEmailHtml(
  submission: QuoteSubmission,
  contactInfo: Record<string, string | boolean>,
  quoteId: string,
): string {
  const config = submission.quoteData.projectType
    ? getProjectTypeConfig(submission.quoteData.projectType)
    : null;

  const priorityColors = {
    high: "#dc2626",
    medium: "#ea580c",
    low: "#65a30d",
  };

  const priorityLabels = {
    high: "PRIORITÉ HAUTE",
    medium: "PRIORITÉ MOYENNE",
    low: "PRIORITÉ BASSE",
  };

  const priorityColor = priorityColors[submission.leadScore.priority];
  const priorityLabel = priorityLabels[submission.leadScore.priority];

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0d1015; color: #f6f7f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 700px; margin: 0 auto; background-color: #1e2430; border-radius: 12px; border: 2px solid #2b3342;">
          <!-- Header with Priority -->
          <tr>
            <td style="background-color: ${priorityColor}; padding: 20px 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                ${priorityLabel}
              </h1>
            </td>
          </tr>

          <!-- Lead Score -->
          <tr>
            <td style="padding: 30px;">
              <div style="background: linear-gradient(135deg, rgba(255, 106, 0, 0.1) 0%, rgba(255, 196, 58, 0.05) 100%); border: 2px solid #ff6a00; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
                <div style="font-size: 48px; font-weight: 700; color: #ff6a00; margin-bottom: 10px;">
                  ${submission.leadScore.score}/100
                </div>
                <div style="font-size: 14px; color: #c8cdd6; text-transform: uppercase; letter-spacing: 1px;">
                  Score de qualification
                </div>
              </div>

              <!-- Contact Info -->
              <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #ff6a00; border-bottom: 2px solid #ff6a00; padding-bottom: 10px;">
                CONTACT
              </h2>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6; width: 120px;">Nom :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">${contactInfo.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Email :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">
                    <a href="mailto:${contactInfo.email}" style="color: #ff6a00; text-decoration: none;">${contactInfo.email}</a>
                  </td>
                </tr>
                ${
                  contactInfo.phone
                    ? `<tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Téléphone :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">
                    <a href="tel:${contactInfo.phone}" style="color: #ff6a00; text-decoration: none;">${contactInfo.phone}</a>
                  </td>
                </tr>`
                    : ""
                }
                ${
                  contactInfo.company
                    ? `<tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Entreprise :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">${contactInfo.company}</td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Project Details -->
              <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #ff6a00; border-bottom: 2px solid #ff6a00; padding-bottom: 10px;">
                PROJET
              </h2>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6; width: 120px;">Type :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">${config?.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Référence :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">${quoteId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Budget :</td>
                  <td style="padding: 8px 0; font-size: 16px; font-weight: 700; color: #ff6a00;">
                    ${formatPriceRange(submission.estimate.min, submission.estimate.max)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Délai :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">${submission.estimate.timeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Complexité :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">
                    ${submission.estimate.complexity === "simple" ? "Simple" : submission.estimate.complexity === "medium" ? "Moyen" : "Complexe"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #c8cdd6;">Fonctionnalités :</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">${submission.estimate.totalFeatures}</td>
                </tr>
              </table>

              <!-- Selected Features -->
              ${
                submission.quoteData.features.length > 0
                  ? `
              <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #f6f7f9;">
                Fonctionnalités sélectionnées :
              </h3>
              <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #c8cdd6; line-height: 1.8;">
                ${submission.quoteData.features
                  .map(
                    (f) =>
                      `<li style="margin-bottom: 5px; font-size: 14px;">${f.name}</li>`,
                  )
                  .join("")}
              </ul>
              `
                  : ""
              }

              <!-- Options -->
              <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #f6f7f9;">
                Options :
              </h3>
              <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #c8cdd6; line-height: 1.8;">
                <li style="font-size: 14px;">Design : <strong style="color: #f6f7f9;">${submission.quoteData.design === "template" ? "Template" : submission.quoteData.design === "semi-custom" ? "Semi-personnalisé" : "Sur mesure"}</strong></li>
                <li style="font-size: 14px;">SEO : <strong style="color: #f6f7f9;">${submission.quoteData.seo === "none" ? "Aucun" : submission.quoteData.seo === "basic" ? "De base" : "Avancé"}</strong></li>
                ${submission.quoteData.animations ? '<li style="font-size: 14px;">Oui - Animations avancées</li>' : ""}
                ${submission.quoteData.maintenance ? '<li style="font-size: 14px;">Oui - Maintenance mensuelle</li>' : ""}
                ${submission.quoteData.training ? '<li style="font-size: 14px;">Oui - Formation équipe</li>' : ""}
                ${submission.quoteData.hosting ? '<li style="font-size: 14px;">Oui - Hébergement</li>' : ""}
              </ul>

              <!-- Message -->
              ${
                contactInfo.message
                  ? `
              <h2 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 700; color: #ff6a00; border-bottom: 2px solid #ff6a00; padding-bottom: 10px;">
                MESSAGE
              </h2>
              <div style="background-color: #161a22; border-left: 3px solid #ffc43a; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #c8cdd6; white-space: pre-wrap;">${contactInfo.message}</p>
              </div>
              `
                  : ""
              }

              <!-- Lead Qualification Notes -->
              <h2 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 700; color: #ff6a00; border-bottom: 2px solid #ff6a00; padding-bottom: 10px;">
                ANALYSE DE QUALIFICATION
              </h2>

              <div style="background-color: #161a22; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #c8cdd6;">Email professionnel :</td>
                    <td style="padding: 5px 0; text-align: right;">
                      ${submission.leadScore.qualificationNotes.professionalEmail ? '<span style="color: #22c55e; font-weight: 600;">Oui</span>' : '<span style="color: #ef4444;">Non</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #c8cdd6;">Entreprise renseignée :</td>
                    <td style="padding: 5px 0; text-align: right;">
                      ${submission.leadScore.qualificationNotes.companyProvided ? '<span style="color: #22c55e; font-weight: 600;">Oui</span>' : '<span style="color: #ef4444;">Non</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #c8cdd6;">Téléphone fourni :</td>
                    <td style="padding: 5px 0; text-align: right;">
                      ${submission.leadScore.qualificationNotes.phoneProvided ? '<span style="color: #22c55e; font-weight: 600;">Oui</span>' : '<span style="color: #ef4444;">Non</span>'}
                    </td>
                  </tr>
                </table>

                ${
                  submission.leadScore.reasons.length > 0
                    ? `
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #2b3342;">
                  <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #f6f7f9;">Raisons du score :</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #c8cdd6; line-height: 1.6;">
                    ${submission.leadScore.reasons.map((reason) => `<li style="font-size: 13px; margin-bottom: 5px;">${reason}</li>`).join("")}
                  </ul>
                </div>
                `
                    : ""
                }
              </div>

              <!-- UTM Data -->
              ${
                submission.utm?.source ||
                submission.utm?.campaign ||
                submission.utm?.medium
                  ? `
              <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #f6f7f9;">
                DONNEES MARKETING (UTM) :
              </h3>
              <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #c8cdd6; line-height: 1.6;">
                ${submission.utm.source ? `<li style="font-size: 14px;">Source : <strong style="color: #f6f7f9;">${submission.utm.source}</strong></li>` : ""}
                ${submission.utm.campaign ? `<li style="font-size: 14px;">Campagne : <strong style="color: #f6f7f9;">${submission.utm.campaign}</strong></li>` : ""}
                ${submission.utm.medium ? `<li style="font-size: 14px;">Medium : <strong style="color: #f6f7f9;">${submission.utm.medium}</strong></li>` : ""}
              </ul>
              `
                  : ""
              }

              <!-- Action CTA -->
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #2b3342;">
                <a href="mailto:${contactInfo.email}" style="display: inline-block; background: linear-gradient(135deg, #ff6a00 0%, #ffc43a 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Répondre au client
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #161a22; padding: 20px 30px; border-radius: 0 0 10px 10px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #7d8594;">
                Demande générée le ${new Date(submission.timestamp).toLocaleString("fr-BE", { dateStyle: "full", timeStyle: "short" })}
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
