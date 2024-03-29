import { makeHandler } from "./utils";
import * as z from "zod";

type Role = "USER" | "ADMIN" | "OWNER"

export type Account = {
  id: string;
  firstName: string,
  lastName: string,
  email: string;
  username: string;
  image: {
    small: string | null;
    big: string | null;
  };
  role: Role;
  externalProfile: string
  isDisabled: boolean
};

export type GetAccountResponse = {
  found: true,
  account: Account
} | {
  found: false,
  account: null
}

const getByIdParamsValidatpr = z.object({ token: z.string(), id: z.string() })
export type GetByIdHandlerParams = z.infer<typeof getByIdParamsValidatpr>
export const getByIdHandler = makeHandler({
  params: getByIdParamsValidatpr,
})<GetAccountResponse>();

export const listHandler = makeHandler({
  params: z.object({ token: z.string() }),
})<Array<Account>>();

