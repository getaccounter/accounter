import server from "../../server";
import faker from "faker";
import {
  Account,
  GetAccountResponse,
  GetByIdHandlerParams,
} from "../../utils/handlers/accounts";
import { encrypt } from "../encryption";

const generateAccount = (overwrite = {}): Account => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  image: {
    small: faker.image.imageUrl(24, 24),
    big: faker.image.imageUrl(192, 192),
  },
  role: "USER",
  ...overwrite,
});

export const testAccountsGetByEmail = async (
  prefix: string,
  setup: (
    data: {
      params: { token: string; email: string };
    },
    expected: GetAccountResponse
  ) => Promise<void>
) => {
  describe("getByEmail", () => {
    it("found", async () => {
      const app = server();
      const expected: GetAccountResponse = {
        found: true,
        account: generateAccount(),
      };
      const token = faker.random.uuid();
      const email = faker.internet.email();
      await setup({ params: { token, email } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getByEmail`,
        query: { token: encrypt(token), email },
      });
      expect(response.json()).toEqual(expected);
    });
    it("not found", async () => {
      const app = server();
      const expected: GetAccountResponse = {
        found: false,
        account: null,
      };
      const token = faker.random.uuid();
      const email = faker.internet.email();
      await setup({ params: { token, email } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getByEmail`,
        query: { token: encrypt(token), email },
      });
      expect(response.json()).toEqual(expected);
    });
    describe("roles", () => {
      it.each([["USER"], ["ADMIN"], ["OWNER"]])("%s", async (role) => {
        const app = server();
        const expected: GetAccountResponse = {
          found: true,
          account: generateAccount({ role }),
        };
        const token = faker.random.uuid();
        const email = faker.internet.email();
        await setup({ params: { token, email } }, expected);
        const response = await app.inject({
          method: "GET",
          url: `${prefix}/accounts/getByEmail`,
          query: { token: encrypt(token), email },
        });
        expect(response.json()).toEqual(expected);
      });
    });
  });
};

export const testAccountsGetById = async (
  prefix: string,
  setup: (
    data: {
      params: GetByIdHandlerParams;
    },
    expected: GetAccountResponse
  ) => Promise<void>
) => {
  describe("getById", () => {
    it("found", async () => {
      const app = server();
      const token = faker.random.uuid();
      const id = faker.random.uuid();
      const expected: GetAccountResponse = {
        found: true,
        account: generateAccount({ id }),
      };
      await setup({ params: { token, id } }, expected);
      const response = await app.inject({
        method: "GET",
        url: `${prefix}/accounts/getById`,
        query: { token: encrypt(token), id },
      });
      expect(response.json()).toEqual(expected);
    });
    it("not found", async () => {
      const app = server();
      const expected: GetAccountResponse = {
        found: false,
        account: null,
      };
      const token = faker.random.uuid();
      const id = faker.random.uuid();
      await setup({ params: { token, id } }, expected);
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
          account: generateAccount({ role }),
        };
        const token = faker.random.uuid();
        const id = faker.random.uuid();
        await setup({ params: { token, id } }, expected);
        const response = await app.inject({
          method: "GET",
          url: `${prefix}/accounts/getById`,
          query: { token: encrypt(token), id },
        });
        expect(response.json()).toEqual(expected);
      });
    });
  });
};

export const testList = async (
  prefix: string,
  setup: (
    data: {
      params: { token: string };
    },
    expected: Array<Account>
  ) => Promise<void>
) => {
  it("list", async () => {
    const app = server();
    const expected = [generateAccount(), generateAccount(), generateAccount()];
    const token = faker.random.uuid();
    await setup({ params: { token } }, expected);
    const response = await app.inject({
      method: "GET",
      url: `${prefix}/accounts/list`,
      query: { token: encrypt(token) },
    });
    expect(response.json()).toEqual(expected);
  });
};
