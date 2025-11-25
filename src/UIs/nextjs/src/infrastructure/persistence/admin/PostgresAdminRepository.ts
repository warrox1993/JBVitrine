import { IAdminRepository } from '../../../core/domain/admin/repositories/IAdminRepository';
import { AdminUser } from '../../../core/domain/admin/entities/AdminUser';
import { AdminDatabaseMapper } from './AdminDatabaseMapper';
import { sql } from '@/lib/db';

export class PostgresAdminRepository implements IAdminRepository {
  async save(admin: AdminUser): Promise<void> {
    const dbModel = AdminDatabaseMapper.toDatabase(admin);
    
    await sql`
      INSERT INTO admin_users (
        id, email, password_hash, name, role_id, role_name, role_permissions, is_active, last_login_at, created_at
      ) VALUES (
        ${dbModel.id},
        ${dbModel.email},
        ${dbModel.password_hash},
        ${dbModel.name},
        ${dbModel.role_id},
        ${dbModel.role_name},
        ${dbModel.role_permissions}::jsonb,
        ${dbModel.is_active},
        ${dbModel.last_login_at},
        ${dbModel.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        name = EXCLUDED.name,
        role_id = EXCLUDED.role_id,
        role_name = EXCLUDED.role_name,
        role_permissions = EXCLUDED.role_permissions,
        is_active = EXCLUDED.is_active,
        last_login_at = EXCLUDED.last_login_at,
        created_at = EXCLUDED.created_at
    `;
  }

  async findById(id: string): Promise<AdminUser | null> {
    const result = await sql`
      SELECT * FROM admin_users WHERE id = ${id}
    `;

    if (result.length === 0) {
      return null;
    }

    return AdminDatabaseMapper.toDomain(result[0]);
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    const result = await sql`
      SELECT * FROM admin_users WHERE email = ${email}
    `;

    if (result.length === 0) {
      return null;
    }

    return AdminDatabaseMapper.toDomain(result[0]);
  }
}
