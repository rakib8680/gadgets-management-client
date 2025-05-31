import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});
