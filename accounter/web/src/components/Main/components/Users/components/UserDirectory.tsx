import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import React from "react";
import Directory, { DirectoryEntryList, DirectoryEntry } from "../../Directory";
import { UserDirectory_organization } from "./__generated__/UserDirectory_organization.graphql";
import User from "./components/User";

type Props = {
  organization: UserDirectory_organization;
};

const UserDirectory = ({ organization }: Props) => {
  return (
    <Directory title="Users" subtitle={`${9999} users`}>
      <DirectoryEntryList title="A">
        {organization.profiles.edges.map((profile) => (
          <DirectoryEntry key={profile!.node!.id}>
            <User profile={profile!.node!} />
          </DirectoryEntry>
        ))}
      </DirectoryEntryList>
      <DirectoryEntryList title="C">
        {organization.profiles.edges.map((profile) => (
          <DirectoryEntry key={profile!.node!.id}>
            <User profile={profile!.node!} />
          </DirectoryEntry>
        ))}
      </DirectoryEntryList>
      <DirectoryEntryList title="E">
        {organization.profiles.edges.map((profile) => (
          <DirectoryEntry key={profile!.node!.id}>
            <User profile={profile!.node!} />
          </DirectoryEntry>
        ))}
      </DirectoryEntryList>
    </Directory>
  );
};

export default createFragmentContainer(UserDirectory, {
  organization: graphql`
    fragment UserDirectory_organization on OrganizationNode {
      profiles(
        first: 100 # max GraphQLInt
      ) @connection(key: "UserDirectory_profiles") {
        edges {
          node {
            id
            ...User_profile
          }
        }
      }
    }
  `,
});
