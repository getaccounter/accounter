import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import UserForm from "../../../../UserForm";
import { EditUser_organization } from "./__generated__/EditUser_organization.graphql";
import { EditUser_profile } from "./__generated__/EditUser_profile.graphql";

type Props = {
  organization: EditUser_organization;
  profile: EditUser_profile;
  cancelRoute: string;
};

const EditUser = ({ organization, profile, cancelRoute }: Props) => {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <UserForm
          organization={organization}
          profile={profile}
          cancelRoute={cancelRoute}
        />
      </div>
    </main>
  );
};

export default createFragmentContainer(EditUser, {
  profile: graphql`
    fragment EditUser_profile on ProfileNode {
      ...UserForm_profile
    }
  `,
  organization: graphql`
    fragment EditUser_organization on OrganizationNode {
      ...UserForm_organization
    }
  `,
});
