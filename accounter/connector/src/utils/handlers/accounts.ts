import { makeHandler } from "./utils";
import * as z from "zod";

export type Account = {
  id: string,
  email: string,
  username: string,
  image: {
    small: string,
  }
}

const getByEmailParamSchema = z.object({
  email: z.string(),
  token: z.string(),
});

export const getByEmailHandler = makeHandler({
  params: getByEmailParamSchema,
})<Account>();