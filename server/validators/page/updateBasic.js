import { z } from "zod";

const updatePageBasicSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters")
        .optional(),

    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(150, "Title cannot exceed 150 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .nullable()
        .optional()
}).refine(
    (data) =>
        data.name !== undefined ||
        data.title !== undefined ||
        data.description !== undefined,
    {
        message: "At least one field is required"
    }
);

export default updatePageBasicSchema;