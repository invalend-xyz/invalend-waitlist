import { z } from "zod";

export const waitlistSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type WaitlistSchema = z.infer<typeof waitlistSchema>;