import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import UserForm from "../../../UserForm";
import { AddUsers_currentUser } from "./__generated__/AddUsers_currentUser.graphql";

type Props = {
  currentUser: AddUsers_currentUser;
};

const AddUsers = ({ currentUser }: Props) => {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <UserForm profile={null} currentUser={currentUser} cancelRoute="/" />
      </div>
    </main>
  );
};

export default createFragmentContainer(AddUsers, {
  currentUser: graphql`
    fragment AddUsers_currentUser on ProfileNode {
      ...UserForm_currentUser
    }
  `,
});
