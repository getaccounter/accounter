import {
  Account,
  getByIdHandler,
  getByEmailHandler,
  listHandler,
} from "../../utils/handlers/accounts";
import { WebClient, WebAPICallResult, ErrorCode } from "@slack/web-api";
import { SlackUser } from "../types";
import human from "humanparser"

const client = new WebClient();

const convertSlackUserToReturnType = (
  user: SlackUser,
  workspaceUrl: string
): Account => {
  const {firstName, lastName} = human.parseName(user.profile.real_name)
  return {
    id: user.id,
    firstName: user.profile.first_name ?? firstName,
    lastName: user.profile.last_name ?? lastName,
    email: user.profile.email,
    username: user.profile.display_name,
    image: {
      small: user.profile.image_48,
      big: user.profile.image_192,
    },
    role: user.is_owner ? "OWNER" : user.is_admin ? "ADMIN" : "USER",
    externalProfile: `${workspaceUrl}team/${user.id}`,
  };
};

interface AuthTest extends WebAPICallResult {
  url: string;
}

const getWorkspaceUrl = async (token: string) => {
  const { url } = (await client.auth.test({
    token,
  })) as AuthTest;
  return url;
};

export const getByEmail = getByEmailHandler(async ({ params }, callback) => {
  interface LookupResponse extends WebAPICallResult {
    user: SlackUser;
  }
  const { email, token } = params;
  try {
    const [{ user }, url] = await Promise.all([
      client.users.lookupByEmail({ token, email }) as Promise<LookupResponse>,
      getWorkspaceUrl(token),
    ]);

    callback({
      code: 200,
      body: {
        found: true,
        account: convertSlackUserToReturnType(user, url),
      },
    });
  } catch (error) {
    if (error.data.error === "users_not_found") {
      callback({
        code: 200,
        body: {
          found: false,
          account: null,
        },
      });
    } else {
      throw error;
    }
  }
});

export const list = listHandler(async ({ params }, callback) => {
  interface Response extends WebAPICallResult {
    members: Array<SlackUser>;
  }
  const { token } = params;
  const [{ members }, url] = await Promise.all([
    client.users.list({ token }) as Promise<Response>,
    getWorkspaceUrl(token),
  ]);
  const membersWithoutBots = members
    .filter((m) => m.id !== "USLACKBOT")
    .filter((m) => !m.is_bot);

  callback({
    code: 200,
    body: membersWithoutBots.map((m) => convertSlackUserToReturnType(m, url)),
  });
});

export const getById = getByIdHandler(async ({ params }, callback) => {
  interface Response extends WebAPICallResult {
    user: SlackUser;
  }
  const { id, token } = params;
  try {
    const [{ user }, url] = await Promise.all([
      client.users.info({ token, user: id }) as Promise<Response>,
      getWorkspaceUrl(token),
    ]);

    callback({
      code: 200,
      body: {
        found: true,
        account: convertSlackUserToReturnType(user, url),
      },
    });
  } catch (error) {
    if (error.data.error === "users_not_found") {
      callback({
        code: 200,
        body: {
          found: false,
          account: null,
        },
      });
    } else {
      throw error;
    }
  }
});
