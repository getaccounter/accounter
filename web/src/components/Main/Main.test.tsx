import React from "react";
import { render, within } from "@testing-library/react";

import Main from "./";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("logs in and reroutes", async () => {
  const main = render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

  const header = within(main.getByRole("heading"));
  const navigationbar = within(main.getByRole("navigation"));

  expect(header.getByText("Services")).toBeInTheDocument();

  await userEvent.click(navigationbar.getByText("Users"));

  const updatedHeader = within(main.getByRole("heading"));
  expect(updatedHeader.getByText("Users")).toBeInTheDocument();
});
