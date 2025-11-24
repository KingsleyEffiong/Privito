import { config } from "dotenv";

config({ path: `.env.local` });

// Add validation and type assertions
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const CRYPTONEWAPI = getEnvVariable("CRYPTONEWAPI");
export const DB_URI = getEnvVariable("DB_URI");
export const JWT_SECRET = getEnvVariable("JWT_SECRET");
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // Optional fallback
export const RESEND_API_KEY = getEnvVariable("RESEND_API_KEY");
