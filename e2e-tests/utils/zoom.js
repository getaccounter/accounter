import { mockServerClient } from "mockserver-client";
import faker from "faker";
import jwt from 'jsonwebtoken'

const createZoomUser = (user, extended) => {
  const zoomUser = {
    id: user.zoom.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.zoom.displayName,
    type: 1,
    pmi: faker.random.uuid(),
    timezone: faker.address.timeZone(),
    verified: 1,
    created_at: faker.date.recent(),
    last_login_time: faker.date.recent(),
    language: "string",
    phone_number: faker.phone.phoneNumber(),
    status: faker.random.word(),
    role_id: "2",
  };

  return extended
    ? {
        ...zoomUser,
        role_name: faker.random.word(),
        use_pmi: false,
        personal_meeting_url: faker.internet.url(),
        dept: faker.commerce.department(),
        pic_url: faker.image.imageUrl(),
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
      }
    : zoomUser;
};

const mockOauthToken = ({ oauthCode, token } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/oauth/token",
        body: {
          type: "STRING",
          string: `code=${oauthCode}`,
          subString: true,
        },
      },
      httpResponse: {
        body: {
          access_token: token,
          refresh_token: faker.random.uuid(),
          expires_in: 3598,
          scope: "user:read:admin",
          token_type: "Bearer",
        },
      },
      times: {
        remainingTimes: 1,
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};

const mockUsersList = ({ token, users = [] } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "GET",
        path: "/v2/users",
        queryStringParameters: {
            page_size: ["300"],
        },
        headers: {
          Authorization: [`Bearer ${token}`],
        },
      },
      httpResponse: {
        body: {
          page_count: 1,
          page_number: 1,
          page_size: 300,
          total_records: 2,
          next_page_token: "",
          users: users.map(createZoomUser),
        },
      },
      times: {
        remainingTimes: 1,
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};

export const mockService = () => {/* noop */}

const mockIntegration = (users) => {
  const oauthCode = faker.random.uuid()
  const token = jwt.sign({
    ver: 7,
    auid: users[0].organization,
    code: oauthCode,
    iss: `zm:cid:${faker.random.uuid()}`,
    gno: 0,
    type: 0,
    tid: 0,
    aud: 'https://oauth.zoom.us',
    uid: faker.random.uuid(),
    nbf: 1000000000,
    exp: 2000000000,
    iat: 1000000000,
    aid: faker.random.uuid(),
    jti: faker.random.uuid()
  }, faker.random.uuid())

  mockOauthToken({
    token,
    oauthCode,
  });

  mockUsersList({
    token,
    users,
  });

  return { oauthCode, name: "Zoom" };
};

export default mockIntegration;
