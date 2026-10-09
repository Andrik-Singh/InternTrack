import * as z from "zod";

export const baseUserSchema = z.object({
  userName: z.string().min(1,{error: "User name is required"}).regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, hyphens and apostrophes allowed"),
  email: z.string().email({error:"Invalid email"}),
  password: z.string().min(1,{error: "Password is required"}),
  confirmPassword: z.string().min(1, { error: "Confirm password is required" }),
  role: z.enum(['ADMIN', 'INTERN', 'MENTOR'],{error: "Role is required"}).default('INTERN'),
})
export const finalUserSchema = baseUserSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type INewUserSchemaInput=z.input<typeof finalUserSchema>
export type INewUserSchemaOutput=z.output<typeof finalUserSchema>
