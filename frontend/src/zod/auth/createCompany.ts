import z from "zod";
import { baseUserSchema} from "./createUser";
const baseCompanySchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  description: z.string().min(1, { error: 'Description is required' }),
  website: z.string().url({ error: 'Website is required' }),
  address: z.string().min(1, { error: 'Address is required' }),
});
const newUserSchema = baseUserSchema.pick({
  userName: true,
  email: true,
  password: true,
  confirmPassword:true,
})
export const fullNewCompanySchema = z.object({
  ...baseCompanySchema.shape,
  ...newUserSchema.shape,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type CreateCompany = z.infer<typeof fullNewCompanySchema>;
