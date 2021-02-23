import { mockServerClient } from "mockserver-client";
import faker from "faker";

const createGitHubUser = (user) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return {
    node: {
      id: user.github.id,
      avatarUrl: faker.image.imageUrl(),
      email: user.email,
      login: user.github.displayName,
      name: fullName,
      url: `https://github.com/${user.github.displayName}`,
    },
    role: "MEMBER",
  };
};

const mockOauthToken = ({ installationId, token, githubOrg } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "GET",
        path: `/app/installations/${installationId}`,
        headers: {
          Host: ["api.github.com"],
        },
      },
      httpResponse: {
        body: {
          id: faker.random.uuid(),
          account: {
            login: githubOrg.login,
            id: githubOrg.id,
            node_id: faker.random.uuid(),
            avatar_url: faker.image.imageUrl(),
            gravatar_id: "",
            url: faker.internet.url(),
            html_url: faker.internet.url(),
            followers_url: faker.internet.url(),
            following_url: faker.internet.url(),
            gists_url: faker.internet.url(),
            starred_url: faker.internet.url(),
            subscriptions_url: faker.internet.url(),
            organizations_url: faker.internet.url(),
            repos_url: faker.internet.url(),
            events_url: faker.internet.url(),
            received_events_url: faker.internet.url(),
            type: "Organization",
            site_admin: false,
          },
          repository_selection: "selected",
          access_tokens_url: faker.internet.url(),
          repositories_url: faker.internet.url(),
          html_url: faker.internet.url(),
          app_id: 101725,
          app_slug: "accounter-development",
          target_id: 72317938,
          target_type: "Organization",
          permissions: {
            members: "read",
            organization_administration: "read",
          },
          events: [],
          created_at: "2021-02-19T22:33:41.000Z",
          updated_at: "2021-02-19T22:33:41.000Z",
          single_file_name: null,
          has_multiple_single_files: false,
          single_file_paths: [],
          suspended_by: null,
          suspended_at: null,
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

  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "GET",
        path: `/orgs/${githubOrg.login}`,
        headers: {
          Host: ["api.github.com"],
        },
      },
      httpResponse: {
        body: {
          login: githubOrg.login,
          id: githubOrg.id,
          node_id: githubOrg.nodeId,
          url: "https://api.github.com/orgs/getaccounter",
          repos_url: faker.internet.url(),
          events_url: faker.internet.url(),
          hooks_url: faker.internet.url(),
          issues_url: faker.internet.url(),
          members_url: faker.internet.url(),
          public_members_url: faker.internet.url(),
          avatar_url: faker.image.imageUrl(),
          description: "",
          name: githubOrg.name,
          company: null,
          blog: faker.internet.domainName(),
          location: null,
          email: null,
          twitter_username: faker.internet.userName(),
          is_verified: false,
          has_organization_projects: true,
          has_repository_projects: true,
          public_repos: 0,
          public_gists: 0,
          followers: 0,
          following: 0,
          html_url: `https://github.com/${githubOrg.login}`,
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
          type: "Organization",
          total_private_repos: 1,
          owned_private_repos: 1,
          private_gists: 0,
          disk_usage: 13819,
          collaborators: 1,
          billing_email: faker.internet.email(),
          default_repository_permission: "read",
          members_can_create_repositories: true,
          two_factor_requirement_enabled: false,
          members_can_create_pages: true,
          members_can_create_public_pages: true,
          members_can_create_private_pages: true,
          plan: {
            name: "team",
            space: 976562499,
            private_repos: 999999,
            filled_seats: 1,
            seats: 1,
          },
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

  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: `/app/installations/${installationId}/access_tokens`,
        headers: {
          Host: ["api.github.com"],
        },
      },
      httpResponse: {
        body: {
          token,
          expires_at: "2099-12-31T12:56:47Z",
          permissions: {
            members: "read",
            organization_administration: "read",
          },
          repository_selection: "selected",
        },
      },
      times: {
        remainingTimes: 2,
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

const mockUserGet = ({ token, user, users, githubOrg } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/graphql",
        headers: {
          authorization: [`token ${token}`],
          Host: ["api.github.com"],
        },
        body: {
          type: "JSON_SCHEMA",
          jsonSchema: {
            $schema: "https://json-schema.org/draft-04/schema#",
            type: "object",
            properties: {
              query: {
                type: "string",
                pattern: "memberQuery",
              },
              variables: {
                type: "object",
                properties: {
                  organizationNodeId: {
                    type: "string",
                    const: githubOrg.nodeId,
                  },
                  userNodeId: {
                    type: "string",
                    const: user.github.id,
                  },
                },
                required: ["organizationNodeId", "userNodeId"],
              },
            },
            required: ["query", "variables"],
          },
        },
      },
      httpResponse: {
        body: {
          data: {
            organization: {
              membersWithRole: {
                edges: users.map(u => ({
                  node: {
                    id: u.github.id
                  },
                  role: "MEMBER"
                })),
              },
            },
            member: createGitHubUser(user).node,
          },
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

const mockUsersList = ({ token, users = [], githubOrg } = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/graphql",
        headers: {
          authorization: [`token ${token}`],
          Host: ["api.github.com"],
        },
        body: {
          type: "JSON_SCHEMA",
          jsonSchema: {
            $schema: "https://json-schema.org/draft-04/schema#",
            type: "object",
            properties: {
              query: {
                type: "string",
                pattern: "organizationQuery",
              },
              variables: {
                type: "object",
                properties: {
                  organizationNodeId: {
                    type: "string",
                    const: githubOrg.nodeId,
                  },
                },
                required: ["organizationNodeId"],
              },
            },
            required: ["query", "variables"],
          },
        },
      },
      httpResponse: {
        body: {
          data: {
            organization: {
              membersWithRole: {
                edges: users.map(createGitHubUser),
              },
            },
          },
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

export const mockService = () => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "GET",
        path: "/app",
        headers: {
          Host: ["api.github.com"],
        },
      },
      httpResponse: {
        body: {
          id: 101725,
          slug: "accounter-development",
          node_id: "MDM6QXBwMTAxMjA5",
          owner: {
            login: "getaccounter",
            id: faker.random.uuid(),
            node_id: faker.random.uuid(),
            avatar_url: faker.image.imageUrl(),
            gravatar_id: "",
            url: faker.internet.url(),
            html_url: faker.internet.url(),
            followers_url: faker.internet.url(),
            following_url: faker.internet.url(),
            gists_url: faker.internet.url(),
            starred_url: faker.internet.url(),
            subscriptions_url: faker.internet.url(),
            organizations_url: faker.internet.url(),
            repos_url: faker.internet.url(),
            events_url: faker.internet.url(),
            received_events_url: faker.internet.url(),
            type: "Organization",
            site_admin: false,
          },
          name: "Accounter Development",
          description:
            "Accounter Companion app to retrieve user information from your organization",
          external_url: "https://accounter.io",
          html_url: "https://github.com/apps/accounter-development",
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
          permissions: {
            members: "read",
            organization_administration: "read",
          },
          events: [],
          installations_count: 1,
        },
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

const generateGithubOrganization = () => {
  return {
    login: faker.internet.userName(),
    name: faker.company.companyName(),
    id: faker.random.uuid(),
    nodeId: faker.random.uuid(),
  };
};

const mockIntegration = (users) => {
  const githubOrg = generateGithubOrganization();
  const installationId = faker.random.number();
  const token = faker.random.uuid();

  mockOauthToken({
    token,
    githubOrg,
    installationId,
  });

  users.forEach((user) => {
    mockUserGet({ token, user, users, githubOrg });
  });

  mockUsersList({
    token,
    users,
    githubOrg,
  });

  return { oauthCode: installationId, name: githubOrg.name };
};

export default mockIntegration;
