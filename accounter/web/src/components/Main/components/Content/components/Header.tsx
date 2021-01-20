import React, { ReactNode } from "react";
import { Pencil, XCircle } from "../../../../icons/solid";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Header_profile } from "./__generated__/Header_profile.graphql";
import { Link, useRouteMatch } from "react-router-dom";
import Badge from "../../../../Badge";

type Props = {
  profile: Header_profile;
};

const Name = (props: { children: ReactNode; isAdmin: boolean }) => (
  <div className="inline-flex items-center">
    <h1 className="text-2xl font-bold text-gray-900 truncate">
      {props.children}
    </h1>
    {props.isAdmin && <Badge>Admin</Badge>}
  </div>
);

const MainButton = (props: {
  children: ReactNode;
  to: string;
  danger?: boolean;
}) => {
  return (
    <Link
      className={`hover:bg-gray-50 inline-flex px-4 py-2 border border-${
        props.danger ? "red" : "gray"
      }-300 shadow-sm rounded-md text-${
        props.danger ? "red" : "gray"
      }-700 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
      to={props.to}
    >
      <span className="flex-1 inline-flex justify-center text-sm font-medium">
        {props.children}
      </span>
    </Link>
  );
};

const Header = (props: Props) => {
  const { url } = useRouteMatch();
  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <Name isAdmin={props.profile.isAdmin}>
                {props.profile.firstName} {props.profile.lastName}
              </Name>
            </div>
            {props.profile.currentUserCanEdit && (
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <MainButton to={`${url}/edit`}>
                  <Pencil className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  <span>Edit</span>
                </MainButton>
                <MainButton danger to={`${url}/offboard`}>
                  <XCircle className="-ml-1 mr-2 h-5 w-5 text-red-400" />
                  <span>Offboard</span>
                </MainButton>
              </div>
            )}
          </div>
        </div>
        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <Name isAdmin={props.profile.isAdmin}>
            {props.profile.firstName} {props.profile.lastName}
          </Name>
        </div>
      </div>
    </div>
  );
};

export default createFragmentContainer(Header, {
  profile: graphql`
    fragment Header_profile on ProfileNode {
      firstName
      lastName
      isAdmin
      currentUserCanEdit
    }
  `,
});
