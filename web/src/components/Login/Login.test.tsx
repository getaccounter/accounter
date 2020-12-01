import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Login from "./";
import userEvent from "@testing-library/user-event";
import AuthProvider from "../../contexts/auth";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import {
  getLoginQueryWithErrorMock,
  getLoginRequestMocks,
  loginParametersFactory,
} from "../../contexts/auth.mocks";

jest.mock("use-http", () => () => ({ loading: false }));

const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <MemoryRouter initialEntries={["/login"]}>{children}</MemoryRouter>
  </AuthProvider>
);

test("logs in and reroutes", async () => {
  const username = "someuser";
  const password = "somepassword";
  const login = render(
    <MockedProvider mocks={[...getLoginRequestMocks(username, password)]}>
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

  const usernameInput = login.getByLabelText("Email address");
  const passwordInput = login.getByLabelText("Password");
  const loginButton = login.getByRole("button", { name: "Sign in" });

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await login.findByText("Success")).toBeInTheDocument();
});

test("renders error message if something goes wrong", async () => {
  const username = "someuser";
  const password = "somepassword";
  const errorMessage = "Your login failed!";
  const loginQueryMock = getLoginQueryWithErrorMock(
    loginParametersFactory.build({ username, password }),
    errorMessage
  );
  const login = render(
    <MockedProvider mocks={[loginQueryMock]}>
      <Providers>
        <Login />
      </Providers>
    </MockedProvider>
  );
  const usernameInput = login.getByLabelText("Email address");
  const passwordInput = login.getByLabelText("Password");
  const loginButton = login.getByRole("button", { name: "Sign in" });

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await login.findByText(errorMessage)).toBeInTheDocument();
});

test("supress error message", async () => {
  const username = "someuser";
  const password = "somepassword";
  const errorMessage = "Your login failed!";
  const loginQueryMock = getLoginQueryWithErrorMock(
    loginParametersFactory.build({ username, password }),
    errorMessage
  );
  const login = render(
    <MockedProvider mocks={[loginQueryMock, loginQueryMock]}>
      <Providers>
        <Login />
      </Providers>
    </MockedProvider>
  );
  const usernameInput = login.getByLabelText("Email address");
  const passwordInput = login.getByLabelText("Password");
  const loginButton = login.getByRole("button", { name: "Sign in" });

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await login.findByText(errorMessage)).toBeInTheDocument();

  const closeButton = login.getByRole("button", { name: "Close" });
  userEvent.click(closeButton);
  // should be supressed
  expect(login.queryByText(errorMessage)).not.toBeInTheDocument();

  // but visible again at next try
  userEvent.click(loginButton);
  expect(await login.findByText(errorMessage)).toBeInTheDocument();
});
