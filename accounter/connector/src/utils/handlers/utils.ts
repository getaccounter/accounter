import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import { decrypt, encrypt } from "../encryption";

type GenericResponse<Code extends number, Body> = {
  code: Code;
  body: Body;
};

type Response200<Body> = GenericResponse<200, Body>;
type Response400 = GenericResponse<400, string>;

export const makeHandler = <Params>(schemas: { params: z.ZodType<Params> }) => <
  ResponsePayload
>() => (
  callback: (
    data: { params: Params },
    callback: (resp: Response200<ResponsePayload> | Response400) => void
  ) => void
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // @ts-expect-error decrypt token
    if (request.query && request.query.token) {
      // @ts-expect-error decrypt token
      request.query.token = decrypt(request.query.token)
    }
    const paramValidationResult = await schemas.params.safeParse(request.query);
    if (!paramValidationResult.success) {
      return reply.code(400).send(paramValidationResult.error.message);
    }
    const params = paramValidationResult.data;

    callback({ params }, ({ code, body }) => {
      // @ts-expect-error encrypt token
      if (body.token) {
        // @ts-expect-error encrypt token
        body.token = encrypt(body.token)
      }
      reply.code(code).send(body);
    });
  };
};
