import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useNotifications } from "../../contexts/notification";
import { LockClosed } from "../icons/solid";

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $orgName: String!, $password: String!) {
    signup(email: $email, orgName: $orgName, password: $password) {
      status
    }
  }
`;

type SignupResponse = {
  signup?: {
    status: "success" | "error";
  };
};

type SignupParameters = {
  email: string;
  orgName: string;
  password: string;
};

const Signup = () => {
  const { addNotification } = useNotifications();
  const location = useLocation();
  const [signup, { data: signupResponse, error, loading }] = useMutation<
    SignupResponse,
    SignupParameters
  >(SIGNUP_MUTATION, {
    errorPolicy: "all",
    onError: () => undefined,
  });
  const [organizationNameInput, setOrganizationNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    if (error) {
      addNotification({
        type: "error",
        title: "Signup Failed",
        content: "Something went wrong. We could not register this account",
      });
    }
  }, [error, addNotification]);
  return signupResponse?.signup?.status === "success" ? (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            signup({
              variables: {
                email: emailInput,
                orgName: organizationNameInput,
                password: passwordInput,
              },
            });
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="org-name" className="sr-only">
                Org name
              </label>
              <input
                value={organizationNameInput}
                onChange={(evt) => setOrganizationNameInput(evt.target.value)}
                id="org-name"
                name="text"
                type="text"
                autoComplete="organization"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Organization name"
                disabled={loading}
              />
            </div>
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
