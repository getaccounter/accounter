import React, { ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: Props) => (
  <Sentry.ErrorBoundary
    fallback={
      <div className="flex flex-col items-center ">
        <div className="flex justify-center height h-full">
          <h1>
            Something went wrong. Please try again. If the issue still persists,
            please contact us.
          </h1>
        </div>
        <a href="/">
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back
          </button>
        </a>
      </div>
    }
    showDialog
  >
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
