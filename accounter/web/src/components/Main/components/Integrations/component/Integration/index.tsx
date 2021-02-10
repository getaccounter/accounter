import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Integration_integration } from "./__generated__/Integration_integration.graphql";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import EntryCard from "../../../EntryCard";
import Badge from "../../../../../Badge";

const Integration = (props: {
  className?: string;
  integration: Integration_integration;
}) => {
  const { url } = useRouteMatch();
  return (
    <>
      <EntryCard
        to={`${url}/details/${props.integration.id}`}
        imgSrc={props.integration.service.logo}
        secondary={props.integration.service.name}
        rightSide={
          <>
            {!props.integration.hasValidToken && (
              <Badge color="red">Expired</Badge>
            )}
          </>
        }
      >
        {props.integration.name}
      </EntryCard>
    </>
  );
};

export default createFragmentContainer(Integration, {
  integration: graphql`
    fragment Integration_integration on IntegrationNode {
      id
      name
      hasValidToken
      service {
        name
        logo
      }
    }
  `,
});
