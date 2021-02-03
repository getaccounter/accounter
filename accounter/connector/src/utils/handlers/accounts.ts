import { makeHandler } from "./utils";
import * as z from "zod";

type Role = "USER" | "ADMIN" | "OWNER"

export type Account = {
  id: string;
  email: string;
  username: string;
  image: {
    small?: string;
    big?: string;
  };
  role: Role
};

export type GetAccountResponse = {
  found: true,
  account: Account
} | {
  found: false,
  account: null
}
export const getByEmailHandler = makeHandler({
  params: z.object({
    email: z.string(),
    token: z.string(),
  }),
})<GetAccountResponse>();

const getByIdParamsValidatpr = z.object({ token: z.string(), id: z.string() })
export type GetByIdHandlerParams = z.infer<typeof getByIdParamsValidatpr>
export const getByIdHandler = makeHandler({
  params: getByIdParamsValidatpr,
})<GetAccountResponse>();

export const listHandler = makeHandler({
  params: z.object({ token: z.string() }),
})<Array<Account>>();

