import React, { ReactElement } from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import AuthProvider, { useAuth } from "./auth";
import userEvent from "@testing-library/user-event";
import {
  loginParametersFactory,
  getLoginRequestMocks,
  sessionInfoQuerySignedInMock,
  sessionInfoQuerySignedOutMock,
  loginQueryWithErrorMock,
  loginMutationRequestMock,
} from "./auth.mocks";

const TestComponent = ({
  children,
}: {
  children: (authData: ReturnType<typeof useAuth>) => ReactElement;
}) => {
  const authData = useAuth();
  return children(authData);
};

test("logs in", async () => {
  const email = "some@user.internet";
  const password = "somepassword";
  const container = render(
    <MockedProvider mocks={[...getLoginRequestMocks(email, password)]}>
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.isSignedIn === undefined
                ? "Loading..."
                : authData.isSignedIn
                ? "Logged In"
                : "Logged Out"}
              <button onClick={() => authData.signIn(email, password)} />
            </div>
          )}
        </TestComponent>
      </AuthProvider>
    </MockedProvider>
  );
  expect(await container.findByText("Loading...")).toBeInTheDocument();
  expect(await container.findByText("Logged Out")).toBeInTheDocument();
  userEvent.click(await container.getByRole("button"));
  expect(await container.findByText("Loading...")).toBeInTheDocument();
  expect(await container.findByText("Logged In")).toBeInTheDocument();
});

test("comes back when it was already logged in", async () => {
  const container = render(
    <MockedProvider mocks={[sessionInfoQuerySignedInMock.build()]}>
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.isSignedIn === undefined
                ? "Loading..."
                : authData.isSignedIn
                ? "Logged In"
                : "Logged Out"}
            </div>
          )}
        </TestComponent>
      </AuthProvider>
    </MockedProvider>
  );
  expect(await container.findByText("Loading...")).toBeInTheDocument();
  expect(await container.findByText("Logged In")).toBeInTheDocument();
});

test("provides error after login error", async () => {
  const email = "some@user.internet";
  const password = "somepassword";
  const errorMessage = "Ahh shut";

  const loginQueryMock = loginQueryWithErrorMock.build({
    request: loginMutationRequestMock.build({
      // @ts-expect-error for some reason TS complains here
      variables: loginParametersFactory.build({
        email,
        password,
      }),
    }),
    error: new Error(errorMessage),
  });
  const container = render(
    <MockedProvider
      mocks={[
        sessionInfoQuerySignedOutMock.build(),
        loginQueryMock,
        sessionInfoQuerySignedOutMock.build(),
      ]}
    >
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.signInError}
              <button onClick={() => authData.signIn(email, password)} />
            </div>
          )}
        </TestComponent>
      </AuthProvider>
    </MockedProvider>
  );

  userEvent.click(container.getByRole("button"));
  await waitFor(() =>
    expect(container.getByText(errorMessage)).toBeInTheDocument()
  );
});
