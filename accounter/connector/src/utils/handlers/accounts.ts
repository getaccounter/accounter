import { makeHandler } from "./utils";
import * as z from "zod";

export type Account = {
  id: string;
  email: string;
  username: string;
  image: {
    small: string;
  };
};

export const getByEmailHandler = makeHandler({
  params: z.object({
    email: z.string(),
    token: z.string(),
  }),
})<Account>();

export const listHandler = makeHandler({
  params: z.object({ token: z.string() }),
})<Array<Account>>();
