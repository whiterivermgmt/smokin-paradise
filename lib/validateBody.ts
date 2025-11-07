import { z, ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>, body: unknown) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const issues = result.error.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
    const err: any = new Error('Invalid request body');
    err.status = 400;
    err.details = issues;
    throw err;
  }
  return result.data;
}
