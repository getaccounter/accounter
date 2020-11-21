/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import MobileProfile from "./components/MobileProfile";
import MobileTab from "./components/MobileTab";

type Props = {
  tabs: Array<{
    label: string;
    to: string;
  }>;
};

const MobileMenu = ({ tabs }: Props) => (
  <div>
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {tabs.map(({ label, to }) => (
        <MobileTab key={label} to={to}>
          {label}
        </MobileTab>
      ))}
    </div>
    <MobileProfile />
  </div>
);

export default MobileMenu;
