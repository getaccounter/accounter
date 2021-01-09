import { gql, useQuery } from "@apollo/client";
import { Service } from "../../../../utils/types";
import { Plus } from "../../../icons/solid";

export const GET_SERVICE_LIST_QUERY = gql`
  query GetServiceList {
    services {
      logo
      name
      oauthUrl
    }
  }
`;

type ServiceListResponse = {
  services: Array<Pick<Service, "name" | "logo" | "oauthUrl">>;
};

const Services = () => {
  const { data } = useQuery<ServiceListResponse>(GET_SERVICE_LIST_QUERY);
  console.log(data);
  return (
    <>
      <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data?.services.map((service) => (
          <div
            key={service.name}
            className="relative rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-md flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={`s3/${service.logo}`}
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
  );
};

export default Services;
