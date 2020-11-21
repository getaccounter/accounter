import React, { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Login from "./";
import userEvent from "@testing-library/user-event";
import AuthProvider, { LOGIN_MUTATION } from "../../contexts/auth";
import { MemoryRouter, Route, Switch } from "react-router-dom";

const getLoginQueryMock = (username: string, password: string) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: { username, password },
  },
  result: {
    data: {
      tokenAuth: {
        token: "some-token",
        payload: { username, exp: 0, origIat: 0 }, // values need to be fixed, refer to certain time
        refreshExpiresIn: 0, // values need to be fixed, refer to certain time
      },
    },
  },
});

const getLoginQueryMockWithError = (
  username: string,
  password: string,
  errorMessage: string
) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: { username, password },
  },
  error: new Error(errorMessage),
});

const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <MemoryRouter initialEntries={["/login"]}>{children}</MemoryRouter>
  </AuthProvider>
);

test("logs in and reroutes", async () => {
  const username = "someuser";
  const password = "somepassword";
  const loginQueryMock = getLoginQueryMock(username, password);
  const login = render(
    <MockedProvider mocks={[loginQueryMock]}>
      <Providers>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            Success
          </Route>
        </Switch>
      </Providers>
    </MockedProvider>
  );

  expect(login.queryByText("Success")).not.toBeInTheDocument();

  const usernameInput = login.getByPlaceholderText("username");
  const passwordInput = login.getByPlaceholderText("password");
  const loginButton = login.getByText("Login");

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await login.findByText("Success")).toBeInTheDocument();
});

test("renders error message if something goes wrong", async () => {
  const username = "someuser";
  const password = "somepassword";
  const errorMessage = "Your login failed!";
  const loginQueryMock = getLoginQueryMockWithError(
    username,
    password,
    errorMessage
  );
  const login = render(
    <MockedProvider mocks={[loginQueryMock]}>
      <Providers>
        <Login />
      </Providers>
    </MockedProvider>
  );
  const usernameInput = login.getByPlaceholderText("username");
  const passwordInput = login.getByPlaceholderText("password");
  const loginButton = login.getByText("Login");

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  waitFor(() => expect(login.getByText(errorMessage)).toBeInTheDocument());
});
