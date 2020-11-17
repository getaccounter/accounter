import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import OAuthSlackCallback from "./components/OAuthSlackCallback";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/slack/oauth/callback">
            <OAuthSlackCallback />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
