import React, { useState } from 'react';
import Loading from '../../../Loading';
import Directory, { DirectoryEntry, DirectoryEntryList } from '../Directory';
import graphql from 'babel-plugin-relay/macro';
import { IntegrationsQuery } from './__generated__/IntegrationsQuery.graphql';
import Integration from './component/Integration';
import DetailLayout from '../DetailLayout';
import IntegrationContent from './component/IntegrationContent';
import { useQuery } from 'relay-hooks';

const Integrations = () => {
  const [searchString, setSearchString] = useState('');
  const { data, error } = useQuery<IntegrationsQuery>(
    graphql`
      query IntegrationsQuery {
        integrations {
          name
          service {
            name
          }
          ...Integration_integration
        }
      }
    `
  );
  if (error) {
    // catch in ErrorBoundary
    throw error;
  }
  return !data ? (
    <Loading />
  ) : (
    <DetailLayout
      mainColumn={(id) => {
        return <IntegrationContent id={id} />;
      }}
      secondaryColumn={() => (
        <Directory
          title="Apps"
          subtitle={`${data.integrations.length} installed apps`}
          searchString={searchString}
          onChangeSearchString={setSearchString}
        >
          <DirectoryEntryList>
            {data.integrations
              .filter((integration) => {
                const lowerCasedSearchString = searchString.toLocaleLowerCase();
                const lowerCasedIntegrationName = integration.name.toLowerCase();
                const lowerCasedServiceName = integration.service.name.toLowerCase();
                const matchesIntegrationName = lowerCasedIntegrationName.includes(lowerCasedSearchString);
                const matchesServiceName = lowerCasedServiceName.includes(lowerCasedSearchString);
                if (!searchString || matchesIntegrationName || matchesServiceName) {
                  return true;
                }
                return false;
              })
              .map((integration, idx) => (
                <DirectoryEntry key={idx}>
                  <Integration integration={integration} />
                </DirectoryEntry>
              ))}
          </DirectoryEntryList>
        </Directory>
      )}
    />
  );
};

export default Integrations;
