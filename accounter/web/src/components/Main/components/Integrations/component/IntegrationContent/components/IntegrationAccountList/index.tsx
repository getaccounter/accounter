import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { IntegrationAccountList_accounts } from "./__generated__/IntegrationAccountList_accounts.graphql";
import React from "react";
import Table from "../../../../../../../Table";
import Badge from "../../../../../../../Badge";

type Props = {
  accounts: IntegrationAccountList_accounts;
};

const IntegrationAccountList = ({ accounts }: Props) => {
  return (
    <Table
      title="Accounts"
      head={[
        {
          value: "name",
          label: "Name",
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
          value: "status",
          label: "Status",
        },
        {
          value: "view",
          label: "View",
          hidden: true,
        },
      ]}
      entries={accounts.map((account) => {
        const fullName = `${account.profile.firstName}${
          account.profile.lastName ? " " + account.profile.lastName : ""
        }`;
        return {
          name: (
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={account.imageSmall}
                    alt={fullName}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {fullName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {account.profile.title}
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
          status: (
            <td className="px-6 py-4 whitespace-nowrap">
              {account.isDisabled ? (
                <Badge color="gray">Disabled</Badge>
              ) : (
                <Badge color="green">Active</Badge>
              )}
            </td>
          ),
          view: (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a
                href={account.externalProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-900"
              >
                View
              </a>
            </td>
          ),
        };
      })}
    />
  );
};

export default createFragmentContainer(IntegrationAccountList, {
  accounts: graphql`
    fragment IntegrationAccountList_accounts on AccountNode
    @relay(plural: true) {
      imageSmall
      isDisabled
      profile {
        firstName
        lastName
        title
      }
      username
      role
      externalProfile
    }
  `,
});
