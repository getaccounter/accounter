import jwt from "jsonwebtoken";
import { ENCRYPTION_KEY } from "../env";
import * as z from "zod";

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
