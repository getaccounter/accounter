import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useNotifications } from "../../contexts/notification";
import LogoSquare from "../branding/LogoSquare";
import { LockClosedIcon } from "@heroicons/react/solid";


export default function Login() {
  const { addNotification } = useNotifications();
  const { isSignedIn, signIn, signInError } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    if (signInError) {
      addNotification({
        type: "error",
        title: "Login Failed",
        content: signInError,
      });
    }
  }, [signInError, addNotification]);

  const location = useLocation();
  const isSigningIn = isSignedIn === undefined;

  return !isSignedIn ? (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <LogoSquare className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                to="/signup"
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
              signIn(emailInput, passwordInput);
            }}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={emailInput}
                  onChange={(evt) => setEmailInput(evt.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  disabled={isSigningIn}
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
                  disabled={isSigningIn}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSigningIn}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {isSignedIn ? "Signing in..." : "Sign in"}
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
