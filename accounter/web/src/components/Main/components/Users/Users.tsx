import React from "react";
import Content from "../Content";
import Header from "../Header";
import UserTable from "./components/UserTable";

export default function Users() {
  return (
    <div>
      <Header>Users</Header>
      <Content>
        <UserTable />
      </Content>
    </div>
  );
}
