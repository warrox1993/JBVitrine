import { AdminAuthService } from '../../../../domain/admin/services/AdminAuthService';
import { LoginCommand } from './LoginCommand';
import { AdminUserDTO } from '../../dtos/AdminUserDTO';
import { AdminMapper } from '../../mappers/AdminMapper';

export class LoginHandler {
  constructor(private readonly authService: AdminAuthService) {}

  async execute(command: LoginCommand): Promise<AdminUserDTO> {
    const admin = await this.authService.authenticate(command.email, command.password);
    return AdminMapper.toDTO(admin);
  }
}
