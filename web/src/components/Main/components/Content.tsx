import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Content = ({ children }: Props) => (
  <main>
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="rounded-lg h-96">{children}</div>
      </div>
    </div>
  </main>
);

export default Content;
