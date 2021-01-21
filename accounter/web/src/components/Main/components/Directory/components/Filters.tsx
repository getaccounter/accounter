import React, { useState } from "react";
import { Filter } from "../../../../icons/solid";
import ClickAwayListener from "react-click-away-listener";

type Filter = {
  label: string;
  value: string | number;
};

type Props = {
  filters: Array<Filter>;
};

const Filters = ({ filters }: Props) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-haspopup
          type="button"
          id="options-menu"
          aria-expanded={showFilters}
          className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="sr-only">Search</span>
        </button>
      </div>
      {/*
          Dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
        */}
      {showFilters && (
        <ClickAwayListener onClickAway={() => setShowFilters(false)}>
          <div className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {filters.map((filter) => (
                <label
                  htmlFor="comments"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                >
                  <input
                    // checked={isAdminCheckbox}
                    // onChange={(evt) => setIsAdminCheckbox(evt.target.checked)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    id="comments"
                    name="comments"
                    type="checkbox"
                  />
                  <span className="pl-4">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Filters;
