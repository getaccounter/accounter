import nock from "nock";
import faker from "faker";
import {
  testAccountsGetById,
  testList,
} from "../../utils/handlers/accounts.testutils";
import { Account } from "../../utils/handlers/accounts";

const createGoogleUser = (account: Account) => {
  const fullName = `${account.firstName} ${account.lastName}`;
  return {
    kind: "admin#directory#user",
    id: account.id,
    etag:
      '"gOh9Uq_ycr-aUnq8woL8QEV8fL8OYaPTx7Cwo9DpKbU/k3V4muCFAOeLJE3vrvvihowHGa8"',
    primaryEmail: account.email,
    name: {
      givenName: account.firstName,
      familyName: account.lastName,
      fullName,
    },
    isAdmin: account.role === "ADMIN",
    isDelegatedAdmin: false,
    lastLoginTime: faker.date.recent(),
    creationTime: faker.date.recent(),
    agreedToTerms: true,
    suspended: false,
    archived: account.isDisabled,
    changePasswordAtNextLogin: false,
    ipWhitelisted: false,
    emails: [
      {
        address: account.email,
        primary: true,
      },
      {
        address: `${account.email}.test-google-a.com`,
      },
    ],
    nonEditableAliases: [`${account.email}.test-google-a.com`],
    customerId: faker.random.uuid(),
    orgUnitPath: "/",
    isMailboxSetup: true,
    isEnrolledIn2Sv: false,
    isEnforcedIn2Sv: false,
    includeInGlobalAddressList: true,
  };
};

const derivation = (account: Account) => ({
  username: account.email,
  image: {
    big:
      "https://ssl.gstatic.com/images/branding/product/1x/avatar_square_grey_512dp.png",
    small:
      "https://www.gstatic.com/images/branding/product/2x/avatar_square_grey_48dp.png",
  },
  // owners do not exist in google
  role: account.role === "OWNER" ? "ADMIN" : account.role
});

describe("accounts", () => {
  testAccountsGetById("/google", derivation, {
    found: async ({ params }, { account }) => {
      const { token, id } = params;
      nock("https://admin.googleapis.com", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/admin/directory/v1/users/${id}`)
        .once()
        .reply(200, createGoogleUser(account!));
    },
    notFound: async ({ params }, { account }) => {
      const { token, id } = params;
      nock("https://admin.googleapis.com", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/admin/directory/v1/users/${id}`)
        .once()
        .reply(404, {
          error: {
            code: 404,
            message: "Resource Not Found: userKey",
            errors: [
              {
                message: "Resource Not Found: userKey",
                domain: "global",
                reason: "notFound",
              },
            ],
          },
        });
    },
    disabled: async ({ params }, { account }) => {
      const { token, id } = params;
      nock("https://admin.googleapis.com", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/admin/directory/v1/users/${id}`)
        .once()
        .reply(200, createGoogleUser(account!));
    },
    invalidToken: async ({ params }) => {
      const { token, id } = params;
      nock("https://admin.googleapis.com", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/admin/directory/v1/users/${id}`)
        .once()
        .reply(401, {
          error: {
            code: 401,
            message:
              "Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
            errors: [
              {
                message: "Invalid Credentials",
                domain: "global",
                reason: "authError",
                location: "Authorization",
                locationType: "header",
              },
            ],
            status: "UNAUTHENTICATED",
          },
        });
    },
  });

  testList("/google", derivation, {
    success: async ({ params }, expectedReturnValue) => {
      const { token } = params;
      const members = [...expectedReturnValue.map(createGoogleUser)];
      nock("https://admin.googleapis.com", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get("/admin/directory/v1/users?customer=my_customer")
        .once()
        .reply(200, {
          kind: "admin#directory#users",
          etag:
            '"gOh9Uq_ycr-aUnq8woL8QEV8fL8OYaPTx7Cwo9DpKbU/hMN4D181o5mOTLJ8GfgaBcb_2fw"',
          users: expectedReturnValue.map(createGoogleUser),
        });
    },
    invalidToken: async ({ params }) => {
      const { token } = params;
      nock("https://admin.googleapis.com", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get("/admin/directory/v1/users?customer=my_customer")
        .once()
        .reply(401, {
          error: {
            code: 401,
            message:
              "Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
            errors: [
              {
                message: "Invalid Credentials",
                domain: "global",
                reason: "authError",
                location: "Authorization",
                locationType: "header",
              },
            ],
            status: "UNAUTHENTICATED",
          },
        });
    },
  });
});
