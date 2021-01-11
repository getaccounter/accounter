import * as Factory from "factory";
import { Service } from "../../../../utils/types";
import { serviceFactory } from "../Services/mocks";
import { gql } from "@apollo/client";

type Integration = {
  service: Pick<Service, "name" | "logo">;
};

const GET_INTEGRATION_LIST_QUERY = gql`
  query GetIntegrationList {
    integrations {
      service {
        name
        logo
      }
    }
  }
`;

export const integrationFactory = Factory.Sync.makeFactory<Integration>({
  service: serviceFactory.build(),
});

export const getIntegrationMockQueryMock = (
  integrations: Array<Integration> = integrationFactory.buildList(2)
) => ({
  request: {
    query: GET_INTEGRATION_LIST_QUERY,
  },
  result: {
    data: {
      integrations,
    },
  },
});
