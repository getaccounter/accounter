import { RequestHandler } from "express";
import * as z from "zod";
import { decrypt, encrypt } from "../encryption";

interface GenericResponse<Code extends number> {
  code: Code;
};
interface GenericResponseWithBody<Code extends number, Body> extends GenericResponse<Code> {
  body: Body;
};

type Response200<Body> = GenericResponseWithBody<200, Body>;
type Response401 = GenericResponse<401>;
type Response400 = GenericResponseWithBody<400, string>;

export const makeHandler = <Params>(schemas: { params: z.ZodType<Params> }) => <
  ResponsePayload
>() => (
  callback: (
    data: { params: Params },
    callback: (resp: Response200<ResponsePayload> | Response400 | Response401) => void
  ) => void
): RequestHandler => {
    return async (request, reply) => {
      if (request.query && request.query.token) {
        // @ts-expect-error decrypt token
        request.query.token = decrypt(request.query.token)
      }
      const paramValidationResult = await schemas.params.safeParse(request.query);
      if (!paramValidationResult.success) {
        return reply.status(400).send(paramValidationResult.error.message);
      }
      const params = paramValidationResult.data;

      callback({ params }, (response) => {
        // @ts-expect-error body
        const body = response.body
        if (body?.token) {
          body.token = encrypt(body.token)
        }
        reply.status(response.code).send(body);
      });
    };
  };
