import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Login, { LOGIN_MUTATION } from "./";
import userEvent from "@testing-library/user-event";

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

test("renders learn react link", async () => {
  const username = "someuser";
  const password = "somepassword";
  const loginQueryMock = getLoginQueryMock(username, password);
  const app = render(
    <MockedProvider mocks={[loginQueryMock]}>
      <Login />
    </MockedProvider>
  );
  const usernameInput = app.getByPlaceholderText("username");
  const passwordInput = app.getByPlaceholderText("password");
  const loginButton = app.getByText("Login");

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await app.findByText("Logged in!")).toBeInTheDocument();
});
