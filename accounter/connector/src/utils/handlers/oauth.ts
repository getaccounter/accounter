import { makeHandler } from "./utils";
import * as z from "zod";

const oauthParamSchema = z.object({
  redirectUri: z.string(),
});
export type OAuthReturnType = { url: string }
export const oauthHandler = makeHandler({
  params: oauthParamSchema,
})<OAuthReturnType>();

const handleOAuthParamSchema = z.object({
  code: z.string(),
  state: z.string(),
  redirectUri: z.string()
});
export const oauthCallbackHandler = makeHandler({
  params: handleOAuthParamSchema,
})<{
  token: string;
  refreshToken?: string
  integrationId: string;
  integrationName: string;
  managementUrl: string;
}>();

const refreshTokenParamSChema = z.object({
  token: z.string(),
});

export const refreshTokenHandler = makeHandler({
  params: refreshTokenParamSChema,
})<{
  token: string;
}>();

