import React, { ReactElement } from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import AuthProvider, { useAuth } from "./auth";
import userEvent from "@testing-library/user-event";
import {
  loginParametersFactory,
  getLoginQueryWithErrorMock,
  getVerifyTokenMock,
  verifyTokenResponseFactory,
  payloadFactory,
  verifyTokenFactory,
  expiredExpiryFactory,
  getLoginRequestMocks,
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
  const username = "someuser";
  const password = "somepassword";
  const container = render(
    <MockedProvider mocks={[...getLoginRequestMocks(username, password)]}>
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.isLoggedIn === undefined
                ? "Loading..."
                : authData.isLoggedIn
                ? "Logged In"
                : "Logged Out"}
              <button onClick={() => authData.signIn(username, password)} />
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
    <MockedProvider mocks={[getVerifyTokenMock()]}>
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.isLoggedIn === undefined
                ? "Loading..."
                : authData.isLoggedIn
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

test("comes back when it was already logged in, but token expired", async () => {
  const container = render(
    <MockedProvider
      mocks={[
        getVerifyTokenMock(
          verifyTokenResponseFactory.build({
            verifyToken: verifyTokenFactory.build({
              payload: payloadFactory.build({
                exp: expiredExpiryFactory(),
              }),
            }),
          })
        ),
      ]}
    >
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.isLoggedIn === undefined
                ? "Loading..."
                : authData.isLoggedIn
                ? "Logged In"
                : "Logged Out"}
            </div>
          )}
        </TestComponent>
      </AuthProvider>
    </MockedProvider>
  );
  expect(await container.findByText("Loading...")).toBeInTheDocument();
  expect(await container.findByText("Logged Out")).toBeInTheDocument();
});

test("provides error after login error", async () => {
  const username = "someuser";
  const password = "somepassword";
  const errorMessage = "Ahh shut";

  const loginQueryMock = getLoginQueryWithErrorMock(
    loginParametersFactory.build({ username, password }),
    errorMessage
  );
  const container = render(
    <MockedProvider mocks={[getVerifyTokenMock(), loginQueryMock]}>
      <AuthProvider>
        <TestComponent>
          {(authData) => (
            <div>
              {authData.signInError}
              <button onClick={() => authData.signIn(username, password)} />
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
