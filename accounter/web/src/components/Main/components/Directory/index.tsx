import { ReactNode } from "react";
import { Filter, Search } from "../../../icons/solid";

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

const DirectoryEntryList = (props: {
  title: ReactNode;
  children: ReactNode;
}) => (
  <>
    {props.title && (
      <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{props.title}</h3>
      </div>
    )}
    <ul className="relative z-0 divide-y divide-gray-200">{props.children}</ul>
  </>
);

const DirectoryEntry = () => (
  <li>
    <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        <a href="#" className="focus:outline-none">
          {/* Extend touch target to entire panel */}
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">Leslie Abbott</p>
          <p className="text-sm text-gray-500 truncate">Co-Founder / CEO</p>
        </a>
      </div>
    </div>
  </li>
);

const DirectoryList = () => (
  <nav
    className="flex-1 min-h-0 relative overflow-y-auto"
    aria-label="Directory"
  >
    <DirectoryEntryList title="A">
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="C">
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="E">
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="G">
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="M">
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="S">
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="T">
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="W">
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
      <DirectoryEntry />
    </DirectoryEntryList>
    <DirectoryEntryList title="Y">
      <DirectoryEntry />
    </DirectoryEntryList>
  </nav>
);

const Directory = () => (
  <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
    <DirectoryHeader />
    <DirectoryList />
  </aside>
);

export default Directory;
