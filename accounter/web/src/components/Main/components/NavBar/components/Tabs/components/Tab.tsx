import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
  to: string;
};

const Tab = ({ children, to }: Props) => {
  const location = useLocation();
  const isSelected = to === location.pathname;
  const extraClassNames = isSelected
    ? "text-white bg-gray-900"
    : "text-gray-300 hover:text-white hover:bg-gray-700";
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium focus:text-white focus:bg-gray-700 focus:outline-none ${extraClassNames}`}
    >
      {children}
    </Link>
  );
};

export default Tab;
