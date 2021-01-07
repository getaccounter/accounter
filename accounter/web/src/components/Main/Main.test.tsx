import React, { ReactNode } from "react";
import { render, within } from "@testing-library/react";

import Main from "./";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

const Providers = ({ children }: { children: ReactNode }) => (
  <MockedProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </MockedProvider>
);

test("show Services by default", () => {
  const main = render(
    <Providers>
      <Main />
    </Providers>
  );

  expect(main.getByRole("heading", { name: "Services" })).toBeInTheDocument();
});

test.each(["Services", "Users"])("renders %s", async (tab) => {
  const main = render(
    <Providers>
      <Main />
    </Providers>
  );

  const navigationbar = within(main.getByRole("navigation"));
  await userEvent.click(navigationbar.getByRole("link", { name: tab }));
  expect(main.getByRole("heading", { name: tab })).toBeInTheDocument();
});
