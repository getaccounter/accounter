import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Menu from "./components/Menu";

const ProfileDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="ml-3 relative">
      <div>
        <button
          className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>
      {showMenu && (
        <ClickAwayListener onClickAway={() => setShowMenu(false)}>
          <Menu />
        </ClickAwayListener>
      )}
    </div>
  );
};

export default ProfileDropdown;
