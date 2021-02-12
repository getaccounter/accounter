import { parseRequiredEnv } from "../utils/envParsers"


export const GOOGLE_CLIENT_ID = parseRequiredEnv('GOOGLE_CLIENT_ID', String)
export const GOOGLE_CLIENT_SECRET = parseRequiredEnv('GOOGLE_CLIENT_SECRET', String)