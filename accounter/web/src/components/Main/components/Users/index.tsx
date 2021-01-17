import React from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DetailLayout from "../DetailLayout";
import Content from "../Content";
import UserDirectory from "./components/UserDirectory";
import { Users_organization } from "./__generated__/Users_organization.graphql";

type Props = {
  organization: Users_organization;
};

const Users = (props: Props) => {
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <DetailLayout
        mainColumn={(id) => {
          const profile = props.organization.profiles.edges.find(
            (p) => p!.node!.id === id
          );
          return (
            <Content
              title="Users"
              profile={profile!.node!}
              organization={props.organization}
            />
          );
        }}
        secondaryColumn={() => (
          <UserDirectory profiles={props.organization.profiles} />
        )}
      />
    </div>
  );
};

export default createFragmentContainer(Users, {
  organization: graphql`
    fragment Users_organization on OrganizationNode {
      ...Content_organization
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
  `,
});
