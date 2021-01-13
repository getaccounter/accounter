import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Integration_integration } from "./__generated__/Integration_integration.graphql";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const Integration = (props: {
  className?: string;
  integration: Integration_integration;
}) => {
  let { url } = useRouteMatch();
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={props.integration.service.logo}
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          to={`${url}/details/5`}
          className="focus:outline-none"
        >
          {/* Extend touch target to entire panel */}
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            {props.integration.service.name}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default createFragmentContainer(Integration, {
  // For each of the props that depend on server data, we define a corresponding
  // key in this object. Here, the component expects server data to populate the
  // `item` prop, so we'll specify the fragment from above at the `item` key.
  integration: graphql`
    fragment Integration_integration on IntegrationInterface {
      service {
        name
        logo
      }
    }
  `,
});
