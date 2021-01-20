import React from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DetailLayout from "../DetailLayout";
import Content from "../Content";
import UserDirectory from "./components/UserDirectory";
import { Users_currentUser } from "./__generated__/Users_currentUser.graphql";

type Props = {
  currentUser: Users_currentUser;
};

const Users = (props: Props) => {
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <DetailLayout
        mainColumn={(id) => {
          const profile = props.currentUser.organization.profiles.edges.find(
            (p) => p!.node!.id === id
          );
          return (
            <Content
              title="Users"
              profile={profile!.node!}
              currentUser={props.currentUser}
            />
          );
        }}
        secondaryColumn={() => (
          <UserDirectory profiles={props.currentUser.organization.profiles} />
        )}
      />
    </div>
  );
};

export default createFragmentContainer(Users, {
  currentUser: graphql`
    fragment Users_currentUser on ProfileNode {
      ...Content_currentUser
      organization {
        profiles(first: 100) @connection(key: "Users_profiles") {
          edges {
            node {
              id
              ...Content_profile
            }
          }
          ...UserDirectory_profiles
        }
      }
    }
  `,
});
