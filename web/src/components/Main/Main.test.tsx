import React from "react";
import { render, within } from "@testing-library/react";

import Main from "./";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("show Services by default", () => {
  const main = render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

  const header = within(main.getByRole("heading"));
  expect(header.getByText("Services")).toBeInTheDocument();
});

test.each(["Services", "Users", "Marketplace"])("renders %s", async (tab) => {
  const main = render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

  const navigationbar = within(main.getByRole("navigation"));
  await userEvent.click(navigationbar.getByText(tab));

  const header = within(main.getByRole("heading"));
  expect(header.getByText(tab)).toBeInTheDocument();
});
