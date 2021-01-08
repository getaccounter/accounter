import React from "react";
import SideBar from "./components/Sidebar";
import Content from "./components/Content";
import Directory from "./components/Directory";
import { Cog, Menu, UserGroup, ViewGrid, ViewGridAdd } from "../icons/outline";
import { Redirect, Route, Switch } from "react-router-dom";

const Header = () => (
  <div className="lg:hidden">
    <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
      <div>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
          alt="Workflow"
        />
      </div>
      <div>
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
);

const MAIN_TABS = [
  {
    label: "Apps",
    path: "/services",
    icon: ViewGrid,
    content: (
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <Content />
        <Directory />
      </div>
    ),
  },
  {
    label: "Users",
    path: "/users",
    icon: UserGroup,
    content: "",
  },
];

const EXTRA_TABS = [
  {
    label: "Add Apps",
    path: "/add-services",
    icon: ViewGridAdd,
    content: "",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Cog,
    content: "",
  },
];

export default function Main() {
  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-white">
        <SideBar />
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <Header />
          <Switch>
            {[...MAIN_TABS, ...EXTRA_TABS].map(({ path, content }) => (
              <Route key={path} path={path}>
                {content}
              </Route>
            ))}
            <Route exact path="/">
              <Redirect to={MAIN_TABS[0].path} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
