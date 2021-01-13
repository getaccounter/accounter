import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import DetailLayout from "../DetailLayout";
import Directory, { DirectoryEntryList, DirectoryEntry } from "../Directory";
import Content from "../Content";

const User = () => {
  let { url } = useRouteMatch();
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link to={`${url}/details/5`} className="focus:outline-none">
          {/* Extend touch target to entire panel */}
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">Leslie Abbott</p>
          <p className="text-sm text-gray-500 truncate">Co-Founder / CEO</p>
        </Link>
      </div>
    </div>
  );
};

const UserDirectory = () => {
  return (
    <Directory title="Users" subtitle={`${9999} users`}>
      <DirectoryEntryList title="A">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="C">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="E">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="G">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="M">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="S">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="T">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="W">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
      <DirectoryEntryList title="Y">
        <DirectoryEntry>
          <User />
        </DirectoryEntry>
      </DirectoryEntryList>
    </Directory>
  );
};

const Users = () => (
  <div className="flex-1 relative z-0 flex overflow-hidden">
    <DetailLayout
      mainColumn={<Content title="Users" />}
      secondaryColumn={<UserDirectory />}
    />
  </div>
);

export default Users;
