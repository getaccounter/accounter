import { parseRequiredEnv } from "../utils/envParsers"

export const GITHUB_PRIVATE_KEY = parseRequiredEnv('GITHUB_PRIVATE_KEY', String)
export const GITHUB_APP_ID = parseRequiredEnv('GITHUB_APP_ID', String)