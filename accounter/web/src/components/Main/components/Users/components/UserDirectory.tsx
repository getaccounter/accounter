import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import React, { useState } from "react";
import Directory, { DirectoryEntryList, DirectoryEntry } from "../../Directory";
import User from "./components/User";
import { UserDirectory_profiles } from "./__generated__/UserDirectory_profiles.graphql";

type Props = {
  profiles: UserDirectory_profiles;
};

type ProfileEdge = UserDirectory_profiles["edges"][0];

const UserDirectory = ({ profiles }: Props) => {
  const [showOffboardedUsers, setShowOffboardedUsers] = useState(false);
  const groupedUsers = [...profiles.edges.map((edge) => edge!)]
    .filter(edge => showOffboardedUsers || !edge.node!.isOffboarded)
    .sort((a, b) => {
      if (a.node!.lastName < b.node!.lastName) {
        return -1;
      }
      if (a.node!.lastName > b.node!.lastName) {
        return 1;
      }
      return 0;
    })
    .reduce((grouped: Record<string, Array<ProfileEdge>>, profile) => {
      const groupLabel = profile.node!.lastName[0].toUpperCase();
      const group = grouped[groupLabel] || [];
      return {
        ...grouped,
        [groupLabel]: group.concat(profile),
      };
    }, {});
  return (
    <Directory
      filters={[
        {
          id: "offboardedUsers",
          label: "Offboarded",
          value: showOffboardedUsers,
          onChange: (val) => setShowOffboardedUsers(val),
        },
      ]}
      title="Users"
      subtitle={`${profiles.totalCount} users`}
    >
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
  profiles: graphql`
    fragment UserDirectory_profiles on ProfileNodeConnection {
      totalCount
      edges {
        node {
          id
          lastName
          isOffboarded
          ...User_profile
        }
      }
    }
  `,
});
