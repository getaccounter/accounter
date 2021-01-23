import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useRouteMatch, Link } from "react-router-dom";
import { User_profile } from "./__generated__/User_profile.graphql";
import Badge from "../../../../../Badge";

type Props = {
  profile: User_profile;
};

const User = ({ profile }: Props) => {
  const { url } = useRouteMatch();
  return (
    <div className="flex items-center space-x-3 justify-between">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          to={`${url}/details/${profile.id}`}
          className="focus:outline-none"
        >
          {/* Extend touch target to entire panel */}
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            {profile.firstName} {profile.lastName}
          </p>
          {profile.title && (
            <p className="text-sm text-gray-500 truncate">{profile.title}</p>
          )}
        </Link>
      </div>
      {profile.isOwner ? (
        <Badge color="blue">Owner</Badge>
      ) : (
        profile.isAdmin && <Badge color="blue">Admin</Badge>
      )}
      {profile.isOffboarded && <Badge color="gray">Offboarded</Badge>}
    </div>
  );
};

export default createFragmentContainer(User, {
  profile: graphql`
    fragment User_profile on ProfileNode {
      id
      firstName
      lastName
      title
      isAdmin
      isOwner
      isOffboarded
    }
  `,
});
