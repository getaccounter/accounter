import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Account_account } from "./__generated__/Account_account.graphql";

type Props = {
  account: Account_account;
};

const Account = ({ account }: Props) => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={account.integration.service.logo}
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            @{account.username}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {account.integration.service.name} - {account.integration.name}
          </p>
        </a>
      </div>
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
