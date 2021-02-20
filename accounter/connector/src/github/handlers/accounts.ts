import {
  // Account,
  getByIdHandler,
  listHandler,
} from "../../utils/handlers/accounts";

// const convertGithubUserToReturnType = (
//   user: admin_directory_v1.Schema$User,
// ): Account => {
//   return {};
// };

export const list = listHandler(async ({ params }, callback) => {
  const { token } = params;

  try {
    callback({
      code: 200,
      body: [],
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
