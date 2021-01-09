import * as Factory from "factory";
import { GET_SERVICE_LIST_QUERY } from ".";
import { Service } from "../../../../utils/types";

export const serviceFactory = Factory.Sync.makeFactory<Service>({
  name: "service",
  logo: "path/to/logo",
  oauthUrl: "path/to/oauth",
});

export const getServiceMockQueryMock = (
  services: Array<Service> = serviceFactory.buildList(2)
) => ({
  request: {
    query: GET_SERVICE_LIST_QUERY,
  },
  result: {
    data: {
      services,
    },
  },
});
