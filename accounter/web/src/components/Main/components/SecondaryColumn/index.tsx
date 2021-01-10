import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SecondaryColumn = (props: Props) => {
  return (
    <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
      {props.children}
    </aside>
  );
};

export default SecondaryColumn;
