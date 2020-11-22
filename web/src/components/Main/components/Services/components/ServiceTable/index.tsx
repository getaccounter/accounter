import React from "react";
import { Link } from "react-router-dom";
import AddButton from "./components/AddButton";
import ChevronRightIcon from "./components/ChevronRightIcon";
import SlackLogo from "./components/SlackLogo";

const UserIcon = ({ src }: { src: string }) => (
  <img
    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
    src={src}
    alt=""
  />
);

const IntegrationRow = (props: { isNotInstalled?: boolean }) => {
  return (
    <li>
      <Link to="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <SlackLogo size={80} />
              <p className="pl-2 text-3xl font-bold leading-tight text-gray-900">
                Slack
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
            {props.isNotInstalled ? (
              <AddButton>Add Slack</AddButton>
            ) : (
              <ChevronRightIcon />
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

const ServiceTable = () => (
  <div className="bg-white shadow overflow-hidden sm:rounded-md">
    <ul className="divide-y divide-gray-200">
      <IntegrationRow />
      <IntegrationRow isNotInstalled />
    </ul>
  </div>
);

export default ServiceTable;
