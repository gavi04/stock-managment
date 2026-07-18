import { z } from 'zod';
import { AppError } from './errors.js';

export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new AppError('Validation failed', 'VALIDATION_ERROR', 400, result.error.flatten());
  }

  return result.data;
}

export const idSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(25),
  search: z.string().trim().optional().default('')
});