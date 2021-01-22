import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'purple' | 'pink'
};

const Badge = ({ children, color }: Props) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${color}-100 text-${color}-800`}>
    {children}
  </span>
);

export default Badge;
