import { LOGIN_MUTATION, LoginParameters, LoginResponse } from "./auth";

import * as Factory from "factory";

export const loginParametersFactory = Factory.Sync.makeFactory<LoginParameters>(
  {
    username: "some-username",
    password: "some-password",
  }
);

export const tokenAuthPayloadFactory = Factory.Sync.makeFactory<
  LoginResponse["tokenAuth"]["payload"]
>({
  username: "some-user",
  exp: 0, // values need to be fixed, refer to certain time
  origIat: 0, // values need to be fixed, refer to certain time
});

export const tokenAuthFactory = Factory.Sync.makeFactory<
  LoginResponse["tokenAuth"]
>({
  token: "some-token",
  payload: tokenAuthPayloadFactory.build(),
  refreshExpiresIn: 0, // values need to be fixed, refer to certain time
});

export const loginResponseFactory = Factory.Sync.makeFactory<LoginResponse>({
  tokenAuth: tokenAuthFactory.build(),
});

export const getLoginQueryMock = (
  variables: LoginParameters = loginParametersFactory.build(),
  data: LoginResponse = loginResponseFactory.build()
) => ({
  request: {
    query: LOGIN_MUTATION,
    variables,
  },
  result: {
    data,
  },
});

export const getLoginQueryMockWithError = (
  variables: LoginParameters = loginParametersFactory.build(),
  errorMessage: string = "some error"
) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: variables,
  },
  error: new Error(errorMessage),
});
