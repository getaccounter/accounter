import { createFragmentContainer } from "react-relay";
import Account from "./components/Account";
import graphql from "babel-plugin-relay/macro";
import { AccountList_accounts } from "./__generated__/AccountList_accounts.graphql";

type Props = {
  accounts: AccountList_accounts;
};

const AccountList = ({ accounts }: Props) => {
  return (
    <div>
      {/* <h2 className="text-sm font-medium text-gray-500">Accounts</h2> */}
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default createFragmentContainer(AccountList, {
  accounts: graphql`
    fragment AccountList_accounts on AccountInterface @relay(plural: true) {
      id
      ...Account_account
    }
  `,
});
