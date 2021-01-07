import React, { ReactNode } from "react";
import { PlusCircle } from "../../../../../../icons/outline";

type Props = {
  children: ReactNode;
};
const AddButton = ({ children }: Props) => (
  <button
    type="button"
    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {children}
    <PlusCircle className="ml-2 -mr-0.5 h-4 w-4" />
  </button>
);

export default AddButton;
