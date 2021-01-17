import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { AddUsers_organization } from "./__generated__/AddUsers_organization.graphql";
import UserForm from "../../../UserForm";

type Props = {
  organization: AddUsers_organization;
};

const AddUsers = ({ organization }: Props) => {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <UserForm profile={null} organization={organization} cancelRoute="/" />
      </div>
    </main>
  );
};

export default createFragmentContainer(AddUsers, {
  organization: graphql`
    fragment AddUsers_organization on OrganizationNode {
      ...UserForm_organization
    }
  `,
});
