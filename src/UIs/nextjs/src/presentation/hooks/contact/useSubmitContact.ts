import { useState } from 'react';
import { CreateContactDTO } from '../../../core/application/contact/dtos/ContactDTO';

interface UseSubmitContactResult {
  submit: (data: CreateContactDTO) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export function useSubmitContact(): UseSubmitContactResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: CreateContactDTO) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'An error occurred');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error, success };
}
