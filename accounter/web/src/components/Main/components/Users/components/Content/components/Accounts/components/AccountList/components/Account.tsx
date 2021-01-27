import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Account_account } from "./__generated__/Account_account.graphql";
import React from "react";
import EntryCard from "../../../../../../../../EntryCard";

type Props = {
  account: Account_account;
};

const Account = ({ account }: Props) => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <EntryCard
        to="/"
        imgSrc={account.integration.service.logo}
        secondary={`${account.integration.service.name} - ${account.integration.name}`}
      >
        @{account.username}
      </EntryCard>
    </div>
  );
};

export default createFragmentContainer(Account, {
  account: graphql`
    fragment Account_account on AccountInterface {
      id
      integration {
        name
        service {
          name
          logo
        }
      }
      ... on SlackAccountNode {
        username
        email
      }
    }
  `,
});
