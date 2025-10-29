type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
};

type ValidationResult = {
  isValid: boolean;
  required?: true;
  minLength?: true;
  maxLength?: true;
  email?: true;
  numeric?: true;
};

export const updateObject = <TTarget, TUpdate extends Partial<TTarget>>(
  original: TTarget,
  updates: TUpdate
): TTarget & TUpdate => ({
  ...original,
  ...updates,
});

export const checkValidity = (
  value: unknown,
  rules?: ValidationRules
): ValidationResult => {
  const result: ValidationResult = { isValid: true };

  if (!rules) {
    return result;
  }

  const stringValue = typeof value === "string" ? value : String(value ?? "");

  if (rules.required) {
    result.isValid = stringValue.trim().length > 0;
    if (!result.isValid) {
      result.required = true;
      return result;
    }
  }

  if (typeof rules.minLength === "number") {
    result.isValid = stringValue.length >= rules.minLength;
    if (!result.isValid) {
      result.minLength = true;
      return result;
    }
  }

  if (typeof rules.maxLength === "number") {
    result.isValid = stringValue.length <= rules.maxLength;
    if (!result.isValid) {
      result.maxLength = true;
      return result;
    }
  }

  if (rules.isEmail) {
    const emailPattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    result.isValid = emailPattern.test(stringValue);
    if (!result.isValid) {
      result.email = true;
      return result;
    }
  }

  if (rules.isNumeric) {
    const numericPattern = /^\d+$/;
    result.isValid = numericPattern.test(stringValue);
    if (!result.isValid) {
      result.numeric = true;
      return result;
    }
  }

  return result;
};
