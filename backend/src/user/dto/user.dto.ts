import { createUserSchema } from 'src/auth/dto/createUser-dto';
import { z } from 'zod';

export const updateUserSchema = z.object({
  userName: z
    .string()
    .min(5, { error: 'Username must be at least 5 characters long' })
    .optional(),
  avatar: z.string().url({ error: 'Avatar must be a valid url' }).optional(),
});
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string({ error: 'Current password is required' }),
  newPassword: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters long' }),
});
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export const createMemberSchema = createUserSchema
  .pick({
    userName: true,
    email: true,
    password: true,
  })
  .extend({
    companyId: z.uuid({ error: 'companyId must be a valid uuid' }),
    role: z.enum(['INTERN', 'MENTOR'], {
      error: 'role must be INTERN or MENTOR',
    }),
  });
export type CreateMemberDto = z.infer<typeof createMemberSchema>;

export const updateUserRoleSchema = z.object({
  role: z.enum(['ADMIN', 'INTERN', 'MENTOR'], {
    error: 'role must be ADMIN, INTERN, or MENTOR',
  }),
});
export type UpdateUserRoleDto = z.infer<typeof updateUserRoleSchema>;
