import React, { useState } from "react";
import Loading from "../../../Loading";
import Overview from "../Overview";
import Directory, { DirectoryEntry, DirectoryEntryList } from "../Directory";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { IntegrationsQuery } from "./__generated__/IntegrationsQuery.graphql";
import { useEnvironment } from "../../../../contexts/relay";
import Integration from "./component/Integration";

const TITLE = "Apps";

const Integrations = () => {
  const environment = useEnvironment();
  const [showDirectoryOnMobile, setShowDirectoryOnMobile] = useState(true);
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
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <Overview
              showOnMobile={!showDirectoryOnMobile}
              title={TITLE}
              onOpenDirectoryOnMobile={() => setShowDirectoryOnMobile(true)}
            />
            <Directory
              showOnMobile={showDirectoryOnMobile}
              title={TITLE}
              subtitle={`${props.integrations.length} installed apps`}
            >
              <DirectoryEntryList>
                {props.integrations.map((integration, idx) => (
                  <DirectoryEntry key={idx}>
                    <Integration
                      integration={integration}
                      onClick={() => setShowDirectoryOnMobile(false)}
                    />
                  </DirectoryEntry>
                ))}
              </DirectoryEntryList>
            </Directory>
          </div>
        );
      }}
    />
  );
};

export default Integrations;
