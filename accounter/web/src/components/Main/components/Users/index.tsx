import React from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DetailLayout from "../DetailLayout";
import Content from "../Content";
import UserDirectory from "./components/UserDirectory";
import { Users_organization } from "./__generated__/Users_organization.graphql";

type Props = {
  organization: Users_organization;
};

const Users = (props: Props) => (
  <div className="flex-1 relative z-0 flex overflow-hidden">
    <DetailLayout
      mainColumn={<Content title="Users" />}
      secondaryColumn={<UserDirectory organization={props.organization} />}
    />
  </div>
);

export default createFragmentContainer(Users, {
  organization: graphql`
    fragment Users_organization on OrganizationNode {
      ...UserDirectory_organization
    }
  `,
});
