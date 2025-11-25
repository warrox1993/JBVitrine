import { AdminUser } from '../../../domain/admin/entities/AdminUser';
import { AdminUserDTO } from '../dtos/AdminUserDTO';

export class AdminMapper {
  static toDTO(entity: AdminUser): AdminUserDTO {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      name: entity.name,
      role: {
        name: entity.role.name,
        permissions: entity.role.permissions.map(p => p.getValue()),
      },
      lastLoginAt: entity.lastLoginAt?.toISOString(),
    };
  }
}
