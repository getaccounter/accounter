import nock from "nock";
import faker from "faker";
import {
  testAccountsGetById,
  testList,
} from "../../utils/handlers/accounts.testutils";
import { Account } from "../../utils/handlers/accounts";
import app from "..";

const createZoomUser = (account: Account, extended: boolean) => {
  const zoomUser = {
    id: account.id,
    first_name: account.firstName,
    last_name: account.lastName,
    email: account.email,
    type: 1,
    pmi: faker.random.uuid(),
    timezone: faker.address.timeZone(),
    verified: 1,
    created_at: faker.date.recent(),
    last_login_time: faker.date.recent(),
    language: "string",
    phone_number: faker.phone.phoneNumber(),
    status: faker.random.word(),
    role_id: account.role === "OWNER" ? "0" : account.role === "ADMIN" ? "1" : "2",
  };

  return extended ? {
    ...zoomUser,
    role_name: faker.random.word(),
    use_pmi: false,
    personal_meeting_url: faker.internet.url(),
    dept: faker.commerce.department(),
    pic_url : account.image.big,
    host_key: faker.random.uuid(),
    cms_user_id: faker.random.uuid(),
    jid: faker.random.uuid(),
    group_ids: [],
    im_group_ids: [],
    account_id: faker.random.uuid(),
    phone_country: faker.phone.phoneNumber(),
    job_title: faker.name.jobTitle(),
    location: faker.address.country(),
    login_types: [100],
  } : zoomUser
};

const derivation = (account: Account) => ({
  username: account.email,
  // only has one image
  image: {
    big: account.image.big,
    small: account.image.big,
  },
  // never disabled
  isDisabled: false,
});

describe("accounts", () => {
  testAccountsGetById(app, derivation, {
    found: async ({ params }, { account }) => {
      const { token, id } = params;
      nock("https://api.zoom.us", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/v2/users/${id}`)
        .once()
        .reply(200, createZoomUser(account!, true));
    },
    notFound: async ({ params }, { account }) => {
      const { token, id } = params;
      nock("https://api.zoom.us", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/v2/users/${id}`)
        .once()
        .reply(404, {
          code: 1001,
          message: "User does not exist: asdasdasd.",
        });
    },
    disabled: async ({ params }, { account }) => {
      const { token, id } = params;
      nock("https://api.zoom.us", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/v2/users/${id}`)
        .once()
        .reply(200, createZoomUser(account!, true));
    },
    invalidToken: async ({ params }) => {
      const { token, id } = params;
      nock("https://api.zoom.us", {
        reqheaders: {
          authorization: `Bearer ${token}`,
        },
      })
        .get(`/v2/users/${id}`)
        .once()
        .reply(401, {
          code: 124,
          message: "Invalid access token.",
        });
    },
  });

  //   testList(app, derivation, {
  //     success: async ({ params }, expectedReturnValue) => {
  //       const { token } = params;
  //       const members = [...expectedReturnValue.map(createGoogleUser)];
  //       nock("https://api.zoom.us", {
  //         reqheaders: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .get("/v2/users?customer=my_customer")
  //         .once()
  //         .reply(200, {
  //           kind: "admin#directory#users",
  //           etag:
  //             '"gOh9Uq_ycr-aUnq8woL8QEV8fL8OYaPTx7Cwo9DpKbU/hMN4D181o5mOTLJ8GfgaBcb_2fw"',
  //           users: expectedReturnValue.map(createGoogleUser),
  //         });
  //     },
  //     invalidToken: async ({ params }) => {
  //       const { token } = params;
  //       nock("https://api.zoom.us", {
  //         reqheaders: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .get("/v2/users?customer=my_customer")
  //         .once()
  //         .reply(401, {
  //           error: {
  //             code: 401,
  //             message:
  //               "Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
  //             errors: [
  //               {
  //                 message: "Invalid Credentials",
  //                 domain: "global",
  //                 reason: "authError",
  //                 location: "Authorization",
  //                 locationType: "header",
  //               },
  //             ],
  //             status: "UNAUTHENTICATED",
  //           },
  //         });
  //     },
  //   });
});
