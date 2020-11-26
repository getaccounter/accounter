import { GET_SERVICE_LIST_QUERY, Service } from "./components/ServiceTable";
import * as Factory from "factory";

export const serviceFactory = Factory.Sync.makeFactory<Service>({
  id: Factory.each((i) => i),
  name: "service",
  logo: "path/to/logo",
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
