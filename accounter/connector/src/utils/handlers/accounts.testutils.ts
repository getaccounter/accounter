import server from "../../server";
import faker from "faker";
import { Account, GetByEmailResponse } from "../../utils/handlers/accounts";

const generateAccount = (): Account => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  image: { small: faker.image.imageUrl(24, 24) },
});

export const testAccountsGetByEmail = async (
  prefix: string,
  setup: (
    data: {
      params: { token: string; email: string };
    },
    expected: GetByEmailResponse
  ) => Promise<void>
) => {
  it("getByEmail", async () => {
    const app = server();
    const expected: GetByEmailResponse = {
      found: true,
      account: generateAccount(),
    };
    const token = faker.random.uuid();
    const email = faker.internet.email();
    await setup({ params: { token, email } }, expected);
    const response = await app.inject({
      method: "GET",
      url: `${prefix}/accounts/getByEmail`,
      query: { token, email },
    });
    expect(response.json()).toEqual(expected);
  });
  it("getByEmail not found", async () => {
    const app = server();
    const expected: GetByEmailResponse = {
      found: false,
      account: null,
    };
    const token = faker.random.uuid();
    const email = faker.internet.email();
    await setup({ params: { token, email } }, expected);
    const response = await app.inject({
      method: "GET",
      url: `${prefix}/accounts/getByEmail`,
      query: { token, email },
    });
    expect(response.json()).toEqual(expected);
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
      query: { token },
    });
    expect(response.json()).toEqual(expected);
  });
};
