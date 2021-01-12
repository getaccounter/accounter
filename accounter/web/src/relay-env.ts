import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import { GRAPHQL_ENDPOINT } from "./config";
import { getCSRFCookie } from "./utils/csrf";

const fetchQuery: FetchFunction = (operation, variables) => {
  return fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    // @ts-expect-error doesnt like the X-CSRFToken for some reason
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFCookie(),
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
