import React from "react";
import Content from "../Content";
import Header from "../Header";
import ServiceTable from "./components/ServiceTable";

export default function Services() {
  return (
    <div>
      <Header>Services</Header>
      <Content>
        <ServiceTable />
      </Content>
    </div>
  );
}
