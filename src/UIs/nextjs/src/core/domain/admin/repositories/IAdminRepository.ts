import { AdminUser } from '../entities/AdminUser';

export interface IAdminRepository {
  save(admin: AdminUser): Promise<void>;
  findById(id: string): Promise<AdminUser | null>;
  findByEmail(email: string): Promise<AdminUser | null>;
}
