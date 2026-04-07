import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .regex(/^[A-Za-z ]+$/, "First name can only contain letters"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .regex(/^[A-Za-z ]+$/, "Last name can only contain letters"),

    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters")
      .regex(
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers and underscore"
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;