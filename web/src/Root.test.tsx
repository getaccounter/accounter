import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Root from "./Root";
import userEvent from "@testing-library/user-event";
import AuthProvider from "./contexts/auth";
import { MemoryRouter } from "react-router-dom";
import {
  getLoginQueryMock,
  getVerifyTokenErrorMock,
  getVerifyTokenMock,
  loginParametersFactory,
} from "./contexts/auth.mocks";
import { getServiceMockQueryMock } from "./components/Main/components/Services/Services.mocks";

jest.mock("use-http", () => () => ({ loading: false }));

const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </AuthProvider>
);

test("reroutes to login and after reroutes to actual content", async () => {
  const username = "someuser";
  const password = "somepassword";
  const loginQueryMock = getLoginQueryMock(
    loginParametersFactory.build({ username, password })
  );
  const root = render(
    <MockedProvider
      mocks={[
        getVerifyTokenErrorMock(),
        loginQueryMock,
        getVerifyTokenMock(),
        getServiceMockQueryMock(),
      ]}
    >
      <Providers>
        <Root />
      </Providers>
    </MockedProvider>
  );
  expect(await root.findByText("Sign in")).toBeInTheDocument();

  const usernameInput = root.getByLabelText("Email address");
  const passwordInput = root.getByLabelText("Password");
  const loginButton = root.getByRole("button", { name: "Sign in" });

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(
    await root.findByRole("heading", { name: "Services" })
  ).toBeInTheDocument();
});
