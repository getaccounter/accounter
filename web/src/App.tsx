import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "./config";
import Root from "./Root";
import { setContext } from "@apollo/client/link/context";
import { getCSRFCookie, useCSRFCookie } from "./utils/csrf";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-CSRFToken": getCSRFCookie(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const { token: csrfToken } = useCSRFCookie();
  return csrfToken ? (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Root />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  ) : null;
}
