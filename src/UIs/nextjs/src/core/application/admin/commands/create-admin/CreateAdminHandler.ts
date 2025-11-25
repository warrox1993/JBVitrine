import { IAdminRepository } from '../../../../domain/admin/repositories/IAdminRepository';
import { IPasswordService } from '../../../../domain/admin/services/IPasswordService';
import { AdminUser } from '../../../../domain/admin/entities/AdminUser';
import { Role } from '../../../../domain/admin/entities/Role';
import { CreateAdminCommand } from './CreateAdminCommand';
import { ValidationError } from '../../../../domain/shared/errors/ValidationError';
import { randomUUID } from 'crypto';

export class CreateAdminHandler {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly passwordService: IPasswordService
  ) {}

  async execute(command: CreateAdminCommand): Promise<void> {
    const existingUser = await this.adminRepository.findByEmail(command.email);
    if (existingUser) {
      throw new ValidationError('Admin user with this email already exists');
    }

    const passwordHash = await this.passwordService.hash(command.password);

    const role = Role.create(
      randomUUID(),
      command.roleName,
      command.permissions
    );

    const adminUser = AdminUser.create(
      randomUUID(),
      command.email,
      passwordHash,
      command.name,
      role
    );

    await this.adminRepository.save(adminUser);
  }
}
