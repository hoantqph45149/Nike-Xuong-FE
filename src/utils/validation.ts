import * as z from "zod";

const sizeSchema = z.object({
  size: z.string().min(1, "Size is required"),
  quantity: z.number().min(0, "Quantity must be at least 0").optional(),
});

export const colorSchema = z.object({
  color: z.string().min(1, "Color is required"),
});
export const productSchema = z.object({
  title: z.string().min(6, "Title must be at least 6 characters").trim(),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category ID is required"),
  sizes: z.array(sizeSchema).min(1, "At least one size is required"), // Thêm xác thực cho sizes
  thumbnail: z.string().url().optional(), // Thêm xác thực cho thumbnail (có thể là URL)
  colors: z.array(colorSchema).min(1, "At least one color is required"),
  gender: z.enum(["Man", "Woman", "Unisex"]),
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

export const CheckoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .regex(
      /^(0[3|5|7|8|9][0-9]{8}|(84[3|5|7|8|9][0-9]{8}))$/,
      "Invalid phone number format"
    ),
  address: z.string().trim().min(1, "Address is required"),
  payment: z.string().min(1, "Payment is required"),
  note: z.string().optional(),
});
