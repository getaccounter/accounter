import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "../../../icons/solid";
import Header from "./components/Header";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Content_profile } from "./__generated__/Content_profile.graphql";
import DescriptionList from "./components/DescriptionList";

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

const Tabs = () => {
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              aria-current="page"
            >
              Profile
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Calendar
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Recognition
            </a>
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
    <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
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
};

const Content = ({ title, profile }: Props) => (
  <>
    <Breadcrumb title={title} />
    <article>
      <Header profile={profile} />
      <Tabs />
      <DescriptionList profile={profile} />
      <TeamMemberList />
    </article>
  </>
);

export default createFragmentContainer(Content, {
  profile: graphql`
    fragment Content_profile on ProfileNode {
      ...Header_profile
      ...DescriptionList_profile
    }
  `,
});
