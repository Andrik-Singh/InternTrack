import { z } from "zod";
export const signInSchema = z.object({
  email: z.string().email({error:"Invalid email"}),
  password: z.string().min(8, {error: "Password must be 8 characters long"}),
});
export type SignInSchema = z.infer<typeof signInSchema>;
