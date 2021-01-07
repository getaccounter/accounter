import React, { useState } from "react";
import Logo from "./components/Logo";
import MobileDropdownButton from "./components/MobileDropdownButton";
import MobileMenu from "./components/MobileMenu";
import ProfileDropdown from "./components/ProfileDropdown";
import Tabs from "./components/Tabs";

type Props = {
  tabs: Array<{ label: string; to: string }>;
};

const NavBar = ({ tabs }: Props) => {
  const [showDropdown, setShowDrowndown] = useState(false);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <Tabs value={tabs} />
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
        {showDropdown && <MobileMenu tabs={tabs} />}
      </div>
    </nav>
  );
};

export default NavBar;
