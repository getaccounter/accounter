import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { CheckCircle, XCircle, X } from "../../../../components/icons/outline";

// TODO
/*animate entering and leaving:
       Entering: "transform ease-out duration-300 transition"
    From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    To: "translate-y-0 opacity-100 sm:translate-x-0"
        Leaving: "transition ease-in duration-100"
    From: "opacity-100"
    To: "opacity-0"
    */

export type Type = "success" | "error";

type Props = {
  type: Type;
  headline: ReactNode;
  children: ReactNode;
  onClose: () => void;
};

const Notifications = ({ type, headline, onClose, children }: Props) => {
  return ReactDOM.createPortal(
    <>
      <div
        role="alert"
        className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
      >
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{headline}</p>
                <p className="mt-1 text-sm text-gray-500">{children}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => onClose()}
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("root")!
  );
};

export default Notifications;
