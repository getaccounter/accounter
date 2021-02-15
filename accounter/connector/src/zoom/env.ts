import { parseRequiredEnv } from "../utils/envParsers"


export const ZOOM_CLIENT_ID = parseRequiredEnv('ZOOM_CLIENT_ID', String)
export const ZOOM_CLIENT_SECRET = parseRequiredEnv('ZOOM_CLIENT_SECRET', String)