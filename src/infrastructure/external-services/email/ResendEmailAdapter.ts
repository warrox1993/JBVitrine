import { Resend } from 'resend';

export interface IEmailService {
  sendConfirmation(email: string): Promise<void>;
  sendTeamNotification(contact: any): Promise<void>;
}

export class ResendEmailAdapter implements IEmailService {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async sendConfirmation(email: string): Promise<void> {
    // TODO: Use actual templates
    await this.client.emails.send({
      from: 'noreply@smidjan.be',
      to: email,
      subject: 'Confirmation de contact',
      html: '<p>Merci pour votre message. Nous vous répondrons bientôt.</p>',
    });
  }

  async sendTeamNotification(contact: any): Promise<void> {
    // TODO: Use actual templates
    await this.client.emails.send({
      from: 'noreply@smidjan.be',
      to: 'team@smidjan.be',
      subject: `Nouveau contact: ${contact.name}`,
      html: `<p>Nouveau message de ${contact.name} (${contact.email})</p>`,
    });
  }
}
