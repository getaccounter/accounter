import React, { ReactNode } from "react";
import { Briefcase, MinusCircle, Pencil } from "../../../../../../icons/solid";
import { createFragmentContainer, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Header_profile } from "./__generated__/Header_profile.graphql";
import { Link, useRouteMatch } from "react-router-dom";
import Badge from "../../../../../../Badge";
import { commitMutation, PayloadError } from "relay-runtime";
import {
  HeaderAdminMutation,
  HeaderAdminMutationResponse,
  HeaderAdminMutationVariables,
} from "./__generated__/HeaderAdminMutation.graphql";
import { useEnvironment } from "../../../../../../../contexts/relay";
import { useNotifications } from "../../../../../../../contexts/notification";
import { Header_currentUser } from "./__generated__/Header_currentUser.graphql";

const toggleAdmin = (
  environment: Environment,
  variables: HeaderAdminMutationVariables,
  onCompleted: (
    response: HeaderAdminMutationResponse,
    errors?: ReadonlyArray<PayloadError> | null
  ) => void,
  onError: (error: PayloadError) => void
) => {
  commitMutation<HeaderAdminMutation>(environment, {
    mutation: graphql`
      mutation HeaderAdminMutation($id: ID!, $isAdmin: Boolean!) {
        updateUser(input: { id: $id, isAdmin: $isAdmin }) {
          profiles {
            id
            ...Content_profile @relay(mask: false)
          }
        }
      }
    `,
    variables,
    onCompleted,
    onError,
  });
};

type Props = {
  profile: Header_profile;
  currentUser: Header_currentUser;
};

const Name = (props: {
  children: ReactNode;
  isAdmin: boolean;
  isOwner: boolean;
}) => (
  <div className="inline-flex items-center">
    <h1 className="text-2xl font-bold text-gray-900 truncate">
      {props.children}
    </h1>
    {props.isOwner ? (
      <span className="pl-2">
        <Badge color="blue">Owner</Badge>
      </span>
    ) : (
      props.isAdmin && (
        <span className="pl-2">
          <Badge color="blue">Admin</Badge>
        </span>
      )
    )}
  </div>
);

const MainButton = (props: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  danger?: boolean;
}) => {
  const className = `hover:bg-gray-50 inline-flex px-4 py-2 border border-${
    props.danger ? "red" : "gray"
  }-300 shadow-sm rounded-md text-${
    props.danger ? "red" : "gray"
  }-700 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`;
  const content = (
    <span className="flex-1 inline-flex justify-center text-sm font-medium">
      {props.children}
    </span>
  );
  return props.to ? (
    <Link className={className} to={props.to}>
      {content}
    </Link>
  ) : (
    <button type="button" className={className} onClick={props.onClick}>
      {content}
    </button>
  );
};

const Header = (props: Props) => {
  const { url } = useRouteMatch();
  const environment = useEnvironment();
  const { addNotification } = useNotifications();

  const handleAdminToggle = (isAdmin: boolean) => {
    const variables = {
      id: props.profile.id,
      isAdmin,
    };
    toggleAdmin(
      environment,
      variables,
      (response, errors) => {
        if (errors) {
          addNotification({
            type: "error",
            title: "Something went wrong.",
            content: "Could not change admin",
          });
        } else {
        }
      },
      (err) =>
        addNotification({
          type: "error",
          title: "Something went wrong.",
          content: "Could not change admin",
        })
    );
  };

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
              src={props.profile.image}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <Name
                isOwner={props.profile.isOwner}
                isAdmin={props.profile.isAdmin}
              >
                {props.profile.firstName} {props.profile.lastName}
              </Name>
            </div>
            {props.profile.currentUserCanEdit && (
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <MainButton to={`${url}/edit`}>
                  <Pencil className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  <span>Edit</span>
                </MainButton>
                {props.currentUser.isOwner && !props.profile.isOwner && (
                  <>
                    {props.profile.isAdmin ? (
                      <MainButton
                        danger
                        key="remove-admin"
                        onClick={() => handleAdminToggle(false)}
                      >
                        <MinusCircle className="-ml-1 mr-2 h-5 w-5 text-red-400" />
                        <span>Remove admin</span>
                      </MainButton>
                    ) : (
                      <MainButton
                        key="make-admin"
                        onClick={() => handleAdminToggle(true)}
                      >
                        <Briefcase className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                        <span>Make admin</span>
                      </MainButton>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <Name isOwner={props.profile.isOwner} isAdmin={props.profile.isAdmin}>
            {props.profile.firstName} {props.profile.lastName}
          </Name>
        </div>
      </div>
    </div>
  );
};

export default createFragmentContainer(Header, {
  currentUser: graphql`
    fragment Header_currentUser on ProfileNode {
      isOwner
    }
  `,
  profile: graphql`
    fragment Header_profile on ProfileNode {
      id
      image
      firstName
      lastName
      isAdmin
      currentUserCanEdit
      isOwner
      isCurrentUser
    }
  `,
});
