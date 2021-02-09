import React, { useState } from "react";
import Loading from "../../../Loading";
import Directory, { DirectoryEntry, DirectoryEntryList } from "../Directory";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { IntegrationsQuery } from "./__generated__/IntegrationsQuery.graphql";
import { useEnvironment } from "../../../../contexts/relay";
import Integration from "./component/Integration";
import DetailLayout from "../DetailLayout";
import IntegrationContent from "./component/IntegrationContent";

const TITLE = "Apps";

const Integrations = () => {
  const [searchString, setSearchString] = useState("");
  const environment = useEnvironment();
  return (
    <QueryRenderer<IntegrationsQuery>
      environment={environment}
      query={graphql`
        query IntegrationsQuery {
          integrations {
            id
            name
            service {
              name
            }
            ...Integration_integration
            ...IntegrationContent_integration
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (error) {
          // catch in ErrorBoundary
          throw error;
        }

        return !props ? (
          <Loading />
        ) : (
          <DetailLayout
            mainColumn={(id) => {
              const integration = props.integrations.find((p) => p.id === id)!;
              return <IntegrationContent integration={integration} />;
            }}
            secondaryColumn={() => (
              <Directory
                title={TITLE}
                subtitle={`${props.integrations.length} installed apps`}
                searchString={searchString}
                onChangeSearchString={setSearchString}
              >
                <DirectoryEntryList>
                  {props.integrations
                    .filter((integration) => {
                      const lowerCasedSearchString = searchString.toLocaleLowerCase();
                      const lowerCasedIntegrationName = integration.name.toLowerCase();
                      const lowerCasedServiceName = integration.service.name.toLowerCase();
                      const matchesIntegrationName = lowerCasedIntegrationName.includes(
                        lowerCasedSearchString
                      );
                      const matchesServiceName = lowerCasedServiceName.includes(
                        lowerCasedSearchString
                      );
                      if (
                        !searchString ||
                        matchesIntegrationName ||
                        matchesServiceName
                      ) {
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
      }}
    />
  );
};

export default Integrations;
