import React from "react";
import { X } from "../../../icons/solid";
import Tab, { TabType } from "./components/Tab";
import Profile from "./components/Profile";
import { Link, useLocation } from "react-router-dom";
import { useBooleanQueryString } from "../../../../utils/querystring";
import queryString from 'query-string'
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Sidebar_profile } from "./__generated__/Sidebar_profile.graphql";

interface Props {
  mainTabs: Array<TabType>;
  extraTabs: Array<TabType>;
  profile: Sidebar_profile
}

const MobileSidebar = (props: Props) => {
  const location = useLocation();
  const {showMobileSidebar, ...qsObject } = queryString.parse(location.search)
  const closeSidebarLink = `${location.pathname}?${queryString.stringify(qsObject)}`
  return (
    <>
      {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
      <div className="lg:hidden">
        <div className="fixed inset-0 flex z-40">
          {/*
              Off-canvas menu overlay, show/hide based on off-canvas menu state.

              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            */}
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </div>
          {/*
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            */}
          <div
            tabIndex={0}
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Link to={closeSidebarLink}>
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </Link>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav aria-label="Sidebar" className="mt-5">
                <div className="px-2 space-y-1">
                  {props.mainTabs.map((tab) => (
                    <Tab key={tab.path} tab={tab} />
                  ))}
                </div>
                <hr
                  className="border-t border-gray-200 my-5"
                  aria-hidden="true"
                />
                <div className="px-2 space-y-1">
                  {props.extraTabs.map((tab) => (
                    <Tab key={tab.path} tab={tab} />
                  ))}
                </div>
              </nav>
            </div>
            <Profile profile={props.profile} />
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>
    </>
  );
};

const DesktopSidebar = (props: Props) => (
  <>
    {/* Static sidebar for desktop */}
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {props.mainTabs.map((tab) => (
                  <Tab key={tab.path} desktop tab={tab} />
                ))}
              </div>
              <hr
                className="border-t border-gray-200 my-5"
                aria-hidden="true"
              />
              <div className="flex-1 px-2 space-y-1">
                {props.extraTabs.map((tab) => (
                  <Tab key={tab.path} desktop tab={tab} />
                ))}
              </div>
            </nav>
          </div>
          <Profile desktop profile={props.profile} />
        </div>
      </div>
    </div>
  </>
);

const Sidebar = (props: Props) => {
  const showMobileSidebar = useBooleanQueryString("showMobileSidebar");
  return (
    <>
      {showMobileSidebar && <MobileSidebar {...props} />}
      <DesktopSidebar {...props} />
    </>
  );
};

export default createFragmentContainer(Sidebar, {
  profile: graphql`
    fragment Sidebar_profile on ProfileNode {
      ...Profile_profile
    }
  `,
});
