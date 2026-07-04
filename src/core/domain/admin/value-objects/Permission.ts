import { ValidationError } from '../../shared/errors/ValidationError';

export type PermissionType = 
  | 'manage_contacts'
  | 'manage_quotes'
  | 'manage_leads'
  | 'manage_users'
  | 'view_dashboard'
  | 'system_admin';

export class Permission {
  private constructor(private readonly value: PermissionType) {}

  static create(value: string): Permission {
    const validPermissions: PermissionType[] = [
      'manage_contacts',
      'manage_quotes',
      'manage_leads',
      'manage_users',
      'view_dashboard',
      'system_admin',
    ];

    if (!validPermissions.includes(value as PermissionType)) {
      throw new ValidationError(`Invalid permission: ${value}`);
    }

    return new Permission(value as PermissionType);
  }

  getValue(): PermissionType {
    return this.value;
  }

  equals(other: Permission): boolean {
    return this.value === other.value;
  }
}
