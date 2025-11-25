import { Contact } from '../../../core/domain/contact/entities/Contact';

export class ContactDatabaseMapper {
  static toDomain(row: any): Contact {
    return Contact.create(
      row.id,
      row.email,
      row.name,
      row.type,
      row.message,
      row.phone,
      row.company,
      new Date(row.created_at)
    );
  }

  static toDatabase(entity: Contact): any {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      name: entity.name,
      type: entity.type.getValue(),
      message: entity.message.getValue(),
      phone: entity.phone?.getValue(),
      company: entity.company,
      created_at: entity.createdAt,
    };
  }
}
