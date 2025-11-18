import { ValidationResult } from 'types';
import * as yup from 'yup';

const searchSchema = yup.object({
  minPrice: yup.number().integer().min(0).optional(),
  maxPrice: yup.number().integer().min(0).optional(),
  suburb: yup.string().optional(),
  city: yup.string().optional(),
});

export const validateSearchParams = (params: any): ValidationResult => {
  try {
    // Coerce numbers where appropriate
    const normalized = {
      ...params,
      minPrice: params.minPrice !== undefined ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice !== undefined ? Number(params.maxPrice) : undefined,
    };

    searchSchema.validateSync(normalized, { abortEarly: false, stripUnknown: true });
    return { valid: true };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return { valid: false, errors: err.errors };
    }
    return { valid: false, errors: [(err as Error).message] };
  }
};
