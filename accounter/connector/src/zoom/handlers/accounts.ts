import superagent from "superagent";
import {
  getByIdHandler,
  listHandler,
  Account,
} from "../../utils/handlers/accounts";

interface ZoomUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: number; // 1 basic, 2 licensed, 3 on-prem
  pmi: number; // personal meeting id
  timezone: string;
  verified: number; // 1 verified email, 0 non verified
  created_at: string;
  last_login_time: string;
  language: string;
  phone_number: string;
  status: string;
  role_id: string; // 0 -> owner, 1 -> admin, 2 -> user
};

interface ExtendedZoomUser extends ZoomUser {
  role_name: string,
  use_pmi: boolean,
  personal_meeting_url: string,
  dept: string,
  pic_url? : string,
  host_key: string,
  cms_user_id: string,
  jid: string,
  group_ids: Array<string>,
  im_group_ids: Array<string>,
  account_id: string,
  phone_country: string,
  job_title: string,
  location: string,
  login_types: Array<number>, // 0 facebook, 1 google, 99 api, 100 zoom, 101 sos
}

const  isExtendedUser = (user: ZoomUser | ExtendedZoomUser): user is ExtendedZoomUser => {
  return (user as ExtendedZoomUser).account_id !== undefined;
}

const convertZoomUserToReturnType = (user: ZoomUser | ExtendedZoomUser): Account => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    username: user.email,
    image: {
      small: isExtendedUser(user) ? user.pic_url ?? null : null,
      big: isExtendedUser(user) ? user.pic_url ?? null : null,
    },
    role:
      user.role_id === "0" ? "OWNER" : user.role_id === "1" ? "ADMIN" : "USER",
    externalProfile: `https://zoom.us/user/${user.id}/profile`,
    isDisabled: false,
  };
};

export const list = listHandler(async ({ params }, callback) => {
  const { token } = params;

  try {
    const response = await superagent
      .get("https://api.zoom.us/v2/users")
      .query("page_size=300")
      .auth(token, { type: "bearer" });

    const users: Array<ZoomUser> = response.body.users;
    
    callback({
      code: 200,
      body: users.map(convertZoomUserToReturnType),
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
    const response = await superagent
      .get(`https://api.zoom.us/v2/users/${id}`)
      .auth(token, { type: "bearer" })

    const user: ExtendedZoomUser = response.body

    callback({
      code: 200,
      body: {
        found: true,
        account: convertZoomUserToReturnType(user),
      },
    });
  } catch (error) {
    if (error.status === 404) {
      callback({
        code: 200,
        body: {
          found: false,
          account: null,
        },
      });
    } else if (error.status === 401) {
      callback({
        code: 401,
      });
    } else {
      throw error;
    }
  }
});
