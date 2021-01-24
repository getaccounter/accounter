import React, { ReactNode } from "react";
import { render, within } from "@testing-library/react";
import Main from "./";
import { MemoryRouter } from "react-router-dom";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import RelayProvider from "../../contexts/relay";
import { Environment } from "react-relay";
import userEvent from "@testing-library/user-event";
import NotificationProvider from "../../contexts/notification";

const Providers = ({
  children,
  environment,
}: {
  children: ReactNode;
  environment: Environment;
}) => (
  <NotificationProvider>
    <RelayProvider environment={environment}>
      <MemoryRouter>{children}</MemoryRouter>
    </RelayProvider>
  </NotificationProvider>
);

describe("Profile", () => {
  it("renders name", async () => {
    const environment = createMockEnvironment();
    const firstName = "Peter";
    const lastName = "Pan";
    const title = "CEO";

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        ProfileNode() {
          return {
            id: "some-id",
            firstName,
            lastName,
            title,
          };
        },
      })
    );
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation)
    );
    const main = render(
      <Providers environment={environment}>
        <Main />
      </Providers>
    );

    expect(
      await main.findByRole("button", {
        name: `${firstName} ${lastName} ${title}`,
      })
    ).toBeInTheDocument();
  });

  it("links you to profile page", async () => {
    const environment = createMockEnvironment();
    const firstName = "Peter";
    const lastName = "Pan";
    const title = "CEO";

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        ProfileNode() {
          return {
            id: "some-id",
            firstName,
            lastName,
            title,
          };
        },
      })
    );
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation)
    );
    const main = render(
      <Providers environment={environment}>
        <Main />
      </Providers>
    );

    userEvent.click(
      await main.findByRole("button", {
        name: `${firstName} ${lastName} ${title}`,
      })
    );

    userEvent.click(
      main.getByRole("menuitem", {
        name: "View profile",
      })
    );

    const mainContainer = within(await main.getByRole("main"));
    mainContainer.getAllByRole("heading", { name: `${firstName} ${lastName}` });
  });
});

test("show Services by default", async () => {
  const environment = createMockEnvironment();
  environment.mock.queueOperationResolver((operation) =>
    MockPayloadGenerator.generate(operation)
  );
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
