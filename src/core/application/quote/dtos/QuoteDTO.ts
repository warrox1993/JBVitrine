export interface QuoteDTO {
  id: string;
  email: string;
  name: string;
  company?: string;
  projectType: string;
  items: QuoteItemDTO[];
  totalAmount: number;
  currency: string;
  status: string;
  createdAt: string;
  validUntil: string;
}

export interface QuoteItemDTO {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreateQuoteDTO {
  email: string;
  name: string;
  company?: string;
  projectType: string;
  features: string[];
}
