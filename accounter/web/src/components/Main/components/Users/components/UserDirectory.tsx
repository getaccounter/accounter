import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import React from "react";
import Directory, { DirectoryEntryList, DirectoryEntry } from "../../Directory";
import { UserDirectory_organization } from "./__generated__/UserDirectory_organization.graphql";
import User from "./components/User";

type Props = {
  organization: UserDirectory_organization;
};

type Profile = UserDirectory_organization["profiles"]["edges"][0];

const UserDirectory = ({ organization }: Props) => {
  const groupedUsers = organization.profiles.edges
    .map((edge) => edge!)
    .reduce((grouped: Record<string, Array<Profile>>, profile) => {
      const groupLabel = profile.node!.lastName[0].toUpperCase();
      const group = grouped[groupLabel] || [];
      return {
        ...grouped,
        [groupLabel]: group.concat(profile),
      };
    }, {});
  return (
    <Directory title="Users" subtitle={`${9999} users`}>
      {Object.entries(groupedUsers).map(([groupLabel, profiles]) => (
        <DirectoryEntryList key={groupLabel} title={groupLabel}>
          {profiles.map((edge) => (
            <DirectoryEntry key={edge!.node!.id}>
              <User profile={edge!.node!} />
            </DirectoryEntry>
          ))}
        </DirectoryEntryList>
      ))}
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
            lastName
            ...User_profile
          }
        }
      }
    }
  `,
});
