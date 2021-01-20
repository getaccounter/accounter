import React, { ReactNode } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { ChevronLeft } from "../../../icons/solid";
import Header from "./components/Header";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Content_profile } from "./__generated__/Content_profile.graphql";
import DescriptionList from "./components/DescriptionList";
import EditUser from "./components/EditUser";
import { Content_currentUser } from "./__generated__/Content_currentUser.graphql";

type BreadcrumbProps = {
  title: ReactNode;
};
const Breadcrumb = ({ title }: BreadcrumbProps) => {
  return (
    <nav
      className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
      aria-label="Breadcrumb"
    >
      <Link
        to="/users"
        className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
      >
        <ChevronLeft className="-ml-2 h-5 w-5 text-gray-400" />
        <span>{title}</span>
      </Link>
    </nav>
  );
};

const Tab = (props: { children: ReactNode; to: string }) => {
  const { pathname } = useLocation();
  const isSelected = props.to === pathname;

  const sharedClassNames =
    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm";
  const selectedClassNames = "border-pink-500 text-gray-900";
  const unSelectedClassNames =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
  return (
    <Link
      to={props.to}
      className={`${
        isSelected ? selectedClassNames : unSelectedClassNames
      } ${sharedClassNames}`}
    >
      {props.children}
    </Link>
  );
};

const Tabs = () => {
  const { url } = useRouteMatch();
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Tab to={`${url}/profile`}>Profile</Tab>
            <Tab to={`${url}/apps`}>Apps</Tab>
          </nav>
        </div>
      </div>
    </div>
  );
};

const TeamMember = () => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">Leslie Alexander</p>
          <p className="text-sm text-gray-500 truncate">Co-Founder / CEO</p>
        </a>
      </div>
    </div>
  );
};

const TeamMemberList = () => {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Team members</h2>
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TeamMember />
        <TeamMember />
        <TeamMember />
        <TeamMember />
      </div>
    </div>
  );
};

type Props = {
  title: ReactNode;
  profile: Content_profile;
  currentUser: Content_currentUser
};

const Content = ({ title, profile, currentUser }: Props) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/edit`}>
        <EditUser
          currentUser={currentUser}
          profile={profile}
          cancelRoute={url}
        />
      </Route>
      <Route>
        <Breadcrumb title={title} />
        <article>
          <Header profile={profile} />
          <Tabs />
          <div className="mt-6 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Switch>
              <Route path={`${path}/profile`}>
                <DescriptionList profile={profile} />
              </Route>
              <Route path={`${path}/apps`}>
                TODO: Replace teammebers with apps
                <TeamMemberList />
              </Route>
              <Route>
                <Redirect to={`${url}/profile`} />
              </Route>
            </Switch>
          </div>
        </article>
      </Route>
    </Switch>
  );
};

export default createFragmentContainer(Content, {
  currentUser: graphql`
    fragment Content_currentUser on ProfileNode {
      ...EditUser_currentUser
    }
  `,
  profile: graphql`
    fragment Content_profile on ProfileNode {
      ...Header_profile
      ...DescriptionList_profile
      ...EditUser_profile
    }
  `,
});
