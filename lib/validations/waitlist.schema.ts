import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  captchaToken: z.string().min(1, "Captcha token is required"),
});

export type WaitlistSchema = z.infer<typeof waitlistSchema>;
