import React, { ReactNode } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import IntegrationContentHeader from "./components/IntegrationContentHeader";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import Breadcrumb from "../../../Breadcrumb";
import { IntegrationContent_integration } from "./__generated__/IntegrationContent_integration.graphql";
import IntegrationAccountList from "./components/IntegrationAccountList";

const Tab = (props: { children: ReactNode; to: string }) => {
  const { pathname } = useLocation();
  const isSelected = props.to === pathname;

  const sharedClassNames =
    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm";
  const selectedClassNames = "border-pink-500 text-gray-900";
  const unSelectedClassNames =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
  return (
    <Link
      to={props.to}
      className={`${
        isSelected ? selectedClassNames : unSelectedClassNames
      } ${sharedClassNames}`}
    >
      {props.children}
    </Link>
  );
};

const Tabs = () => {
  const { url } = useRouteMatch();
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <Tab to={`${url}/apps`}>Accounts</Tab>
          </nav>
        </div>
      </div>
    </div>
  );
};

type Props = {
  integration: IntegrationContent_integration;
};

const IntegrationContent = ({ integration }: Props) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route>
        <Breadcrumb title="Apps" to="/integrations" />
        <article>
          <IntegrationContentHeader integration={integration} />
          <Tabs />
          <div className="mt-6 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Switch>
              <Route path={`${path}/apps`}>
                <IntegrationAccountList accounts={integration.accounts} />
              </Route>
              <Route>
                <Redirect to={`${url}/apps`} />
              </Route>
            </Switch>
          </div>
        </article>
      </Route>
    </Switch>
  );
};

export default createFragmentContainer(IntegrationContent, {
  integration: graphql`
    fragment IntegrationContent_integration on IntegrationNode {
      name
      ...IntegrationContentHeader_integration
      accounts {
        ...IntegrationAccountList_accounts
      }
    }
  `,
});
