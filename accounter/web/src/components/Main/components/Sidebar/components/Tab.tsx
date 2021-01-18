import React, { ReactNode, ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";

export type TabType = {
  label: ReactNode;
  path: string;
  Icon: ComponentType<{ className: string }>;
};

type TabProps = {
  tab: TabType;
  desktop?: boolean;
};

const Tab = (props: TabProps) => {
  const { pathname } = useLocation();
  const isSelected = props.tab.path === pathname;
  return (
    <Link
      to={props.tab.path}
      className={`rounded-md font-medium px-2 py-2 group flex items-center ${
        props.desktop ? "text-sm" : "text-base"
      } ${
        isSelected
          ? "bg-gray-200 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <props.tab.Icon
        className={`h-6 w-6 ${props.desktop ? "mr-3" : "mr-4"} ${
          isSelected
            ? "text-gray-500"
            : "text-gray-400 group-hover:text-gray-500"
        }`}
      />
      {props.tab.label}
    </Link>
  );
};

export default Tab;
