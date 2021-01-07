import React, { ReactNode } from "react";
import { render } from "@testing-library/react";

import Services from "./";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { getServiceMockQueryMock, serviceFactory } from "./Services.mocks";

const Providers = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

test("fetches and renders services", async () => {
  const services = [
    serviceFactory.build({
      name: "service-one",
      logo: "path/to/logo/1",
    }),
    serviceFactory.build({
      name: "service-two",
      logo: "path/to/logo/2",
    }),
  ];
  const renderedServices = render(
    <MockedProvider mocks={[getServiceMockQueryMock(services)]}>
      <Providers>
        <Services />
      </Providers>
    </MockedProvider>
  );
  expect(
    await renderedServices.findByText(services[0].name)
  ).toBeInTheDocument();
  expect(
    renderedServices.getByRole("img", { name: "service-one logo" })
  ).toBeInTheDocument();

  expect(
    await renderedServices.findByText(services[1].name)
  ).toBeInTheDocument();
  expect(
    renderedServices.getByRole("img", { name: "service-two logo" })
  ).toBeInTheDocument();
});
