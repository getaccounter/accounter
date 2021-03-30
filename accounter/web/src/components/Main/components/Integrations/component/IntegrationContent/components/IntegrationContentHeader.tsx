import React, { ReactNode } from "react";
import { PencilIcon, LinkIcon } from "@heroicons/react/solid";
import graphql from "babel-plugin-relay/macro";
import { Link } from "react-router-dom";
import { IntegrationContentHeader_integration$key } from "./__generated__/IntegrationContentHeader_integration.graphql";
import Badge from "../../../../../../Badge";
import { useFragment } from "relay-hooks";

type Props = {
  integration: IntegrationContentHeader_integration$key;
};

const Name = (props: { children: ReactNode; hasValidToken: boolean }) => (
  <div className="inline-flex items-center">
    <h1 className="text-2xl font-bold text-gray-900 truncate">
      {props.children}
    </h1>
    {!props.hasValidToken && (
      <span className="pl-2">
        <Badge color="red">Expired</Badge>
      </span>
    )}
  </div>
);

const MainButton = (props: {
  children: ReactNode;
  to?: string;
  external?: boolean;
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
  return props.to && props.external ? (
    <a
      className={className}
      href={props.to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : props.to ? (
    <Link className={className} to={props.to}>
      {content}
    </Link>
  ) : (
    <button type="button" className={className} onClick={props.onClick}>
      {content}
    </button>
  );
};

const IntegrationContentHeader = (props: Props) => {
  const integration = useFragment(
    graphql`
      fragment IntegrationContentHeader_integration on IntegrationNode {
        name
        managementUrl
        hasValidToken
        service {
          logo
          oauthUrl
        }
      }
    `,
    props.integration
  );
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
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-white"
              src={integration.service.logo}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <Name hasValidToken={integration.hasValidToken}>
                {integration.name}
              </Name>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              {!integration.hasValidToken ? (
                <MainButton danger external to={integration.service.oauthUrl}>
                  <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-red-400" />
                  <span>Reconnect</span>
                </MainButton>
              ) : (
                <MainButton external to={integration.managementUrl}>
                  <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  <span>Manage</span>
                </MainButton>
              )}
            </div>
          </div>
        </div>
        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <Name hasValidToken={integration.hasValidToken}>
            {integration.name}
          </Name>
        </div>
      </div>
    </div>
  );
};

export default IntegrationContentHeader
