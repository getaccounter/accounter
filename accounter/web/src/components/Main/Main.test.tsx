import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import Main  from "./";
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
  test.todo("Shows name when present");
  test.todo("Shows email when name not present");
})

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