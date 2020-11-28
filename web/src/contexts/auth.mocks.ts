import {
  LOGIN_MUTATION,
  LoginParameters,
  LoginResponse,
  Payload,
  VerificationResponse,
  VERIFY_TOKEN_MUTATION,
} from "./auth";

import * as Factory from "factory";

// Login mutation

export const loginParametersFactory = Factory.Sync.makeFactory<LoginParameters>(
  {
    username: "some-username",
    password: "some-password",
  }
);

export const validExpiryFactory = () => Date.now() / 1000 + 10000; // expires in the future

export const expiredExpiryFactory = () => Date.now() / 1000 - 10000; // expired in the past

export const payloadFactory = Factory.Sync.makeFactory<Payload>({
  username: "some-user",
  exp: Factory.each(() => validExpiryFactory()),
  origIat: 0, // values need to be fixed, refer to certain time
});

export const tokenAuthFactory = Factory.Sync.makeFactory<
  LoginResponse["tokenAuth"]
>({
  payload: payloadFactory.build(),
  refreshExpiresIn: 0, // values need to be fixed, refer to certain time
});

export const loginResponseFactory = Factory.Sync.makeFactory<LoginResponse>({
  tokenAuth: tokenAuthFactory.build(),
});

// move to factory.ts
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

// move to factory.ts
export const getLoginQueryWithErrorMock = (
  variables: LoginParameters = loginParametersFactory.build(),
  errorMessage: string = "some error"
) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: variables,
  },
  error: new Error(errorMessage),
});

// verify mutattion
export const verifyTokenFactory = Factory.Sync.makeFactory<
  VerificationResponse["verifyToken"]
>({
  payload: payloadFactory.build(),
});

export const verifyTokenResponseFactory = Factory.Sync.makeFactory<
  VerificationResponse
>({
  verifyToken: verifyTokenFactory.build(),
});

// move to factory.ts
export const getVerifyTokenMock = (
  data: VerificationResponse = verifyTokenResponseFactory.build()
) => ({
  request: {
    query: VERIFY_TOKEN_MUTATION,
  },
  result: {
    data,
  },
});

// move to factory.ts
export const getVerifyTokenErrorMock = (
  errorMessage: string = "some error"
) => ({
  request: {
    query: VERIFY_TOKEN_MUTATION,
  },
  error: new Error(errorMessage),
});

export const getLoginRequestMocks = (username: string, password: string) => [
  getVerifyTokenErrorMock(),
  getLoginQueryMock(loginParametersFactory.build({ username, password })),
  getVerifyTokenMock(),
];
