import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Content = (props: Props) => (
  <main
    className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
    tabIndex={0}
  >
    {props.children}
  </main>
);

export default Content;
