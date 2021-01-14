import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Profile_profile } from "./__generated__/Profile_profile.graphql";

type Props = {
  desktop?: boolean;
  profile: Profile_profile;
};

const Profile = ({ desktop, profile }: Props) => {
  const profileLabel = profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.email
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className={`flex-shrink-0 group block ${desktop ? "w-full" : ""}`}
      >
        <div className="flex items-center">
          <div>
            <img
              className={`inline-block rounded-full ${
                desktop ? "h-9 w-9" : "h-10 w-10 "
              }`}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p
              className={`${
                desktop ? "text-sm" : "text-base"
              } font-medium text-gray-700 group-hover:text-gray-900`}
            >
              {profileLabel}
            </p>
            <p
              className={`${
                desktop ? "text-xs" : "text-sm"
              } font-medium text-gray-500 group-hover:text-gray-700`}
            >
              View profile
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default createFragmentContainer(Profile, {
  profile: graphql`
    fragment Profile_profile on ProfileNode {
      email
      firstName
      lastName
    }
  `,
});
