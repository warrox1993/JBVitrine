export interface AdminUserDTO {
  id: string;
  email: string;
  name: string;
  role: {
    name: string;
    permissions: string[];
  };
  lastLoginAt?: string;
}
