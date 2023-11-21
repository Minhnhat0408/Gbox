import z from "zod";

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Event name is required",
    })
    .max(255, { message: "Event name must be less than 255 characters" }),
  description: z.string().min(2, {
    message: "Description is required",
  }),
});

export type CreateRoomValues = z.infer<typeof createRoomSchema>;
