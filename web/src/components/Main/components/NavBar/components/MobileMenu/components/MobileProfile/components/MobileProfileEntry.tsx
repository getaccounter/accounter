/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const MobileProfileEntry = ({ children }: Props) => (
  <a
    href="#"
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
  >
    {children}
  </a>
);

const MobileProfile = () => (
  <div className="pt-4 pb-3 border-t border-gray-700">
    <div className="flex items-center px-5 space-x-3">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium leading-none text-white">
          Tom Cook
        </div>
        <div className="text-sm font-medium leading-none text-gray-400">
          tom@example.com
        </div>
      </div>
    </div>
    <div className="mt-3 px-2 space-y-1">
      <MobileProfileEntry>Your Profile</MobileProfileEntry>

      <MobileProfileEntry>Settings</MobileProfileEntry>

      <MobileProfileEntry>Sign out</MobileProfileEntry>
    </div>
  </div>
);

export default MobileProfile;
