/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Tab from "./components/Tab";

type Props = {
  value: Array<{
    label: string;
    to: string;
  }>;
};

const Tabs = ({ value }: Props) => (
  <div className="hidden md:block">
    <div className="ml-10 flex items-baseline space-x-4">
      {value.map(({ label, to }) => (
        <Tab key={label} to={to}>
          {label}
        </Tab>
      ))}
    </div>
  </div>
);

export default Tabs;
