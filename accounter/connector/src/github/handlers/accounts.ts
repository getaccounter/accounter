import {
  Account,
  getByIdHandler,
  listHandler,
} from "../../utils/handlers/accounts";
import { GITHUB_APP_ID, GITHUB_PRIVATE_KEY } from "../env";
import { createAppAuth } from "@octokit/auth-app";
import { decryptToken } from "../utils";
import { graphql } from "@octokit/graphql";
import human from "humanparser"

type Member = {
  id: string
  avatarUrl: string
  email: string
  login: string
  name: string
  url: string
}

type Role = any

type ListResponse = {
  node: {
    membersWithRole: {
      edges: Array<{
        node: Member
        role: Role
      }>
    }
  }
}

const convertGithubUserToReturnType = (member: Member, role: Role): Account => {
  const { firstName, lastName } = human.parseName(member.name)
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

  const {node} = await graphqlWithAuth<ListResponse>(
    `  
      query memberQuery($organizationNodeId: ID!) {
        node(id: $organizationNodeId) {
          ... on Organization {
            membersWithRole(first: 100) {
              edges {
                node {
                  id
                  avatarUrl
                  email
                  login
                  name
                  bioHTML
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

  try {
    callback({
      code: 200,
      body: node.membersWithRole.edges.map(({node, role}) => convertGithubUserToReturnType(node, role)),
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
});

export const getById = getByIdHandler(async ({ params }, callback) => {
  const { id, token } = params;
  try {
    callback({
      code: 200,
      body: {
        found: false,
        account: null,
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
