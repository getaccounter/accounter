import server from "../../server";
import faker from "faker";
import {
  Account,
  GetAccountResponse,
  GetByIdHandlerParams,
} from "../../utils/handlers/accounts";
import { decrypt, encrypt } from "../encryption";
import { Express } from "express";
import supertest from "supertest";

export const refreshToken = async (
  server: Express,
  setup: {
    success: (
      data: {
        params: { token: string };
      },
      expected: { token: string }
    ) => Promise<void>;
    invalidToken: (
      data: {
        params: { token: string };
      },
      expected: { token: string }
    ) => Promise<void>;
  }
) => {
  describe("refresh", () => {
    it("success", async () => {
      const refreshToken = faker.random.uuid();
      const token = faker.random.uuid();
      const expected = { token: encrypt(token) };

      const params = { token: encrypt(refreshToken) };

      await setup.success({ params }, expected);
      const response = await supertest(server)
        .get("/oauth/refresh")
        .query(params);
      expect(decrypt(response.body.token)).toEqual(token);
    });
    it("invalid refresh token", async () => {
      const refreshToken = faker.random.uuid();
      const token = faker.random.uuid();
      const expected = { token: encrypt(token) };

      const params = { token: encrypt(refreshToken) };

      await setup.invalidToken({ params }, expected);
      const response = await supertest(server)
        .get("/oauth/refresh")
        .query(params);

      expect(response.status).toEqual(401);
    });
  });
};
