import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import React from "react";
import EntryCard from "../../../../../../EntryCard";
import { IntegrationAccount_account } from "./__generated__/IntegrationAccount_account.graphql";

type Props = {
  account: IntegrationAccount_account;
};

const IntegrationAccount = ({ account }: Props) => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <EntryCard
        to="/"
        imgSrc={account.image}
        secondary={`@${account.username}`}
      >
        {account.profile.firstName} {account.profile.lastName}
      </EntryCard>
    </div>
  );
};

export default createFragmentContainer(IntegrationAccount, {
  account: graphql`
    fragment IntegrationAccount_account on AccountInterface {
      image
      profile {
        firstName
        lastName
      }
      username
    }
  `,
});
