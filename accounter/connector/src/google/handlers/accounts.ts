import {
  Account,
  getByIdHandler,
  listHandler,
} from "../../utils/handlers/accounts";
import { google } from "googleapis";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../env";
import { admin_directory_v1 } from "googleapis/build/src/apis/admin/directory_v1.d"

const convertGoogleUserToReturnType = (
  user: admin_directory_v1.Schema$User,
): Account => {
  return {
    id: user.id!,
    firstName: user.name!.givenName!,
    lastName: user.name!.familyName!,
    email: user.primaryEmail!,
    username: user.primaryEmail!,
    image: {
      small: null,
      big: null,
    },
    role: user.isAdmin ? "ADMIN" : "USER",
    externalProfile: `https://admin.google.com/ac/users/${user.id!}`,
    isDisabled: Boolean(user.suspended || user.archived)
  };
};

export const list = listHandler(async ({ params }, callback) => {
  const { token } = params;

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({access_token: token});
  const adminSDK = google.admin({
    version: "directory_v1",
    auth: oauth2Client,
  });

  try {
    const {data} = await adminSDK.users.list({
      customer: 'my_customer',
    })

    callback({
      code: 200,
      body: data.users!.map(convertGoogleUserToReturnType),
    });
  } catch (error) {
    if (error.code === 401) {
      callback({
        code: 401,
      });
    } else {
      throw error;
    }
  }
})

export const getById = getByIdHandler(async ({ params }, callback) => {
  const { id, token } = params;
  try {
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({access_token: token});
    const adminSDK = google.admin({
      version: "directory_v1",
      auth: oauth2Client,
    });

    const {data} = await adminSDK.users.get({
      userKey: id,
    })
    callback({
      code: 200,
      body: {
        found: true,
        account: convertGoogleUserToReturnType(data),
      },
    });
  } catch (error) {
    if (error.code === 404) {
      callback({
        code: 200,
        body: {
          found: false,
          account: null,
        },
      });
    } else if (error.code === 401) {
      callback({
        code: 401,
      });
    } else {
      throw error;
    }
  }
});
