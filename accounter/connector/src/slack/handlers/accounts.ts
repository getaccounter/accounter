import {
  Account,
  getByIdHandler,
  getByEmailHandler,
  listHandler,
} from "../../utils/handlers/accounts";
import { WebClient, WebAPICallResult, ErrorCode } from "@slack/web-api";
import { SlackUser } from "../types";

const client = new WebClient();

const convertSlackUserToReturnType = (user: SlackUser): Account => ({
  id: user.id,
  email: user.profile.email,
  username: user.profile.display_name,
  image: {
    small: user.profile.image_24,
  },
  role: user.is_owner ? "OWNER" : user.is_admin ? "ADMIN" : "USER",
});

export const getByEmail = getByEmailHandler(async ({ params }, callback) => {
  interface Response extends WebAPICallResult {
    user: SlackUser;
  }
  const { email, token } = params;
  try {
    const { user } = (await client.users.lookupByEmail({
      token,
      email,
    })) as Response;

    callback({
      code: 200,
      body: {
        found: true,
        account: convertSlackUserToReturnType(user),
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
  const { members } = (await client.users.list({ token })) as Response;
  const membersWithoutBots = members
    .filter((m) => m.id !== "USLACKBOT")
    .filter((m) => !m.is_bot);

  callback({
    code: 200,
    body: membersWithoutBots.map((m) => convertSlackUserToReturnType(m)),
  });
});

export const getById = getByIdHandler(async ({ params }, callback) => {
  interface Response extends WebAPICallResult {
    user: SlackUser;
  }
  const { id, token } = params;
  try {
    const { user } = (await client.users.info({
      token,
      user: id,
    })) as Response;

    callback({
      code: 200,
      body: {
        found: true,
        account: convertSlackUserToReturnType(user),
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
