import React, { ReactNode } from "react";
import { render, within } from "@testing-library/react";
import Main, { MAIN_PAGES } from "./";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import RelayProvider from "../../contexts/relay";
import { Environment } from "react-relay";

const Providers = ({
  children,
  environment,
}: {
  children: ReactNode;
  environment: Environment;
}) => (
  <RelayProvider environment={environment}>
    <MemoryRouter>{children}</MemoryRouter>
  </RelayProvider>
);

test("show Services by default", async () => {
  const environment = createMockEnvironment();
  environment.mock.queueOperationResolver((operation) =>
    MockPayloadGenerator.generate(operation)
  );
  const main = render(
    <Providers environment={environment}>
      <Main />
    </Providers>
  );
  // TODO assert for content page as soon as we have it for services
  expect(
    await main.findByRole("navigation", { name: "Directory" })
  ).toBeInTheDocument();
});

test.each(MAIN_PAGES.map((page) => page.tab.label))(
  "renders %s",
  async (tabLabel) => {
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation)
    );
    const main = render(
      <Providers environment={environment}>
        <Main />
      </Providers>
    );

    const navigationbar = within(
      (await main.findAllByRole("navigation", { name: "Sidebar" }))[0]
    );
    await userEvent.click(navigationbar.getByRole("link", { name: tabLabel }));

    // TODO assert for content page as soon as we have it for ${tabLabel}
    expect(
      await main.findByRole("navigation", { name: "Directory" })
    ).toBeInTheDocument();
  }
);
