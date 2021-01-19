import React, { ReactNode } from "react";
import { render, within } from "@testing-library/react";
import Main from "./";
import { MemoryRouter } from "react-router-dom";
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

describe("Profile", () => {
  it("renders name", async () => {
    const environment = createMockEnvironment();
    const firstName = "Peter";
    const lastName = "Pan";

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        ProfileNode(context) {
          return {
            id: "some-id",
            firstName,
            lastName
          }
        }
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

    expect(await main.findByRole("link", {
      name: `${firstName} ${lastName} View profile`,
    })).toBeInTheDocument()
  });

  it("links you to profile page", async () => {
    const environment = createMockEnvironment();
    const firstName = "Peter";
    const lastName = "Pan";

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        ProfileNode(context) {
          return {
            id: "some-id",
            firstName,
            lastName
          }
        }
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

    const profile = await main.findByRole("link", {
      name: `${firstName} ${lastName} View profile`,
    })

    expect(profile).toBeInTheDocument();

    profile.click()

    const mainContainer = within(await main.getByRole("main"))
    mainContainer.getAllByRole("heading", {name: `${firstName} ${lastName}`})
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
