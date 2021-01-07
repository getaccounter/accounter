import {
  LOGIN_MUTATION,
  LoginParameters,
  LoginResponse,
  SessionInfoQueryResponse,
  SESSION_INFO_QUERY,
} from "./auth";

import * as Factory from "factory";
import { MockedResponse } from "@apollo/client/testing";

// Login mutation

export const loginParametersFactory = Factory.Sync.makeFactory<LoginParameters>(
  {
    email: "some@username.internet",
    password: "some-password",
  }
);

export const signinFactory = Factory.Sync.makeFactory<LoginResponse["signin"]>({
  status: "success",
  message: "Successfully signed in.",
});

export const loginResponseFactory = Factory.Sync.makeFactory<LoginResponse>({
  signin: signinFactory.build(),
});

export const loginMutationRequestMock = Factory.Sync.makeFactory<
  MockedResponse["request"]
>({
  query: LOGIN_MUTATION,
  variables: loginParametersFactory.build(),
});

// move to factory.ts
const getLoginQueryMock = (
  variables: LoginParameters = loginParametersFactory.build(),
  data: LoginResponse = loginResponseFactory.build()
) => ({
  request: loginMutationRequestMock.build({
    // @ts-expect-error for some reason TS complains here
    variables: variables,
  }),
  result: {
    data,
  },
});

// move to factory.ts
export const loginQueryWithErrorMock = Factory.Sync.makeFactory<MockedResponse>(
  {
    request: loginMutationRequestMock.build(),
    error: new Error("Please enter valid credentials."),
  }
);

// session info query
export const getSessionInfoQueryResponseMock = Factory.Sync.makeFactory<
  SessionInfoQueryResponse
>({
  sessionInfo: {
    signedIn: true,
  },
});

export const sessionInfoQuerySignedInMock = Factory.Sync.makeFactory<
  MockedResponse
>({
  request: {
    query: SESSION_INFO_QUERY,
  },
  result: {
    data: getSessionInfoQueryResponseMock.build(),
  },
});

export const sessionInfoQuerySignedOutMock = sessionInfoQuerySignedInMock.extend(
  {
    result: {
      data: getSessionInfoQueryResponseMock.build({
        sessionInfo: {
          signedIn: false,
        },
      }),
    },
  }
);

export const getLoginRequestMocks = (email: string, password: string) => [
  sessionInfoQuerySignedOutMock.build(),
  getLoginQueryMock(loginParametersFactory.build({ email, password })),
  sessionInfoQuerySignedInMock.build(),
];

export const getLoginFailureRequestMocks = (
  email: string,
  password: string,
  errorMessage: string
) => [
  sessionInfoQuerySignedOutMock.build(),
  loginQueryWithErrorMock.build({
    request: loginMutationRequestMock.build({
      // @ts-expect-error for some reason TS complains here
      variables: loginParametersFactory.build({
        email,
        password,
      }),
    }),
    error: new Error(errorMessage),
  }),
  sessionInfoQuerySignedOutMock.build(),
];
