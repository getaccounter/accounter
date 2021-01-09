import React, { ReactNode } from "react";
import { render, within } from "@testing-library/react";

import Main, { MAIN_PAGES } from "./";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { getIntegrationMockQueryMock } from "./components/Integrations/mocks";

const Providers = ({ children }: { children: ReactNode }) => (
  <MockedProvider
    mocks={[
      getIntegrationMockQueryMock(),
    ]}
  >
    <MemoryRouter>{children}</MemoryRouter>
  </MockedProvider>
);

test("show Services by default", async () => {
  const main = render(
    <Providers>
      <Main />
    </Providers>
  );
    // TODO assert for content page as soon as we have it for services
  expect(await main.findByRole("navigation", { name: "Directory" })).toBeInTheDocument();
});

test.each(MAIN_PAGES.map(page => page.tab.label))("renders %s", async (tabLabel) => {
  const main = render(
    <Providers>
      <Main />
    </Providers>
  );

  const navigationbar = within((await main.findAllByRole("navigation", { name: "Sidebar" }))[0]);
  await userEvent.click(navigationbar.getByRole("link", { name: tabLabel }));

  // TODO assert for content page as soon as we have it for ${tabLabel}
  expect(await main.findByRole("navigation", { name: "Directory" })).toBeInTheDocument();
});
