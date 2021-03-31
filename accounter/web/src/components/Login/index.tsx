import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { useNotifications } from '../../contexts/notification';
import LogoSquare from '../branding/LogoSquare';
import { LockClosedIcon } from '@heroicons/react/solid';

export default function Login() {
  const { addNotification } = useNotifications();
  const { isSignedIn, signIn, signInError } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    if (signInError) {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        content: signInError
      });
    }
  }, [signInError, addNotification]);

  const location = useLocation();
  const isSigningIn = isSignedIn === undefined;

  return !isSignedIn ? (
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
              signIn(emailInput, passwordInput);
            }}
          >
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
                  disabled={isSigningIn}
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
                  disabled={isSigningIn}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSigningIn}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {isSignedIn ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/signup" className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location }
      }}
    />
  );
}
