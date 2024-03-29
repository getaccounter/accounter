import React, { ReactNode } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Filters, { Filter } from './components/Filters';

const DirectoryHeader = (props: {
  title: string;
  subtitle?: string;
  filters: Array<Filter> | void;
  searchString: string;
  onChangeSearchString: (searchString: string) => void;
}) => {
  return (
    <div className="px-6 pt-6 pb-4">
      <h2 className="text-lg font-medium text-gray-900">{props.title}</h2>
      {props.subtitle && <p className="mt-1 text-sm text-gray-600">{props.subtitle}</p>}
      <form className="mt-6 flex space-x-4" action="#">
        <div className="flex-1 min-w-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              value={props.searchString}
              type="search"
              name="search"
              id="search"
              className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
              onChange={(evt) => props.onChangeSearchString(evt.target.value)}
            />
          </div>
        </div>
        {props.filters && <Filters filters={props.filters} />}
      </form>
    </div>
  );
};

export const DirectoryEntryList = (props: { title?: ReactNode; children: ReactNode }) => (
  <>
    {props.title && (
      <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{props.title}</h3>
      </div>
    )}
    <ul className={`relative z-0 divide-y divide-gray-200 border-gray-200 last:border-b ${!props.title && 'border-t'}`}>
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

const DirectoryList = ({ children }: { children: ReactNode }) => (
  <nav className="flex-1 min-h-0 relative overflow-y-auto" aria-label="Directory">
    {children}
  </nav>
);

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  filters?: Array<Filter>;
  searchString: string;
  onChangeSearchString: (searchString: string) => void;
};

const Directory = ({ children, title, subtitle, filters, searchString, onChangeSearchString }: Props) => (
  <>
    <DirectoryHeader
      filters={filters}
      title={title}
      subtitle={subtitle}
      searchString={searchString}
      onChangeSearchString={onChangeSearchString}
    />
    <DirectoryList>{children}</DirectoryList>
  </>
);

export default Directory;
