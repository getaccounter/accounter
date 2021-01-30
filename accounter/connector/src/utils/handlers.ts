import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";

type GenericResponse<Code extends number, Body> = {
  code: Code;
  body: Body;
};

type Response200<Body> = GenericResponse<200, Body>;

type Response400 = GenericResponse<400, string>;

const makeHandler = <Params>(schemas: { params: z.ZodType<Params> }) => <
  Resp extends Response400 | Response200<any>
>() => {
  return (
    callback: (data: { params: Params }, callback: (resp: Resp) => void) => void
  ) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const paramValidationResult = await schemas.params.safeParse(
        request.query
      );
      if (!paramValidationResult.success) {
        return reply.code(400).send(paramValidationResult.error.message);
      }
      const params = paramValidationResult.data;

      callback({ params }, ({ code, body }) => {
        reply.code(code).send(body);
      });
    };
  };
};

const oauthParamSchema = z.object({
  redirectUri: z.string(),
});
type OAuthResponseType = Response200<{ url: string }> | Response400;

export const oauthHandler = makeHandler({
  params: oauthParamSchema,
})<OAuthResponseType>();

const handleOAuthParamSchema = z.object({
  code: z.string(),
  state: z.string(),
});
type HandleOAuthCallbackResponseType =
  | Response200<{
      token: string;
      integrationId: string;
      integrationName: string;
    }>
  | Response400;
export const oauthCallbackHandler = makeHandler({
  params: handleOAuthParamSchema,
})<HandleOAuthCallbackResponseType>();
