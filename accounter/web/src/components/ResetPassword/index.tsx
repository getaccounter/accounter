import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useNotifications } from '../../contexts/notification';
import { LockClosedIcon } from '@heroicons/react/solid';
import graphql from 'babel-plugin-relay/macro';

import { commitMutation, Environment } from 'react-relay';
import {
  ResetPasswordMutation,
  ResetPasswordMutationResponse,
  ResetPasswordMutationVariables
} from './__generated__/ResetPasswordMutation.graphql';
import { PayloadError } from 'relay-runtime';
import { useEnvironment } from '../../contexts/relay';
import { useQueryString } from '../../utils/querystring';

const resetPassword = (
  environment: Environment,
  variables: ResetPasswordMutationVariables,
  onCompleted: (response: ResetPasswordMutationResponse, errors?: ReadonlyArray<PayloadError> | null) => void,
  onError: (error: PayloadError) => void
) => {
  commitMutation<ResetPasswordMutation>(environment, {
    mutation: graphql`
      mutation ResetPasswordMutation($username: String!, $token: String!, $password: String!) {
        resetPassword(username: $username, token: $token, password: $password) {
          status
        }
      }
    `,
    variables,
    onCompleted,
    onError
  });
};

const ResetPassword = () => {
  const location = useLocation();
  const token = useQueryString('token');
  const username = useQueryString('username');
  const environment = useEnvironment();
  const history = useHistory();
  const { addNotification } = useNotifications();
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');

  return !(token && username) ? (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location }
      }}
    />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const variables = {
              username,
              token,
              password: passwordInput
            };
            resetPassword(
              environment,
              variables,
              (response, errors) => {
                if (errors) {
                  addNotification({
                    type: 'error',
                    title: 'Something went wrong',
                    content: 'Setting password failed'
                  });
                } else {
                  history.push('/login');
                }
              },
              (err) =>
                addNotification({
                  type: 'error',
                  title: 'Something went wrong',
                  content: 'Setting password failed'
                })
            );
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={passwordInput}
                minLength={8}
                onChange={(evt) => setPasswordInput(evt.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password-confirmation" className="sr-only">
                Password Confirmation
              </label>
              <input
                value={passwordConfirmationInput}
                title="Must match the password."
                pattern={passwordInput}
                onChange={(evt) => setPasswordConfirmationInput(evt.target.value)}
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Set password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
