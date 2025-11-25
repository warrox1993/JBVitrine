import { IContactRepository } from '../../../core/domain/contact/repositories/IContactRepository';
import { Contact } from '../../../core/domain/contact/entities/Contact';
import { ContactDatabaseMapper } from './ContactDatabaseMapper';
import { sql } from '@/lib/db';

export class PostgresContactRepository implements IContactRepository {
  async save(contact: Contact): Promise<void> {
    const dbModel = ContactDatabaseMapper.toDatabase(contact);
    
    await sql`
      INSERT INTO contacts (
        id, email, name, type, message, phone, company, created_at
      ) VALUES (
        ${dbModel.id},
        ${dbModel.email},
        ${dbModel.name},
        ${dbModel.type},
        ${dbModel.message},
        ${dbModel.phone},
        ${dbModel.company},
        ${dbModel.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        type = EXCLUDED.type,
        message = EXCLUDED.message,
        phone = EXCLUDED.phone,
        company = EXCLUDED.company,
        created_at = EXCLUDED.created_at
    `;
  }

  async findById(id: string): Promise<Contact | null> {
    const result = await sql`
      SELECT * FROM contacts WHERE id = ${id}
    `;

    if (result.length === 0) {
      return null;
    }

    return ContactDatabaseMapper.toDomain(result[0]);
  }

  async findAll(): Promise<Contact[]> {
    const result = await sql`
      SELECT * FROM contacts ORDER BY created_at DESC
    `;

    return result.map(ContactDatabaseMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await sql`
      DELETE FROM contacts WHERE id = ${id}
    `;
  }
}
