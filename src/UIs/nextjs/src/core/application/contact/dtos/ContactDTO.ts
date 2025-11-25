export interface ContactDTO {
  id: string;
  type: string;
  email: string;
  name: string;
  message: string;
  phone?: string;
  company?: string;
  createdAt: string;
}

export interface CreateContactDTO {
  type: string;
  email: string;
  name: string;
  message: string;
  phone?: string;
  company?: string;
}
