import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useCSRFCookie } from "../../utils/csrf";
import Notifications from "../Notifications";
import { LockClosed } from "../icons/solid";

export default function Login() {
  useCSRFCookie();
  const { isLoggedIn, signIn, signInError } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [supressError, setSupressError] = useState(false);

  useEffect(() => {
    setSupressError(false);
  }, [signInError]);

  const location = useLocation();
  return !isLoggedIn ? (
    <>
      {signInError && !supressError && (
        <Notifications
          onClose={() => setSupressError(true)}
          type="error"
          headline="Login Failed"
        >
          {signInError}
        </Notifications>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                to="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                register
              </Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(usernameInput, passwordInput);
            }}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={usernameInput}
                  onChange={(evt) => setUsernameInput(evt.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={passwordInput}
                  onChange={(evt) => setPasswordInput(evt.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
}
