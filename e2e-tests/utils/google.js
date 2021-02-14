import { mockServerClient } from "mockserver-client";
import faker from "faker";

const createGoogleUser = (user) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return {
    kind: "admin#directory#user",
    id: user.google.id,
    etag:
      '"gOh9Uq_ycr-aUnq8woL8QEV8fL8OYaPTx7Cwo9DpKbU/k3V4muCFAOeLJE3vrvvihowHGa8"',
    primaryEmail: user.google.displayName,
    name: {
      givenName: user.firstName,
      familyName: user.lastName,
      fullName,
    },
    isAdmin: false,
    isDelegatedAdmin: false,
    lastLoginTime: faker.date.recent(),
    creationTime: faker.date.recent(),
    agreedToTerms: true,
    suspended: false,
    archived: false,
    changePasswordAtNextLogin: false,
    ipWhitelisted: false,
    emails: [
      {
        address: user.google.displayName,
        primary: true,
      },
      {
        address: `${user.google.displayName}.test-google-a.com`,
      },
    ],
    nonEditableAliases: [`${user.google.displayName}.test-google-a.com`],
    customerId: "custeromerId" + user.google.id,
    orgUnitPath: "/",
    isMailboxSetup: true,
    isEnrolledIn2Sv: false,
    isEnforcedIn2Sv: false,
    includeInGlobalAddressList: true,
  };
};

const mockOauthToken = ({ oauthCode, token } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/token",
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
          scope:
            "https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/admin.directory.customer.readonly",
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

const mockCustomerGet = ({ token, user, domain } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "GET",
        path: "/admin/directory/v1/customers/my_customer",
        headers: {
          Authorization: [`Bearer ${token}`],
        },
      },
      httpResponse: {
        body: {
          kind: "admin#directory#customer",
          id: "custeromerId" + user.google.id,
          etag:
            '"gOh9Uq_ycr-aUnq8woL8QEV8fL8OYaPTx7Cwo9DpKbU/Dm4_13wBQjHftrVJtFU6cV8O7DA"',
          customerDomain: domain,
          alternateEmail: user.email,
          postalAddress: {
            contactName: `${user.firstName} ${user.lastName}`,
            organizationName: user.organization,
            countryCode: "ES",
          },
          language: "en",
          customerCreationTime: faker.date.recent(),
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
        path: "/admin/directory/v1/users",
        queryStringParameters: {
          customer: ["my_customer"],
        },
        headers: {
          Authorization: [`Bearer ${token}`],
        },
      },
      httpResponse: {
        body: {
          kind: "admin#directory#users",
          etag:
            '"gOh9Uq_ycr-aUnq8woL8QEV8fL8OYaPTx7Cwo9DpKbU/hMN4D181o5mOTLJ8GfgaBcb_2fw"',
          users: users.map(createGoogleUser),
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

const mockIntegration = (users) => {
  const token = faker.random.uuid();
  const domain = faker.internet.domainName();

  const oauthCodes = users.reduce((tokens, user) => {
    const oauthCode = user.google.id;
    mockOauthToken({
      token,
      oauthCode,
    });
    mockCustomerGet({ token, user, domain });

    return {
      ...tokens,
      [user.email]: oauthCode,
    };
  }, {});
  mockUsersList({
    token,
    users,
  });

  return { oauthCodes, name: domain };
};

export default mockIntegration;
