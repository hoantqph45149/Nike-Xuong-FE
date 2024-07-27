import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6).trim(),
  price: z.number().min(0),
  description: z.string().optional(),
  categoryId: z.string(),
});

export const categorySchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export const profileSchema = z.object({
  username: z.string().min(6).max(255).trim(),
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const registerSchema = z
  .object({
    username: z.string().min(6).max(255).trim(),
    email: z.string().email(),
    password: z.string().min(6).max(255).trim(),
    confirmPass: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Password and confirm password must be the same",
    path: ["confirmPass"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});
