import { createFragmentContainer } from "react-relay";
import IntegrationAccount from "./components/IntegrationAccount";
import graphql from "babel-plugin-relay/macro";
import { IntegrationAccountList_accounts } from "./__generated__/IntegrationAccountList_accounts.graphql";

type Props = {
  accounts: IntegrationAccountList_accounts;
};

const IntegrationAccountList = ({ accounts }: Props) => {
  return (
    <div>
      {/* <h2 className="text-sm font-medium text-gray-500">Accounts</h2> */}
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {accounts.map((account) => (
          <IntegrationAccount key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default createFragmentContainer(IntegrationAccountList, {
  accounts: graphql`
    fragment IntegrationAccountList_accounts on AccountNode
    @relay(plural: true) {
      id
      ...IntegrationAccount_account
    }
  `,
});
