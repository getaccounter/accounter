import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import AuthProvider, { useAuth } from "./auth";
import userEvent from "@testing-library/user-event";
import {
  getLoginQueryMock,
  loginParametersFactory,
  loginResponseFactory,
  tokenAuthFactory,
  getLoginQueryMockWithError,
} from "./auth.mocks";

test("provides token after login", async () => {
  const username = "someuser";
  const password = "somepassword";
  const token = "some-token";
  const MyComponent = () => {
    const { token, signIn } = useAuth();
    return (
      <div>
        {token}
        <button onClick={() => signIn(username, password)} />
      </div>
    );
  };

  const loginQueryMock = getLoginQueryMock(
    loginParametersFactory.build({ username, password }),
    loginResponseFactory.build({
      tokenAuth: tokenAuthFactory.build({ token }),
    })
  );
  const container = render(
    <MockedProvider mocks={[loginQueryMock]}>
      <AuthProvider>
        <MyComponent />
      </AuthProvider>
    </MockedProvider>
  );

  userEvent.click(container.getByRole("button"));
  expect(await container.findByText(token)).toBeInTheDocument();
});

test("provides error after login error", async () => {
  const username = "someuser";
  const password = "somepassword";
  const errorMessage = "Ahh shut";
  const MyComponent = () => {
    const { signIn, signInError } = useAuth();
    return (
      <div>
        {signInError}
        <button onClick={() => signIn(username, password)} />
      </div>
    );
  };

  const loginQueryMock = getLoginQueryMockWithError(
    loginParametersFactory.build({ username, password }),
    errorMessage
  );
  const container = render(
    <MockedProvider mocks={[loginQueryMock]}>
      <AuthProvider>
        <MyComponent />
      </AuthProvider>
    </MockedProvider>
  );

  userEvent.click(container.getByRole("button"));
  waitFor(() => expect(container.getByText(errorMessage)).toBeInTheDocument());
});
