import { createFragmentContainer, commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { AddUsers_organization } from "./__generated__/AddUsers_organization.graphql";
import React, { useState } from "react";
import { useEnvironment } from "../../../../contexts/relay";
import { useHistory } from "react-router-dom";
import { AddUsersMutation } from "./__generated__/AddUsersMutation.graphql";
import { ConnectionHandler } from "relay-runtime";
import UserForm from "../../../UserForm";

const mutation = graphql`
  mutation AddUsersMutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $title: String
    $department: ID
  ) {
    createUser(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        title: $title
        department: $department
      }
    ) {
      profile {
        id
        email
        firstName
        lastName
        title
        department {
          name
        }
      }
    }
  }
`;

type Props = {
  organization: AddUsers_organization;
};

const AddUsers = ({ organization }: Props) => {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <UserForm organization={organization} />
      </div>
    </main>
  );
};

export default createFragmentContainer(AddUsers, {
  organization: graphql`
    fragment AddUsers_organization on OrganizationNode {
      ...UserForm_organization
    }
  `,
});
