import {
  Account,
  getByEmailHandler,
  listHandler,
} from "../../utils/handlers/accounts";
import { WebClient, WebAPICallResult } from "@slack/web-api";
import { SlackUser } from "../types";

const client = new WebClient();

const convertSlackUserToReturnType = (user: SlackUser): Account => ({
  id: user.id,
  email: user.profile.email,
  username: user.profile.display_name,
  image: {
    small: user.profile.image_24,
  },
});

export const getByEmail = getByEmailHandler(async ({ params }, callback) => {
  interface Response extends WebAPICallResult {
    user: SlackUser;
  }
  const { email, token } = params;

  const { user } = (await client.users.lookupByEmail({
    token,
    email,
  })) as Response;

  callback({
    code: 200,
    body: convertSlackUserToReturnType(user),
  });
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