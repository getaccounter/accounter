import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Service } from "../AddMoreServices";
import ServiceRow from "../ServiceRow";

type IntegratonListResponse = {
  integrations: Array<{
    service: Service;
  }>;
};

export const GET_SERVICE_LIST_QUERY = gql`
  query GetIntegrationList {
    integrations {
      service {
        name
        logo
      }
    }
  }
`;

type Props = {
  className?: string;
};

const InstalledServices = ({ className = "" }: Props) => {
  const { data } = useQuery<IntegratonListResponse>(GET_SERVICE_LIST_QUERY);
  return (
    <div
      className={`bg-white shadow overflow-hidden sm:rounded-md ${className}`}
    >
      <ul aria-label="integrations" className="divide-y divide-gray-200">
        {data?.integrations.map((integration) => (
          <ServiceRow
            key={integration.service.name}
            service={integration.service}
          />
        ))}
      </ul>
    </div>
  );
};

export default InstalledServices;
