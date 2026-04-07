import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export default loginSchema;