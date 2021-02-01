import { Account, getByEmailHandler } from "../../utils/handlers/accounts";
import { WebClient, WebAPICallResult } from "@slack/web-api";
import { SlackUser } from "../types";

const client = new WebClient();

interface ResponseWithUser extends WebAPICallResult {
  user: SlackUser;
}

const convertSlackUserToReturnType = (user: SlackUser): Account => ({
  id: user.id,
  email: user.profile.email,
  username: user.profile.display_name,
  image: {
    small: user.profile.image_24,
  },
});

export const getByEmail = getByEmailHandler(async ({ params }, callback) => {
  const { email, token } = params;
  
  const { user } = (await client.users.lookupByEmail({
    token,
    email,
  })) as ResponseWithUser;

  callback({
    code: 200,
    body: convertSlackUserToReturnType(user),
  });
});
