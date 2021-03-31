import graphql from 'babel-plugin-relay/macro';
import { Integration_integration$key } from './__generated__/Integration_integration.graphql';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import EntryCard from '../../../EntryCard';
import Badge from '../../../../../Badge';
import { useFragment } from 'relay-hooks';

const Integration = (props: { className?: string; integration: Integration_integration$key }) => {
  const { url } = useRouteMatch();
  const integration = useFragment(
    graphql`
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
    props.integration
  );
  return (
    <>
      <EntryCard
        to={`${url}/details/${integration.id}`}
        imgSrc={integration.service.logo}
        secondary={integration.service.name}
        rightSide={<>{!integration.hasValidToken && <Badge color="red">Expired</Badge>}</>}
      >
        {integration.name}
      </EntryCard>
    </>
  );
};

export default Integration;
