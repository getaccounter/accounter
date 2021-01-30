import { parseRequiredEnv } from "./utils/envParsers";

export const PORT = parseRequiredEnv('PORT', Number)
export const ENCRYPTION_KEY = parseRequiredEnv("ENCRYPTION_KEY", String)
export const NODE_ENV = parseRequiredEnv("NODE_ENV", (val) => val as "development" | "production")