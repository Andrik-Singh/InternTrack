import { z } from 'zod';

export const createUserSchema = z.object({
  userName: z
    .string()
    .min(5, { error: 'Username must be at least 5 characters long' }),
  email: z.string().email({ error: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters long' }),
  companyId: z.uuid(),
  role: z.enum(['ADMIN', 'INTERN', 'MENTOR']),
});
export type CreateUserDto = z.infer<typeof createUserSchema>;
