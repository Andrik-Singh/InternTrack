import { createUserSchema } from 'src/auth/dto/createUser-dto';
import { z } from 'zod';
export const createCompanySchema = z.object({
  companyName: z
    .string()
    .min(1, { error: 'Name is required' })
    .regex(
      /^[A-Za-z\s'-]+$/,
      'Only letters, spaces, hyphens and apostrophes allowed',
    ),
  description: z.string().min(1, { error: 'Description is required' }),
  website: z.string().url({ error: 'Website is required' }),
  address: z.string().min(1, { error: 'Address is required' }),
});
export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
const userSchema = createUserSchema.pick({
  userName: true,
  email: true,
  password: true,
});
export type UserData = z.infer<typeof userSchema>;

export const incomingRequestData = z.object({
  ...createCompanySchema.shape,
  ...userSchema.shape,
});
export type IncomingNewCompanyRequestData = z.infer<typeof incomingRequestData>;
