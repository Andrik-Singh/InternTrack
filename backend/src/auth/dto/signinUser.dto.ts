import { z } from 'zod';

export const signinUserSchema = z.object({
  email: z.string().email({ error: 'Invalid email' }),
  password: z.string({ error: 'Invalid password' }),
});
export type SigninUserDto = z.infer<typeof signinUserSchema>;
