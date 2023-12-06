import z from "zod";

export const createGroupChatSchema = z.object({
  name: z
    .string({required_error: "Group chat name is required"})
    .max(255, { message: "Group chat name must be less than 255 characters" }),
 
})

