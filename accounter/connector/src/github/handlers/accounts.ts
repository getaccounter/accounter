import {
  Account,
  getByIdHandler,
  listHandler,
} from "../../utils/handlers/accounts";
import { GITHUB_APP_ID, GITHUB_PRIVATE_KEY } from "../env";
import { createAppAuth } from "@octokit/auth-app";
import { decryptToken, TokenPayload, removeInstallation } from "../utils";
import { graphql } from "@octokit/graphql";
import human from "humanparser";
import jwt from "jsonwebtoken";

type Member = {
  id: string;
  avatarUrl: string;
  email: string;
  login: string;
  name: string;
  url: string;
};

type Role = "ADMIN" | "MEMBER";

const convertGithubUserToReturnType = (member: Member, role: Role): Account => {
  const { firstName, lastName } = human.parseName(member.name);
  return {
    id: member.id,
    firstName,
    lastName,
    email: member.email,
    username: member.login,
    image: {
      small: member.avatarUrl,
      big: member.avatarUrl,
    },
    role: role === "ADMIN" ? "ADMIN" : "USER",
    externalProfile: member.url,
    isDisabled: false,
  };
};

export const list = listHandler(async ({ params }, callback) => {
  const { token } = params;

  const tokenPayload = decryptToken(token);

  if (!tokenPayload) {
    const payload = jwt.decode(token) as TokenPayload;
    if (payload?.installationId) {
      await removeInstallation(payload.installationId);
    }
    return callback({
      code: 401,
    });
  }

  const { installationId, organizationNodeId } = tokenPayload;

  const auth = createAppAuth({
    appId: GITHUB_APP_ID,
    privateKey: GITHUB_PRIVATE_KEY,
    installationId,
  });

  const graphqlWithAuth = graphql.defaults({
    request: {
      hook: auth.hook,
    },
  });

  type Response = {
    organization: {
      membersWithRole: {
        edges: Array<{
          node: Member;
          role: Role;
        }>;
      };
    };
  };

  try {
    // NOTE this will break if org has more than 100 members
    const { organization } = await graphqlWithAuth<Response>(
      `  
        query organizationQuery($organizationNodeId: ID!) {
          organization: node(id: $organizationNodeId) {
            ... on Organization {
              membersWithRole(first: 100) {
                edges {
                  node {
                    id
                    avatarUrl
                    email
                    login
                    name
                    url
                  }
                  role
                }
              }
            }
          }
        }
      `,
      { organizationNodeId }
    );
    callback({
      code: 200,
      body: organization.membersWithRole.edges.map(({ node, role }) =>
        convertGithubUserToReturnType(node, role)
      ),
    });
  } catch (error) {
    if (error.status === 404) {
      // installation id not found
      callback({
        code: 401,
      });
    } else if (
      error.errors.some(
        (e: any) => e.type === "NOT_FOUND" && e.path.includes("organization")
      )
    ) {
      await removeInstallation(installationId);
      callback({
        code: 401,
      });
    } else {
      throw error;
    }
  }
});

export const getById = getByIdHandler(async ({ params }, callback) => {
  const { id, token } = params;

  const tokenPayload = decryptToken(token);

  if (!tokenPayload) {
    const payload = jwt.decode(token) as TokenPayload;
    if (payload?.installationId) {
      await removeInstallation(payload.installationId);
    }
    return callback({
      code: 401,
    });
  }

  const { installationId, organizationNodeId } = tokenPayload;

  const auth = createAppAuth({
    appId: GITHUB_APP_ID,
    privateKey: GITHUB_PRIVATE_KEY,
    installationId,
  });

  const graphqlWithAuth = graphql.defaults({
    request: {
      hook: auth.hook,
    },
  });

  type Response = {
    organization: {
      membersWithRole: {
        edges: Array<{
          node: {
            id: string;
          };
          role: Role;
        }>;
      };
    };
    member: Member;
  };

  try {
    // NOTE this will break if org has more than 100 members
    const { organization, member } = await graphqlWithAuth<Response>(
      `  
          query memberQuery($organizationNodeId: ID!, $userNodeId: ID!) {
            organization: node(id: $organizationNodeId) {
              ... on Organization {
                membersWithRole(first: 100) {
                  edges {
                    node {
                      id
                    }
                    role
                  }
                }
              }
            }
            member: node(id: $userNodeId) {
              ... on User {
                id
                avatarUrl
                email
                login
                name
                url
              }
            }
          }
        `,
      { organizationNodeId, userNodeId: id }
    );

    const role = organization.membersWithRole.edges.find(
      (edge) => edge.node.id === member.id
    )!.role;

    callback({
      code: 200,
      body: {
        found: true,
        account: convertGithubUserToReturnType(member, role),
      },
    });
  } catch (error) {
    if (error.status === 404) {
      // installation id not found
      callback({
        code: 401,
      });
    } else if (
      error.errors.some(
        (e: any) => e.type === "NOT_FOUND" && e.path.includes("member")
      )
    ) {
      callback({
        code: 200,
        body: {
          found: false,
          account: null,
        },
      });
    } else if (
      error.errors.some(
        (e: any) => e.type === "NOT_FOUND" && e.path.includes("organization")
      )
    ) {
      await removeInstallation(installationId);
      callback({
        code: 401,
      });
    } else {
      throw error;
    }
  }
});
