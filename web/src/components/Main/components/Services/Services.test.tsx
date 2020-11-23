import React, { ReactNode } from "react";
import { render } from "@testing-library/react";

import Services from "./";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { GET_SERVICE_LIST_QUERY, Service } from "./components/ServiceTable";

const getServiceMockQueryMock = (services: Array<Service> = []) => ({
  request: {
    query: GET_SERVICE_LIST_QUERY,
  },
  result: {
    data: {
      services,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

test("fetches and renders services", async () => {
  const services = [
    {
      id: 1,
      name: "service-one",
      logo: "path/to/logo/1",
    },
    {
      id: 2,
      name: "service-two",
      logo: "path/to/logo/2",
    },
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
