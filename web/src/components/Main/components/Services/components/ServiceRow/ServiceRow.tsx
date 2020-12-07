import React from "react";
import { ChevronRight } from "../../../../../icons/outline";
import { Service } from "../AddMoreServices";
import AddButton from "../ServiceRow/components/AddButton";
import ServiceLogo from "../ServiceRow/components/ServiceLogo";

const UserIcon = ({ src }: { src: string }) => (
  <img
    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
    src={src}
    alt=""
  />
);

type Props = { service: Service; isNotInstalled?: boolean };

const ServiceRow = (props: Props) => {
  return (
    <li>
      <a
        className="block hover:bg-gray-50"
        href={props.service.oauthUrl}
        target="_blank"
        rel="noreferrer"
      >
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <ServiceLogo service={props.service} />
              <p className="pl-2 text-3xl font-bold leading-tight text-gray-900">
                {props.service.name}
              </p>
            </div>
            {!props.isNotInstalled && (
              <div className="mt-4 flex-shrink-0 sm:mt-0">
                <div className="flex overflow-hidden">
                  <UserIcon src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <UserIcon src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <UserIcon src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
                  <UserIcon src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                </div>
              </div>
            )}
          </div>
          <div className="ml-5 flex-shrink-0">
            {false ? (
              <AddButton>Add</AddButton>
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </a>
    </li>
  );
};

export default ServiceRow;
