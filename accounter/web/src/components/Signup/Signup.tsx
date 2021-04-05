import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useNotifications } from '../../contexts/notification';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useAuth } from '../../contexts/auth';
import LogoSquare from '../branding/LogoSquare';

export const SIGNUP_MUTATION = gql`
  mutation Signup($orgName: String!, $email: String!, $password: String!) {
    signup(orgName: $orgName, email: $email, password: $password) {
      status
    }
  }
`;

type SignupResponse = {
  signup?: {
    status: 'success' | 'error';
  };
};

type SignupParameters = {
  orgName: string;
  email: string;
  password: string;
};

const Signup = () => {
  const { addNotification } = useNotifications();
  const location = useLocation();
  const [signup, { data: signupResponse, error, loading }] = useMutation<SignupResponse, SignupParameters>(
    SIGNUP_MUTATION,
    {
      errorPolicy: 'all',
      onError: () => undefined
    }
  );
  const [orgNameInput, setOrgNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    if (error) {
      addNotification({
        type: 'error',
        title: 'Signup Failed',
        content: 'Something went wrong. We could not register this account'
      });
    }
  }, [error, addNotification]);

  return signupResponse?.signup?.status === 'success' ? (
    <Redirect
      to={{
        pathname: '/onboarding/basic',
        state: { from: location }
      }}
    />
  ) : (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LogoSquare className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Accounter</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              signup({
                variables: {
                  orgName: orgNameInput,
                  email: emailInput,
                  password: passwordInput
                }
              });
            }}
          >
            <div>
              <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="mt-1">
                <input
                  value={orgNameInput}
                  onChange={(evt) => setOrgNameInput(evt.target.value)}
                  id="org-name"
                  name="org_name"
                  type="text"
                  autoComplete="organization"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <div className="mt-1">
                <input
                  value={emailInput}
                  onChange={(evt) => setEmailInput(evt.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  value={passwordInput}
                  onChange={(evt) => setPasswordInput(evt.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have account?</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/login" className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
