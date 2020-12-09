import { gql, useQuery } from "@apollo/client";
import React from "react";
import ServiceRow from "../ServiceRow";

export type Service = {
  logo: string;
  name: string;
  oauthUrl: string;
};

type ServiceListResponse = {
  services: Array<Service>;
};

export const GET_SERVICE_LIST_QUERY = gql`
  query GetServiceList {
    services {
      logo
      name
      oauthUrl
    }
  }
`;

type Props = {
  className?: string;
};

const ServiceTable = ({ className = "" }: Props) => {
  const { data } = useQuery<ServiceListResponse>(GET_SERVICE_LIST_QUERY);

  return (
    <div
      className={`bg-white shadow overflow-hidden sm:rounded-md ${className}`}
    >
      <ul aria-label="more-services" className="divide-y divide-gray-200">
        {data?.services.map((service) => (
          <ServiceRow key={service.name} service={service} isNotInstalled />
        ))}
      </ul>
    </div>
  );
};

export default ServiceTable;
