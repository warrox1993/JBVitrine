import { Contact } from '../../../domain/contact/entities/Contact';
import { ContactDTO, CreateContactDTO } from '../dtos/ContactDTO';
import { randomUUID } from 'crypto';

export class ContactMapper {
  static toDTO(entity: Contact): ContactDTO {
    return {
      id: entity.id,
      type: entity.type.getValue(),
      email: entity.email.getValue(),
      name: entity.name,
      message: entity.message.getValue(),
      phone: entity.phone?.getValue(),
      company: entity.company,
      createdAt: entity.createdAt.toISOString(),
    };
  }

  static toDomain(dto: CreateContactDTO): Contact {
    return Contact.create(
      randomUUID(),
      dto.email,
      dto.name,
      dto.type,
      dto.message,
      dto.phone,
      dto.company
    );
  }
}
