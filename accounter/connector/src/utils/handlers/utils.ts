import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";

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
    const paramValidationResult = await schemas.params.safeParse(request.query);
    if (!paramValidationResult.success) {
      return reply.code(400).send(paramValidationResult.error.message);
    }
    const params = paramValidationResult.data;

    callback({ params }, ({ code, body }) => {
      reply.code(code).send(body);
    });
  };
};
