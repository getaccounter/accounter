import jwt from "jsonwebtoken";
import { ENCRYPTION_KEY } from "../env";
import * as z from "zod";
import { Octokit } from "@octokit/rest";
import { GITHUB_APP_ID, GITHUB_PRIVATE_KEY } from "./env";
import { createAppAuth } from "@octokit/auth-app";

const payloadValidator = z.object({
  installationId: z.string(),
  organizationNodeId: z.string(),
});

export type TokenPayload = z.infer<typeof payloadValidator>;

export const encryptToken = (payload: TokenPayload) =>
  jwt.sign(payload, ENCRYPTION_KEY);

export const decryptToken = (token: string) => {
  let payload;
  try {
    payload = jwt.verify(token, ENCRYPTION_KEY);
  } catch (e) {}
  if (!payload) {
    return null;
  }
  const parseResult = payloadValidator
    .extend({
      iat: z.number(),
    })
    .safeParse(payload);
  return parseResult.success ? parseResult.data : null;
};



export const removeInstallation = async (installationId: string) => {
  const app = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: GITHUB_APP_ID,
      privateKey: GITHUB_PRIVATE_KEY,
    },
  });

  await app.apps.deleteInstallation({
    installation_id: parseInt(installationId, 10),
  });
};