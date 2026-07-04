import { AdminUser } from '../entities/AdminUser';
import { IAdminRepository } from '../repositories/IAdminRepository';
import { IPasswordService } from './IPasswordService';
import { ValidationError } from '../../shared/errors/ValidationError';

export class AdminAuthService {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly passwordService: IPasswordService
  ) {}

  async authenticate(email: string, password: string): Promise<AdminUser> {
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new ValidationError('Invalid email or password');
    }

    const isValid = await this.passwordService.compare(password, admin.passwordHash);

    if (!isValid) {
      throw new ValidationError('Invalid email or password');
    }

    if (!admin.isActive) {
      throw new ValidationError('Account is inactive');
    }

    admin.updateLastLogin();
    await this.adminRepository.save(admin);

    return admin;
  }
}
