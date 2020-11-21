import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import OAuthSlackCallback from "./components/OAuthSlackCallback";
import Main from "./components/Main";
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
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/">
                <Main />
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
