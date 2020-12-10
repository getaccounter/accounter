import React from "react";
import Content from "../Content";
import Header from "../Header";
import AddMoreServices from "./components/AddMoreServices";
import Integrations from "./components/Integrations";

export default function Services() {
  return (
    <div>
      <Header>Services</Header>
      <Content>
        <Integrations />
        <AddMoreServices />
      </Content>
    </div>
  );
}
