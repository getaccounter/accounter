import React from "react";
import graphql from "babel-plugin-relay/macro";
import { useEnvironment } from "../../../../contexts/relay";
import { Plus } from "../../../icons/solid";
import { QueryRenderer } from "react-relay";
import { ServicesQuery } from "./__generated__/ServicesQuery.graphql";
import Loading from "../../../Loading";

const Services = () => {
  const environment = useEnvironment();
  return (
    <QueryRenderer<ServicesQuery>
      environment={environment}
      query={graphql`
        query ServicesQuery {
          services {
            logo
            name
            oauthUrl
          }
        }
      `}
      variables={{}}
      render={({ props }) =>
        !props ? (
          <Loading />
        ) : (
          <>
            <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {props.services.map((service) => (
                <div
                  key={service.name}
                  className="relative rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-md flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={service.logo}
                      alt={`${service.name} logo`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-medium text-gray-900">
                      {service.name}
                    </p>
                  </div>
                  <div className="pr-3">
                    <a href={service.oauthUrl} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <Plus className="h-6 w-6 text-gray-400" />
                      <span className="sr-only">Add {service.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      }
    />
  );
};

export default Services;
