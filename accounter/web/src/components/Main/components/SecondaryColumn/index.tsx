import { ReactNode } from "react";

type Props = {
  showOnMobile: boolean;
  children: ReactNode;
};

const SecondaryColumn = (props: Props) => {
  const className = `${props.showOnMobile ? "" : "hidden"} w-full xl:order-first xl:flex xl:flex-col flex-shrink-0 xl:w-96 border-r border-gray-200`
  return (
    <aside className={className}>
      {props.children}
    </aside>
  );
};

export default SecondaryColumn;
