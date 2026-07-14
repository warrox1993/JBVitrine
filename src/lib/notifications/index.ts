/**
 * Notification System for Hot Leads
 *
 * Sends notifications to Slack, Discord, and email when hot leads arrive
 */

import { getResend } from "@/lib/email/resend-client";
import { getLeadColor } from "@/lib/constants/colors";
import { escapeHtml } from "@/lib/security/escape";

/**
 * Sanitize a value for plain-text chat webhooks (Slack/Discord).
 * Strips control chars and neutralizes markdown/mention control characters
 * (`<`, backticks, `@`) so injected content can't forge links or mentions.
 */
function sanitizeChatText(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v)
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1F]/g, " ")
    .replace(/</g, "‹")
    .replace(/`/g, "'")
    .replace(/@/g, "﹫");
}

// Types
export interface LeadNotification {
  leadId: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  estimateMin: number;
  estimateMax: number;
  score: number;
  grade: "HOT" | "WARM" | "COLD" | "SPAM";
  confidence: number;
  breakdown: {
    project: number;
    engagement: number;
    completion: number;
    enrichment: number;
    behavioral: number;
  };
}

/**
 * Send Slack notification for hot lead
 */
export async function sendSlackNotification(
  lead: LeadNotification,
): Promise<boolean> {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    console.warn(
      "⚠️ SLACK_WEBHOOK_URL not configured, skipping Slack notification",
    );
    return false;
  }

  try {
    const emoji =
      lead.grade === "HOT" ? "🔥" : lead.grade === "WARM" ? "⚡" : "📋";
    const color = getLeadColor(lead.grade as "HOT" | "WARM" | "COLD");

    const safeName = sanitizeChatText(lead.name);
    const safeEmail = sanitizeChatText(lead.email);
    const safePhone = sanitizeChatText(lead.phone);
    const safeCompany = sanitizeChatText(lead.company);
    const safeProjectType = sanitizeChatText(lead.projectType);

    const message = {
      text: `${emoji} Nouveau lead ${lead.grade} : ${safeName}`,
      attachments: [
        {
          color: color,
          title: `${emoji} Lead ${lead.grade} - Score ${lead.score}/100`,
          fields: [
            {
              title: "Contact",
              value: `*${safeName}*\n${safeEmail}${lead.phone ? `\n📞 ${safePhone}` : ""}`,
              short: true,
            },
            {
              title: "Entreprise",
              value: safeCompany || "Non renseigné",
              short: true,
            },
            {
              title: "Projet",
              value: safeProjectType,
              short: true,
            },
            {
              title: "Budget estimé",
              value: `${lead.estimateMin} - ${lead.estimateMax} EUR`,
              short: true,
            },
            {
              title: "Score de qualification",
              value: `${lead.score}/100 (Confiance: ${lead.confidence}%)`,
              short: false,
            },
            {
              title: "Breakdown",
              value: `Projet: ${lead.breakdown.project}pts | Engagement: ${lead.breakdown.engagement}pts | Complétion: ${lead.breakdown.completion}pts | Enrichissement: ${lead.breakdown.enrichment}pts | Comportement: ${lead.breakdown.behavioral}pts`,
              short: false,
            },
          ],
          footer: "Smidjan Lead Scoring System",
          footer_icon: "https://smidjan.be/favicon.ico",
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    console.log(`✅ Slack notification sent for lead ${lead.leadId}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send Slack notification:", error);
    return false;
  }
}

/**
 * Send Discord notification for hot lead
 */
export async function sendDiscordNotification(
  lead: LeadNotification,
): Promise<boolean> {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!discordWebhookUrl) {
    console.warn(
      "⚠️ DISCORD_WEBHOOK_URL not configured, skipping Discord notification",
    );
    return false;
  }

  try {
    const emoji =
      lead.grade === "HOT" ? "🔥" : lead.grade === "WARM" ? "⚡" : "📋";
    const hexColor = getLeadColor(lead.grade as "HOT" | "WARM" | "COLD");
    const color = parseInt(hexColor.replace("#", ""), 16);

    const safeName = sanitizeChatText(lead.name);
    const safeEmail = sanitizeChatText(lead.email);
    const safePhone = sanitizeChatText(lead.phone);
    const safeCompany = sanitizeChatText(lead.company);
    const safeProjectType = sanitizeChatText(lead.projectType);

    const embed = {
      title: `${emoji} Nouveau lead ${lead.grade} : ${safeName}`,
      color: color,
      fields: [
        {
          name: "Contact",
          value: `**${safeName}**\n${safeEmail}${lead.phone ? `\n📞 ${safePhone}` : ""}`,
          inline: true,
        },
        {
          name: "Entreprise",
          value: safeCompany || "Non renseigné",
          inline: true,
        },
        {
          name: "Projet",
          value: safeProjectType,
          inline: true,
        },
        {
          name: "Budget estimé",
          value: `${lead.estimateMin} - ${lead.estimateMax} EUR`,
          inline: true,
        },
        {
          name: "Score de qualification",
          value: `**${lead.score}/100** (Confiance: ${lead.confidence}%)`,
          inline: false,
        },
        {
          name: "Breakdown du score",
          value: `• Projet: ${lead.breakdown.project}pts\n• Engagement: ${lead.breakdown.engagement}pts\n• Complétion: ${lead.breakdown.completion}pts\n• Enrichissement: ${lead.breakdown.enrichment}pts\n• Comportement: ${lead.breakdown.behavioral}pts`,
          inline: false,
        },
      ],
      footer: {
        text: "Smidjan Lead Scoring System",
        icon_url: "https://smidjan.be/favicon.ico",
      },
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Lead Scoring Bot",
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    console.log(`✅ Discord notification sent for lead ${lead.leadId}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send Discord notification:", error);
    return false;
  }
}

/**
 * Send email notification to sales team for hot lead
 */
export async function sendSalesEmailNotification(
  lead: LeadNotification,
): Promise<boolean> {
  try {
    const emoji =
      lead.grade === "HOT" ? "🔥" : lead.grade === "WARM" ? "⚡" : "📋";

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ff6a00, #ffc43a); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 14px; margin-top: 8px; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #ff6a00; }
    .info-label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 4px; }
    .info-value { font-size: 16px; font-weight: 600; color: #333; }
    .score-breakdown { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .score-bar { display: flex; align-items: center; margin: 10px 0; }
    .score-label { width: 150px; font-size: 14px; }
    .score-progress { flex: 1; height: 24px; background: #e0e0e0; border-radius: 12px; overflow: hidden; margin: 0 10px; }
    .score-fill { height: 100%; background: linear-gradient(90deg, #ff6a00, #ffc43a); display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; color: white; font-size: 12px; font-weight: 600; }
    .cta { background: #ff6a00; color: white; padding: 15px 30px; text-align: center; border-radius: 6px; text-decoration: none; display: inline-block; margin: 20px 0; font-weight: 600; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${emoji} Nouveau lead ${lead.grade}</h1>
      <div class="badge">Score: ${lead.score}/100 | Confiance: ${lead.confidence}%</div>
    </div>

    <div class="content">
      <h2>Informations du contact</h2>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Nom</div>
          <div class="info-value">${escapeHtml(lead.name)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${escapeHtml(lead.email)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Entreprise</div>
          <div class="info-value">${escapeHtml(lead.company) || "Non renseigné"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Téléphone</div>
          <div class="info-value">${escapeHtml(lead.phone) || "Non renseigné"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Type de projet</div>
          <div class="info-value">${escapeHtml(lead.projectType)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Budget estimé</div>
          <div class="info-value">${lead.estimateMin} - ${lead.estimateMax} EUR</div>
        </div>
      </div>

      <div class="score-breakdown">
        <h3>Breakdown du score (${lead.score}/100)</h3>

        <div class="score-bar">
          <div class="score-label">Projet</div>
          <div class="score-progress">
            <div class="score-fill" style="width: ${(lead.breakdown.project / 30) * 100}%">${lead.breakdown.project}/30</div>
          </div>
        </div>

        <div class="score-bar">
          <div class="score-label">Engagement</div>
          <div class="score-progress">
            <div class="score-fill" style="width: ${(lead.breakdown.engagement / 25) * 100}%">${lead.breakdown.engagement}/25</div>
          </div>
        </div>

        <div class="score-bar">
          <div class="score-label">Complétion</div>
          <div class="score-progress">
            <div class="score-fill" style="width: ${(lead.breakdown.completion / 20) * 100}%">${lead.breakdown.completion}/20</div>
          </div>
        </div>

        <div class="score-bar">
          <div class="score-label">Enrichissement</div>
          <div class="score-progress">
            <div class="score-fill" style="width: ${(lead.breakdown.enrichment / 15) * 100}%">${lead.breakdown.enrichment}/15</div>
          </div>
        </div>

        <div class="score-bar">
          <div class="score-label">Comportement</div>
          <div class="score-progress">
            <div class="score-fill" style="width: ${(lead.breakdown.behavioral / 10) * 100}%">${lead.breakdown.behavioral}/10</div>
          </div>
        </div>
      </div>

      ${
        lead.grade === "HOT"
          ? `
      <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <strong>⚠️ Action requise</strong>
        <p style="margin: 8px 0 0 0;">Ce lead est qualifié comme HOT. Il est recommandé de le contacter dans les 24 heures pour maximiser les chances de conversion.</p>
      </div>
      `
          : ""
      }

      <a href="mailto:${escapeHtml(lead.email)}" class="cta">Contacter ce lead</a>

      <div class="footer">
        Lead ID: ${lead.leadId}<br>
        Généré le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const { error } = await getResend().emails.send({
      from: "Smidjan Lead Scoring <contact@smidjan.be>",
      to: ["jeanbaptiste.dhondt1@gmail.com"],
      subject: `${emoji} Nouveau lead ${lead.grade} : ${lead.name} (Score ${lead.score}/100)`,
      html: html,
      replyTo: lead.email,
    });

    if (error) {
      console.error("❌ Failed to send sales email:", error);
      return false;
    }

    console.log(`✅ Sales email notification sent for lead ${lead.leadId}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send sales email notification:", error);
    return false;
  }
}

/**
 * Send all notifications for a new lead
 */
export async function notifyNewLead(lead: LeadNotification): Promise<void> {
  console.log(
    `📢 Sending notifications for lead ${lead.leadId} (${lead.grade})`,
  );

  const results = await Promise.allSettled([
    sendSlackNotification(lead),
    sendDiscordNotification(lead),
    lead.grade === "HOT" || lead.grade === "WARM"
      ? sendSalesEmailNotification(lead)
      : Promise.resolve(false),
  ]);

  const [slackResult, discordResult, emailResult] = results;

  console.log("📊 Notification results:", {
    slack:
      slackResult.status === "fulfilled" && slackResult.value ? "✅" : "❌",
    discord:
      discordResult.status === "fulfilled" && discordResult.value ? "✅" : "❌",
    email:
      emailResult.status === "fulfilled" && emailResult.value ? "✅" : "❌",
  });
}
