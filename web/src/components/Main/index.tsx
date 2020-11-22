import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Services from "./components/Services";
import Users from "./components/Users";

const TABS = [
  {
    label: "Services",
    path: "/services",
    content: <Services />,
  },
  {
    label: "Users",
    path: "/users",
    content: <Users />,
  },
];

export default function Main() {
  return (
    <div>
      <NavBar tabs={TABS.map(({ label, path }) => ({ label, to: path }))} />
      <Switch>
        {TABS.map(({ path, content }) => (
          <Route path={path}>{content}</Route>
        ))}
        <Route exact path="/">
          <Redirect to={TABS[0].path} />
        </Route>
      </Switch>
    </div>
  );
}
