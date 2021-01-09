import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ASSET_STORAGE } from "../../../../config";
import { Service } from "../../../../utils/types";
import Loading from "../../../Loading";
import Directory, { DirectoryEntry, DirectoryEntryList } from "../Directory";

export type Integration = {
  service: Pick<Service, "name" | "logo">;
}

type IntegratonListResponse = {
  integrations: Array<Integration>;
};

export const GET_INTEGRATION_LIST_QUERY = gql`
  query GetIntegrationList {
    integrations {
      service {
        name
        logo
      }
    }
  }
`;

const Integrations = () => {
  const { data, loading } = useQuery<IntegratonListResponse>(
    GET_INTEGRATION_LIST_QUERY
  );
  return loading ? (
    <Loading />
  ) : (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      {/* <Content /> */}
      <Directory>
        <DirectoryEntryList>
          {data?.integrations.map((integration, idx) => (
            <DirectoryEntry key={idx}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`${ASSET_STORAGE}${integration.service.logo}`}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
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
};

export default Integrations;
