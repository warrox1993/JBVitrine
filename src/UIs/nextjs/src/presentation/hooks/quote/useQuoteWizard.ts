import { useState } from 'react';
import { CreateQuoteDTO } from '../../../core/application/quote/dtos/QuoteDTO';

interface UseQuoteWizardResult {
  step: number;
  totalSteps: number;
  data: Partial<CreateQuoteDTO>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<CreateQuoteDTO>) => void;
  submit: () => Promise<void>;
}

export function useQuoteWizard(): UseQuoteWizardResult {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [data, setData] = useState<Partial<CreateQuoteDTO>>({
    features: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateData = (newData: Partial<CreateQuoteDTO>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const submit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quote', {
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

  return {
    step,
    totalSteps,
    data,
    isLoading,
    error,
    success,
    nextStep,
    prevStep,
    updateData,
    submit,
  };
}
