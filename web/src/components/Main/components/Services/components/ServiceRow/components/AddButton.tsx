import React, { ReactNode } from "react";

type PlusIconProps = {
  className: string;
};

const PlusIcon = ({ className }: PlusIconProps) => (
  <svg
    className={className}
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
    <PlusIcon className="ml-2 -mr-0.5 h-4 w-4" />
  </button>
);

export default AddButton;
