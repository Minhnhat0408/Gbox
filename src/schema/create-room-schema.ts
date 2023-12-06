import z from "zod";

export const createRoomSchema = z.object({
  name: z
    .string()
    .max(255, { message: "Event name must be less than 255 characters" }).optional(),
  currentPeople: z.coerce.number({invalid_type_error:"Expected number",required_error: "Current people is required"}).min(1, {
    message: " At least one person in the room",
  }),
  totalPeople:z.coerce.number({required_error: "Total people is required",invalid_type_error:"Total people is required"})
}).refine((data) => data.currentPeople <= data.totalPeople, {
  message: "Current people must be less than total people",
  path: ["currentPeople"],
  });

