import React from "react";
import Loading from "../../../Loading";
import Overview from "../Overview";
import Directory, { DirectoryEntry, DirectoryEntryList } from "../Directory";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { IntegrationsQuery } from "./__generated__/IntegrationsQuery.graphql";
import { useEnvironment } from "../../../../contexts/relay";

const Integrations = () => {
  const environment = useEnvironment();
  return (
    <QueryRenderer<IntegrationsQuery>
      environment={environment}
      query={graphql`
        query IntegrationsQuery {
          integrations {
            service {
              name
              logo
            }
          }
        }
      `}
      variables={{}}
      render={({ props }) => {
        return !props ? (
          <Loading />
        ) : (
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <Overview />
            <Directory
              title="Apps"
              subtitle={`${props.integrations.length} installed apps`}
            >
              <DirectoryEntryList>
                {props.integrations.map((integration, idx) => (
                  <DirectoryEntry key={idx}>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={integration.service.logo}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="focus:outline-none">
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {integration.service.name}
                          </p>
                        </a>
                      </div>
                    </div>
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
