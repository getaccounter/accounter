import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Root from "./Root";
import userEvent from "@testing-library/user-event";
import AuthProvider from "./contexts/auth";
import { MemoryRouter } from "react-router-dom";
import { getLoginRequestMocks } from "./contexts/auth.mocks";
import NotificationProvider from "./contexts/notification";
import { getServiceMockQueryMock } from "./components/Main/components/Services/mocks";

jest.mock("use-http", () => () => ({ loading: false }));

const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <NotificationProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </NotificationProvider>
  </AuthProvider>
);

test("reroutes to login and after reroutes to actual content", async () => {
  const email = "some@user.internet";
  const password = "somepassword";
  const root = render(
    <MockedProvider
      mocks={[
        ...getLoginRequestMocks(email, password),
        getServiceMockQueryMock(),
      ]}
    >
      <Providers>
        <Root />
      </Providers>
    </MockedProvider>
  );
  expect(await root.findByText("Sign in")).toBeInTheDocument();

  const emailInput = root.getByLabelText("Email address");
  const passwordInput = root.getByLabelText("Password");
  const loginButton = root.getByRole("button", { name: "Sign in" });

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(
    (await root.findAllByRole("navigation", { name: "Sidebar" }))[0]
  ).toBeInTheDocument();
});
