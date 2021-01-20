import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Badge = ({ children }: Props) => (
  <span className="inline-flex items-center ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
    {children}
  </span>
);

export default Badge;
