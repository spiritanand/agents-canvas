import { z } from "zod";

export const createAgentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, {
      message: "Name must be less than 50 characters.",
    })
    .transform((val) => val.trim())
    .refine((val) => !!val, {
      message: "Name cannot be empty.",
    }),
});

export type CreateAgentSchema = z.infer<typeof createAgentSchema>;
