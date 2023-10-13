import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100, "Title must be less than 80 characters.")
    .min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
});
