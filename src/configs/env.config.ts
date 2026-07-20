import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535),

  DATABASE_URL: z.url(),

  NODE_ENV: z.enum(["development", "production", "test"]),

  CLERK_PUBLISHABLE_KEY: z.string().min(1),

  CLERK_SECRET_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
});
