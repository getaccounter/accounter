import graphql from "babel-plugin-relay/macro";
import React from "react";
import { createFragmentContainer } from "react-relay";
import UserForm from "../../../../../../UserForm";
import { EditUser_currentUser } from "./__generated__/EditUser_currentUser.graphql";
import { EditUser_profile } from "./__generated__/EditUser_profile.graphql";
import { EditUser_profileList } from "./__generated__/EditUser_profileList.graphql";

type Props = {
  profile: EditUser_profile;
  currentUser: EditUser_currentUser;
  cancelRoute: string;
  profileList: EditUser_profileList
};

const EditUser = ({ profile, cancelRoute, currentUser, profileList }: Props) => {
  return (
    <div className="h-full overflow-y-auto focus:outline-none">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <UserForm
          currentUser={currentUser}
          profile={profile}
          cancelRoute={cancelRoute}
          profileList={profileList}
        />
      </div>
    </div>
  );
};

export default createFragmentContainer(EditUser, {
  currentUser: graphql`
    fragment EditUser_currentUser on ProfileNode {
      ...UserForm_currentUser
    }
  `,
  profile: graphql`
    fragment EditUser_profile on ProfileNode {
      ...UserForm_profile
    }
  `,
  profileList: graphql`
    fragment EditUser_profileList on ProfileNode @relay(plural: true) {
      ...UserForm_profileList
    }
  `,
});
