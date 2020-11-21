import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import OAuthSlackCallback from "./components/OAuthSlackCallback";
import NewApp from "./components/NewApp";
import AuthProvider from "./contexts/auth";
import PrivateRoute from "./components/ProtectedRoute";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "./config";

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <PrivateRoute exact path="/">
                <NewApp />
              </PrivateRoute>
              <Route exact path="/slack/oauth/callback">
                <OAuthSlackCallback />
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}
