import z from "zod";

export const eventFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Event name is required",
    })
    .max(255, { message: "Event name must be less than 255 characters" }),
  gameName: z.string().min(1, {
    message: "Game name is required",
  }),
  description: z.string().min(2, {
    message: "Description is required",
  }),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
