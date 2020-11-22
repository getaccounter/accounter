import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

const ChevronRightIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const UserIcon = ({ src }: { src: string }) => (
  <img
    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
    src={src}
    alt=""
  />
);

const PlusIcon = () => (
  <svg
    className="ml-2 -mr-0.5 h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

type Props = {
  children: ReactNode;
};
const AddButton = ({ children }: Props) => (
  <button
    type="button"
    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {children}
    <PlusIcon />
  </button>
);

const SlackLogo = (props: { size: number }) => (
  <svg
    id="prefix__Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 270 270"
    xmlSpace="preserve"
    height={`${props.size}px`}
    width={`${props.size}px`}
    style={{
      margin: `-${props.size / 5}px`,
    }}
  >
    <style>
      {
        ".prefix__st0{fill:#e01e5a}.prefix__st1{fill:#36c5f0}.prefix__st2{fill:#2eb67d}.prefix__st3{fill:#ecb22e}"
      }
    </style>
    <path
      className="prefix__st0"
      d="M99.4 151.2c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h12.9v12.9zM105.9 151.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9v-32.3z"
    />
    <path
      className="prefix__st1"
      d="M118.8 99.4c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9h-12.9zM118.8 105.9c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H86.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3z"
    />
    <g>
      <path
        className="prefix__st2"
        d="M170.6 118.8c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9h-12.9v-12.9zM164.1 118.8c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9V86.5c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9v32.3z"
      />
    </g>
    <g>
      <path
        className="prefix__st3"
        d="M151.2 170.6c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9v-12.9h12.9zM151.2 164.1c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9h-32.3z"
      />
    </g>
  </svg>
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
