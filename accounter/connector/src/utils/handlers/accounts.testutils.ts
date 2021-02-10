import server from "../../server";
import faker from "faker";
import {
  Account,
  GetAccountResponse,
  GetByIdHandlerParams,
} from "../../utils/handlers/accounts";
import { encrypt } from "../encryption";

type AccountGenerationDerivation = (account: Account) => Partial<Account>;
const noop = () => ({});

const generateAccount = (
  derivation: AccountGenerationDerivation = noop,
  overwrite: Partial<Account> = {}
): Account => {
  const account = {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    image: {
      small: faker.image.imageUrl(24, 24),
      big: faker.image.imageUrl(192, 192),
    },
    role: "USER" as Account["role"],
    externalProfile: expect.any(String),
    isDisabled: false,
  };
  return {
    ...account,
    ...overwrite,
    ...derivation(account),
  };
};

export const testAccountsGetById = async (
  prefix: string,
  derivation: AccountGenerationDerivation,
  setup: {
    found: (
      data: {
        params: GetByIdHandlerParams;
      },
      expected: GetAccountResponse
    ) => Promise<void>;
    notFound: (
      data: {
        params: GetByIdHandlerParams;
      },
      expected: GetAccountResponse
    ) => Promise<void>;
    disabled: (
      data: {
        params: GetByIdHandlerParams;
      },
      expected: GetAccountResponse
    ) => Promise<void>;
    invalidToken: (data: { params: GetByIdHandlerParams }) => Promise<void>;
  }
) => {
  describe("getById", () => {
    it("found", async () => {
      const app = server();
      const token = faker.random.uuid();
      const id = faker.random.uuid();
      const expected: GetAccountResponse = {
        found: true,
        account: generateAccount(derivation, { id }),
      };
      await setup.found({ params: { token, id } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getById`,
        query: { token: encrypt(token), id },
      });
      expect(response.json()).toEqual(expected);
    });
    describe("roles", () => {
      it.each([["USER"], ["ADMIN"], ["OWNER"]])("%s", async (role) => {
        const app = server();
        const expected: GetAccountResponse = {
          found: true,
          account: generateAccount(derivation, {
            role: role as Account["role"],
          }),
        };
        const token = faker.random.uuid();
        const id = faker.random.uuid();
        await setup.found({ params: { token, id } }, expected);
        const response = await app.inject({
          method: "GET",
          url: `${prefix}/accounts/getById`,
          query: { token: encrypt(token), id },
        });
        expect(response.json()).toEqual(expected);
      });
    });
    it("not found", async () => {
      const app = server();
      const expected: GetAccountResponse = {
        found: false,
        account: null,
      };
      const token = faker.random.uuid();
      const id = faker.random.uuid();
      await setup.notFound({ params: { token, id } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getById`,
        query: { token: encrypt(token), id },
      });
      expect(response.json()).toEqual(expected);
    });
    it("disabled", async () => {
      const app = server();
      const expected: GetAccountResponse = {
        found: true,
        account: generateAccount(derivation, { isDisabled: true }),
      };
      const token = faker.random.uuid();
      const id = faker.random.uuid();
      await setup.disabled({ params: { token, id } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getById`,
        query: { token: encrypt(token), id },
      });
      expect(response.json()).toEqual(expected);
    });
    it("invalid token", async () => {
      const app = server();
      const token = faker.random.uuid();
      const id = faker.random.uuid();
      await setup.invalidToken({ params: { token, id } });
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getById`,
        query: { token: encrypt(token), id },
      });
      expect(response.statusCode).toEqual(401);
    });
  });
};

export const testList = async (
  prefix: string,
  derivation: AccountGenerationDerivation,
  setup: {
    success: (
      data: {
        params: { token: string };
      },
      expected: Array<Account>
    ) => Promise<void>;
    invalidToken: (data: { params: { token: string } }) => Promise<void>;
  }
) => {
  describe("list", () => {
    it("success", async () => {
      const app = server();
      const expected = [
        generateAccount(derivation),
        generateAccount(derivation),
        generateAccount(derivation),
      ];
      const token = faker.random.uuid();
      await setup.success({ params: { token } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/list`,
        query: { token: encrypt(token) },
      });
      expect(response.json()).toEqual(expected);
    });
    it("invalid token", async () => {
      const app = server();
      const token = faker.random.uuid();
      await setup.invalidToken({ params: { token } });
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/list`,
        query: { token: encrypt(token) },
      });
      expect(response.statusCode).toEqual(401);
    });
  });
};
