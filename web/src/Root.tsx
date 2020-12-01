import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import OAuthSlackCallback from "./components/OAuthSlackCallback";
import Main from "./components/Main";
import PrivateRoute from "./components/ProtectedRoute";

export default function Root() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/slack/oauth/callback">
          <OAuthSlackCallback />
        </Route>
        <PrivateRoute path="/">
          <Main />
        </PrivateRoute>
      </Switch>
    </div>
  );
}
