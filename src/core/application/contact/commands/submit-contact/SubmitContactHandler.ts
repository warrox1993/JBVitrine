import { IContactRepository } from '../../../../domain/contact/repositories/IContactRepository';
import { Contact } from '../../../../domain/contact/entities/Contact';
import { SubmitContactCommand } from './SubmitContactCommand';
import { randomUUID } from 'crypto';

export interface SubmitContactResult {
  id: string;
  priority: boolean;
}

export class SubmitContactHandler {
  constructor(
    private readonly contactRepository: IContactRepository,
    // TODO: Add EmailService and LeadScoringService dependencies
  ) {}

  async execute(command: SubmitContactCommand): Promise<SubmitContactResult> {
    const contact = Contact.create(
      randomUUID(),
      command.email,
      command.name,
      command.type,
      command.message,
      command.phone,
      command.company
    );

    await this.contactRepository.save(contact);

    // TODO: Send email confirmation
    // TODO: Score lead

    return {
      id: contact.id,
      priority: contact.isHighPriority(),
    };
  }
}
