import { z } from "zod";


const createPageSchema = z.object({
    websiteId: z.string().trim().min(1, "Website id is required"),

    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters"),

    slug: z
        .string()
        .trim()
        .max(100, "Slug cannot exceed 100 characters")
        .optional(),

    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(150, "Title cannot exceed 150 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),

    isHomePage: z.boolean().optional().default(false),

    

    status: z
        .enum(["draft", "published", "archived"])
        .optional()
        .default("draft")
}).superRefine((data, ctx) => {
    if (!data.isHomePage && (!data.slug || data.slug.trim() === "")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["slug"],
            message: "Slug is required for non-home pages"
        });
    }
});


export default createPageSchema;