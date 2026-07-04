import { IQuoteRepository } from '../../../core/domain/quote/repositories/IQuoteRepository';
import { Quote } from '../../../core/domain/quote/entities/Quote';
import { QuoteDatabaseMapper } from './QuoteDatabaseMapper';
import { sql } from '@/lib/db';

export class PostgresQuoteRepository implements IQuoteRepository {
  async save(quote: Quote): Promise<void> {
    const dbModel = QuoteDatabaseMapper.toDatabase(quote);
    
    await sql`
      INSERT INTO quotes (
        id, email, name, company, project_type, items, status, created_at, valid_until
      ) VALUES (
        ${dbModel.id},
        ${dbModel.email},
        ${dbModel.name},
        ${dbModel.company},
        ${dbModel.project_type},
        ${dbModel.items}::jsonb,
        ${dbModel.status},
        ${dbModel.created_at},
        ${dbModel.valid_until}
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        company = EXCLUDED.company,
        project_type = EXCLUDED.project_type,
        items = EXCLUDED.items,
        status = EXCLUDED.status,
        created_at = EXCLUDED.created_at,
        valid_until = EXCLUDED.valid_until
    `;
  }

  async findById(id: string): Promise<Quote | null> {
    const result = await sql`
      SELECT * FROM quotes WHERE id = ${id}
    `;

    if (result.length === 0) {
      return null;
    }

    return QuoteDatabaseMapper.toDomain(result[0]);
  }

  async findAll(): Promise<Quote[]> {
    const result = await sql`
      SELECT * FROM quotes ORDER BY created_at DESC
    `;

    return result.map(QuoteDatabaseMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await sql`
      DELETE FROM quotes WHERE id = ${id}
    `;
  }
}
