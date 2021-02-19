import { parseRequiredEnv } from "../utils/envParsers"

export const GITHUB_PRIVATE_KEY = parseRequiredEnv('GITHUB_PRIVATE_KEY', String)