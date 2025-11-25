import { AdminUser } from '../../../core/domain/admin/entities/AdminUser';
import { Role } from '../../../core/domain/admin/entities/Role';

export class AdminDatabaseMapper {
  static toDomain(row: any): AdminUser {
    const role = Role.create(
      row.role_id,
      row.role_name,
      row.role_permissions || []
    );

    const admin = AdminUser.create(
      row.id,
      row.email,
      row.password_hash,
      row.name,
      role
    );

    if (row.last_login_at) {
      admin.updateLastLogin();
    }

    if (!row.is_active) {
      admin.deactivate();
    }

    return admin;
  }

  static toDatabase(entity: AdminUser): any {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      password_hash: entity.passwordHash,
      name: entity.name,
      role_id: entity.role.id,
      role_name: entity.role.name,
      role_permissions: JSON.stringify(entity.role.permissions.map(p => p.getValue())),
      is_active: entity.isActive,
      last_login_at: entity.lastLoginAt,
      created_at: entity.createdAt,
    };
  }
}
