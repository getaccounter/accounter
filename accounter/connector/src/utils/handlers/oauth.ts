import { makeHandler } from "./utils";
import * as z from "zod";

const oauthParamSchema = z.object({
  redirectUri: z.string(),
});
export const oauthHandler = makeHandler({
  params: oauthParamSchema,
})<{ url: string }>();

const handleOAuthParamSchema = z.object({
  code: z.string(),
  state: z.string(),
});
export const oauthCallbackHandler = makeHandler({
  params: handleOAuthParamSchema,
})<{
  token: string;
  integrationId: string;
  integrationName: string;
}>();
