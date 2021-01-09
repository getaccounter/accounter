import * as Factory from "factory";
import { GET_INTEGRATION_LIST_QUERY, Integration } from ".";
import { serviceFactory } from "../Services/mocks";

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
