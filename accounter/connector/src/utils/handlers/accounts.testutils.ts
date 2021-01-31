import server from "../../server";
import faker from "faker";
import { Account } from "../../utils/handlers/accounts";

export const testAccountsGetByEmail = async (
  prefix: string,
  setup: (
    {
      params: { token, email },
    }: {
      params: { token: string; email: string };
    },
    expected: Account
  ) => Promise<void>
) => {
  const app = server();
  const expected: Account = {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    image: { small: faker.image.imageUrl(24, 24) },
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
};
