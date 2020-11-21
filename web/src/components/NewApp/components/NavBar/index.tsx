/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "./components/Logo";
import MobileDropdownButton from "./components/MobileDropdownButton";
import MobileMenu from "./components/MobileMenu";
import ProfileDropdown from "./components/ProfileDropdown";
import Tabs from "./components/Tabs";

const TAB_LIST = [
  {
    label: "Services",
    to: "/",
  },
  {
    label: "Users",
    to: "/users",
  },
];

const NavBar = () => {
  const [showDropdown, setShowDrowndown] = useState(false);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <Tabs value={TAB_LIST} />
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ProfileDropdown />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <MobileDropdownButton
              isShown={showDropdown}
              onClick={() => setShowDrowndown(!showDropdown)}
            />
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        {showDropdown && <MobileMenu tabs={TAB_LIST} />}
      </div>
    </nav>
  );
};

export default NavBar;
