import graphql from "babel-plugin-relay/macro";
import { Profile_profile$key } from "./__generated__/Profile_profile.graphql";
import { useState } from "react";
import { SelectorIcon } from "@heroicons/react/solid";
import Dropdown from "./components/Dropdown";
import ClickAwayListener from "react-click-away-listener";
import { useFragment } from "relay-hooks";

type Props = {
  desktop?: boolean;
  profile: Profile_profile$key;
};

const Profile = (props: Props) => {
  const profile = useFragment(
    graphql`
      fragment Profile_profile on ProfileNode {
        ...Dropdown_profile
        firstName
        lastName
        title
        image
      }
    `,
    props.profile
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative text-left flex flex-col-reverse">
      <div className="flex-shrink-0 flex border-t border-gray-200">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup
          type="button"
          className={`w-full text-left flex-shrink-0 group block p-4 hover:bg-gray-50  ${
            props.desktop ? "w-full" : ""
          }`}
          id="options-menu"
          aria-expanded={isDropdownOpen}
        >
          <span className="flex w-full justify-between items-center">
            <span className="flex items-center">
              <span>
                <img
                  className={`inline-block rounded-full ${
                    props.desktop ? "h-9 w-9" : "h-10 w-10 "
                  }`}
                  src={profile.image}
                  alt=""
                />
              </span>
              <span className="ml-3">
                <p
                  className={`${
                    props.desktop ? "text-sm" : "text-base"
                  } font-medium text-gray-700`}
                >
                  {profile.firstName} {profile.lastName}
                </p>
                <p
                  className={`${
                    props.desktop ? "text-xs" : "text-sm"
                  } font-medium text-gray-500`}
                >
                  {profile.title}
                </p>
              </span>
            </span>
            <SelectorIcon className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          </span>
        </button>
      </div>
      {isDropdownOpen && (
        <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
          <Dropdown
            profile={profile}
            onClick={() => setIsDropdownOpen(false)}
          />
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Profile;
