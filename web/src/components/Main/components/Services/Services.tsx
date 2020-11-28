import React from "react";
import Content from "../Content";
import Header from "../Header";
import AddMoreServices from "./components/AddMoreServices";

export default function Services() {
  return (
    <div>
      <Header>Services</Header>
      <Content>
        <AddMoreServices />
      </Content>
    </div>
  );
}
