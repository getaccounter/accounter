import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Services from "./components/Services";
import Users from "./components/Users";

const SEVICE_PATH = "/services";
const USER_PATH = "/users";
const MARKET_PLACE_PATH = "/marketplace";

export default function Main() {
  return (
    <div>
      <NavBar
        tabs={[
          {
            label: "Services",
            to: SEVICE_PATH,
          },
          {
            label: "Users",
            to: USER_PATH,
          },
          {
            label: "Marketplace",
            to: MARKET_PLACE_PATH,
          },
        ]}
      />
      <Switch>
        <Route path={SEVICE_PATH}>
          <Services />
        </Route>
        <Route path={USER_PATH}>
          <Users />
        </Route>
        <Route path={MARKET_PLACE_PATH}>MARKET PLACE</Route>
        <Route exact path="/">
          <Redirect to="/services" />
        </Route>
      </Switch>
    </div>
  );
}
