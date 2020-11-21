import React from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

export default function NewApp() {
  return (
    <div>
      <NavBar />
      <Header />
      <Content />
    </div>
  );
}
