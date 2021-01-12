import React, { ReactNode } from "react";
import { Filter, Search } from "../../../icons/solid";
import SecondaryColumn from "../SecondaryColumn";

const DirectoryHeader = () => (
  <div className="px-6 pt-6 pb-4">
    <h2 className="text-lg font-medium text-gray-900">Directory</h2>
    <p className="mt-1 text-sm text-gray-600">
      Search directory of 9,999 employees
    </p>
    <form className="mt-6 flex space-x-4" action="#">
      <div className="flex-1 min-w-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search"
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        <Filter className="h-5 w-5 text-gray-400" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  </div>
);

export const DirectoryEntryList = (props: {
  title?: ReactNode;
  children: ReactNode;
}) => (
  <>
    {props.title && (
      <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{props.title}</h3>
      </div>
    )}
    <ul
      className={`relative z-0 divide-y divide-gray-200 border-gray-200 last:border-b ${
        !props.title && "border-t"
      }`}
    >
      {props.children}
    </ul>
  </>
);

export const DirectoryEntry = (props: { children: ReactNode }) => (
  <li>
    <div className="relative px-6 py-5 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
      {props.children}
    </div>
  </li>
);

type Props = {
  children: ReactNode;
};

const DirectoryList = ({ children }: Props) => (
  <nav
    className="flex-1 min-h-0 relative overflow-y-auto"
    aria-label="Directory"
  >
    {children}
  </nav>
);

const Directory = ({ children }: Props) => (
  <SecondaryColumn>
    <DirectoryHeader />
    <DirectoryList>{children}</DirectoryList>
  </SecondaryColumn>
);

export default Directory;
