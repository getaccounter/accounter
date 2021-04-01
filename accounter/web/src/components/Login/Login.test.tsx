import React, { ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Login from './';
import userEvent from '@testing-library/user-event';
import AuthProvider from '../../contexts/auth';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { getLoginFailureRequestMocks, getLoginRequestMocks } from '../../contexts/auth.mocks';
import NotificationProvider from '../../contexts/notification';

jest.mock('use-http', () => () => ({ loading: false }));

const Providers = ({ children }: { children: ReactNode }) => (
  <div id="root">
    <AuthProvider>
      <NotificationProvider>
        <MemoryRouter initialEntries={['/login']}>{children}</MemoryRouter>
      </NotificationProvider>
    </AuthProvider>
  </div>
);

test('logs in and reroutes', async () => {
  const email = 'some@user.internet';
  const password = 'somepassword';
  const login = render(
    <MockedProvider mocks={[...getLoginRequestMocks(email, password)]}>
      <Providers>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            Success
          </Route>
        </Switch>
      </Providers>
    </MockedProvider>
  );

  // waits for Login page to be ready
  await waitFor(() => expect(login.getByLabelText('Email address')).not.toHaveAttribute('disabled'));

  const emailInput = login.getByLabelText('Email address');
  const passwordInput = login.getByLabelText('Password');
  const loginButton = login.getByRole('button', { name: 'Sign in' });

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await login.findByText('Success')).toBeInTheDocument();
});

test('renders error message if something goes wrong', async () => {
  const email = 'some@user.internet';
  const password = 'somepassword';
  const errorMessage = 'Your login failed!';
  const login = render(
    <MockedProvider mocks={[...getLoginFailureRequestMocks(email, password, errorMessage)]}>
      <Providers>
        <Login />
      </Providers>
    </MockedProvider>
  );

  // waits for Login page to be ready
  await waitFor(() => expect(login.getByLabelText('Email address')).not.toHaveAttribute('disabled'));

  const emailInput = login.getByLabelText('Email address');
  const passwordInput = login.getByLabelText('Password');
  const loginButton = login.getByRole('button', { name: 'Sign in' });

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect(await login.findByText(errorMessage)).toBeInTheDocument();
});
