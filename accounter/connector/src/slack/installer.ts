import { CallbackOptions, InstallProvider } from "@slack/oauth";
import { IncomingMessage, ServerResponse } from "http";
import {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_STATE_SECRET,
} from "./env";

class CustomInstaller extends InstallProvider {
  parseCodeState(
    payload: { code: string; state: string },
    callbackOptions: CallbackOptions
  ) {
    const url = `https://mock_url/?code=${payload.code}&state=${payload.state}`;
    this.handleCallback(
      { url } as IncomingMessage,
      {} as ServerResponse,
      callbackOptions
    );
  }
}

const installer = new CustomInstaller({
  // NOTE: this will safe the state in memory for now
  // and it will work fine as long as we have only one
  // instance of this service. As soon as we scale this,
  // we need to add a DB. See "Storing installations in a database"
  // https://slack.dev/node-slack-sdk/oauth
  clientId: SLACK_CLIENT_ID,
  clientSecret: SLACK_CLIENT_SECRET,
  stateSecret: SLACK_STATE_SECRET,
  installationStore: {
    storeInstallation: async () => {
      // as of now, we do not store the installation and only return the token
      return;
    },
    fetchInstallation: async () => {
      // as of now, we do not store the installation and only return the token
      throw new Error("Failed fetching installation");
    },
  },
});

export default installer;
