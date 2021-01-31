import { parseRequiredEnv } from "../utils/envParsers"


export const SLACK_CLIENT_ID = parseRequiredEnv('SLACK_CLIENT_ID', String)
export const SLACK_CLIENT_SECRET = parseRequiredEnv('SLACK_CLIENT_SECRET', String)
export const SLACK_STATE_SECRET = parseRequiredEnv('SLACK_STATE_SECRET', String)