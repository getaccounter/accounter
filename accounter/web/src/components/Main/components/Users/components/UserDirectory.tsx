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

const getComparerValue = (edge: NonNullable<ProfileEdge>) => {
  if (edge.node!.lastName) {
    return edge.node!.lastName;
  } else if (edge.node!.firstName) {
    return edge.node!.firstName;
  } else {
    return edge.node!.email;
  }
};

const UserDirectory = ({ profiles }: Props) => {
  const [searchString, setSearchString] = useState("");
  const [showDisabledUsers, setShowDisabledUsers] = useState(false);

  const filteredProfiles = profiles.edges
    .filter(
      (edge) =>
        showDisabledUsers || edge!.node!.accounts.some((acc) => !acc.isDisabled)
    )
    .filter((edge) => {
      const node = edge!.node!;
      const lowerCasedSearchString = searchString.toLocaleLowerCase();
      const lowerCasedFirstName = (node.firstName ?? "").toLowerCase();
      const lowerCasedLastName = (node.lastName ?? "").toLowerCase();
      const lowerCasedFullName = `${lowerCasedFirstName} ${lowerCasedLastName}`;
      const lowerCasedEmail = node.email.toLowerCase();

      const matchesFirstName = lowerCasedFirstName.includes(
        lowerCasedSearchString
      );
      const matchesLastName = lowerCasedLastName.includes(
        lowerCasedSearchString
      );
      const matchesFullName = lowerCasedFullName.includes(
        lowerCasedSearchString
      );
      const matchesEmail = lowerCasedEmail.includes(lowerCasedSearchString);

      if (
        !searchString ||
        matchesFirstName ||
        matchesLastName ||
        matchesFullName ||
        matchesEmail
      ) {
        return true;
      }
      return false;
    });
  const groupedUsers = [...filteredProfiles.map((edge) => edge!)]
    .sort((a, b) => {
      if (getComparerValue(a) < getComparerValue(b)) {
        return -1;
      }
      if (getComparerValue(a) > getComparerValue(b)) {
        return 1;
      }
      return 0;
    })
    .reduce((grouped: Record<string, Array<ProfileEdge>>, profile) => {
      const groupLabel = getComparerValue(profile)[0].toUpperCase();
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
          id: "disabled",
          label: "Disabled",
          value: showDisabledUsers,
          onChange: (val) => setShowDisabledUsers(val),
        },
      ]}
      title="Users"
      subtitle={`${profiles.totalCount} users`}
      searchString={searchString}
      onChangeSearchString={setSearchString}
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
          firstName
          email
          accounts {
            isDisabled
          }
          ...User_profile
        }
      }
    }
  `,
});
