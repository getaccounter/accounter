import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Services from "./components/Services";
import Users from "./components/Users";

export default function Main() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/services">
          <Services />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Redirect to="/services" />
      </Switch>
    </div>
  );
}
