import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Accounts_profile } from "./__generated__/Accounts_profile.graphql";
import React from "react";
import Table from "../../../../../../../Table";

type Props = {
  profile: Accounts_profile;
};

const Accounts = ({ profile }: Props) => {
  return (
    <>
      <Table
        title="Accounts"
        head={[
          {
            value: "app",
            label: "App",
          },
          {
            value: "username",
            label: "Username",
          },
          {
            value: "role",
            label: "Role",
          },
          {
            value: "edit",
            label: "Edit",
            hidden: true,
          },
        ]}
        entries={profile.accounts.map((account) => ({
          app: (
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={account.integration.service.logo}
                    alt={account.integration.service.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {account.integration.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {account.integration.service.name}
                  </div>
                </div>
              </div>
            </td>
          ),
          username: (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {account.username}
            </td>
          ),
          role: (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {account.role}
            </td>
          ),
          edit: (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#asd" className="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
            </td>
          ),
        }))}
      />
    </>
  );
};
export default createFragmentContainer(Accounts, {
  profile: graphql`
    fragment Accounts_profile on ProfileNode {
      accounts {
        id
        integration {
          name
          service {
            name
            logo
          }
        }
        username
        role
      }
    }
  `,
});
