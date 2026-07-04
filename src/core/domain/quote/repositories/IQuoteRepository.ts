import { Quote } from '../entities/Quote';

export interface IQuoteRepository {
  save(quote: Quote): Promise<void>;
  findById(id: string): Promise<Quote | null>;
  findAll(): Promise<Quote[]>;
  delete(id: string): Promise<void>;
}
