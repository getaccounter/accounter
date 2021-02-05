import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router-dom";
import { User_profile } from "./__generated__/User_profile.graphql";
import Badge from "../../../../../Badge";
import React from "react";
import EntryCard from "../../../EntryCard";

type Props = {
  profile: User_profile;
};

const User = ({ profile }: Props) => {
  const { url } = useRouteMatch();
  return (
    <EntryCard
      to={`${url}/details/${profile.id}`}
      imgSrc={profile.image}
      secondary={profile.title}
      rightSide={
        <>
          {profile.isOwner ? (
            <Badge color="blue">Owner</Badge>
          ) : (
            profile.isAdmin && <Badge color="blue">Admin</Badge>
          )}
        </>
      }
    >
      {profile.firstName} {profile.lastName}
    </EntryCard>
  );
};

export default createFragmentContainer(User, {
  profile: graphql`
    fragment User_profile on ProfileNode {
      id
      image
      firstName
      lastName
      title
      isAdmin
      isOwner
    }
  `,
});
