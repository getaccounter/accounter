import { createFragmentContainer } from "react-relay";
import AccountList from "./components/AccountList";
import graphql from "babel-plugin-relay/macro";
import { Accounts_profile } from "./__generated__/Accounts_profile.graphql";

type Props = {
  profile: Accounts_profile;
};

const Accounts = ({ profile }: Props) => {
  return <AccountList accounts={profile.accounts} />;
};

export default createFragmentContainer(Accounts, {
  profile: graphql`
    fragment Accounts_profile on ProfileNode {
      accounts {
        ...AccountList_accounts
      }
    }
  `,
});
