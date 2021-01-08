import React, { ReactNode, ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";


type MenuItemProps = {
    label: ReactNode;
    path: string;
    Icon: ComponentType<{ className: string }>;
    desktop?: boolean;
  };
  
  const MenuItem = (props: MenuItemProps) => {
    const location = useLocation();
    const isSelected = props.path === location.pathname;
    return (
      <Link
        to={props.path}
        className={`rounded-md font-medium px-2 py-2 group flex items-center ${
          props.desktop ? "text-sm" : "text-base"
        } ${
          isSelected
            ? "bg-gray-200 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <props.Icon
          className={`h-6 w-6 ${props.desktop ? "mr-3" : "mr-4"} ${
            isSelected
              ? "text-gray-500"
              : "text-gray-400 group-hover:text-gray-500"
          }`}
        />
        {props.label}
      </Link>
    );
  };

  export default MenuItem