import * as z from "zod";

export const userFormSchema = z.object({
  userName: z
    .string()
    .min(8, "Username must be at least 8 characters.")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Invalid username. Please use only letters and numbers."
    ),
  bio: z.string().max(160, "Bio must be less than 160 characters."),
});

export type UserFormType = z.infer<typeof userFormSchema>;
