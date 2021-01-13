import React, { useState } from "react";
import Loading from "../../../Loading";
import Overview from "../Overview";
import Directory, { DirectoryEntry, DirectoryEntryList } from "../Directory";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  IntegrationsQuery,
  IntegrationsQueryResponse,
} from "./__generated__/IntegrationsQuery.graphql";
import { useEnvironment } from "../../../../contexts/relay";
import Integration from "./component/Integration";
import { Route, Switch } from "react-router-dom";
import Media from "react-media";

const TITLE = "Apps";

const IntegrationDirectory = (props: {
  isMobile?: boolean;
  integrations: IntegrationsQueryResponse["integrations"];
}) => (
  <Directory
    isMobile={props.isMobile}
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
);

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
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <Media query="(min-width: 1280px)">
              {(xlAndBigger) =>
                xlAndBigger ? (
                  <>
                    <Route path="/:service/:id">
                      <Overview
                        title={TITLE}
                      />
                    </Route>
                    <Route path="/">
                      <IntegrationDirectory
                        integrations={props.integrations}
                      />
                    </Route>
                  </>
                ) : (
                  <Switch>
                    <Route path="/:service/:id">
                      <Overview
                        title={TITLE}
                      />
                    </Route>
                    <Route path="/">
                      <IntegrationDirectory
                        isMobile
                        integrations={props.integrations}
                      />
                    </Route>
                  </Switch>
                )
              }
            </Media>
          </div>
        );
      }}
    />
  );
};

export default Integrations;
