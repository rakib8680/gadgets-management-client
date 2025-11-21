import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

export const registerValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  confirmPassword: z.string().optional(),
});

export const changePasswordValidationSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    newPassword: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
