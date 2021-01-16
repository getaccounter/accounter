import React from "react";
import Loading from "../../../Loading";
import Directory, { DirectoryEntry, DirectoryEntryList } from "../Directory";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { IntegrationsQuery } from "./__generated__/IntegrationsQuery.graphql";
import { useEnvironment } from "../../../../contexts/relay";
import Integration from "./component/Integration";
import DetailLayout from "../DetailLayout";

const TITLE = "Apps";

const Integrations = () => {
  const environment = useEnvironment();
  return (
    <QueryRenderer<IntegrationsQuery>
      environment={environment}
      query={graphql`
        query IntegrationsQuery {
          integrations {
            ...Integration_integration
          }
        }
      `}
      variables={{}}
      render={({ props }) => {
        return !props ? (
          <Loading />
        ) : (
          <DetailLayout
            mainColumn={() => "TODO"}
            secondaryColumn={() => (
              <Directory
                title={TITLE}
                subtitle={`${props.integrations.length} installed apps`}
              >
                <DirectoryEntryList>
                  {props.integrations.map((integration, idx) => (
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
