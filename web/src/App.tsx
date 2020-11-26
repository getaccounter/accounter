import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "./config";
import Root from "./Root";

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Root />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}
