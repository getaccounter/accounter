import graphql from 'babel-plugin-relay/macro';
import { Dropdown_profile$key } from './__generated__/Dropdown_profile.graphql';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFragment } from 'relay-hooks';

type Props = {
  profile: Dropdown_profile$key;
  onClick: () => void;
};

const Dropdown = (props: Props) => {
  const profile = useFragment(
    graphql`
      fragment Dropdown_profile on ProfileNode {
        id
      }
    `,
    props.profile
  );
  return (
    <>
      {/*
      Dropdown panel, show/hide based on dropdown state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    */}
      <div
        className="z-10 mx-3 origin-top absolute right-0 left-0 bottom-20 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1">
          <Link
            to={`/users/details/${profile.id}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={props.onClick}
          >
            View profile
          </Link>
        </div>
        <div className="py-1">
          <Link
            to="/logout"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
