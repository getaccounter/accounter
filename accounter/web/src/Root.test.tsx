import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Root from './Root';
import userEvent from '@testing-library/user-event';
import AuthProvider from './contexts/auth';
import { MemoryRouter } from 'react-router-dom';
import { getLoginRequestMocks } from './contexts/auth.mocks';
import NotificationProvider from './contexts/notification';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { Environment } from 'react-relay';
import RelayProvider from './contexts/relay';
import { RelayEnvironmentProvider } from 'relay-hooks';

jest.mock('use-http', () => () => ({ loading: false }));

const Providers = ({ children, environment }: { children: ReactNode; environment: Environment }) => (
  <AuthProvider>
    <RelayEnvironmentProvider environment={environment}>
      <RelayProvider environment={environment}>
        <NotificationProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </NotificationProvider>
      </RelayProvider>
    </RelayEnvironmentProvider>
  </AuthProvider>
);

test('reroutes to login and after reroutes to actual content', async () => {
  const environment = createMockEnvironment();

  environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation));
  const email = 'some@user.internet';
  const password = 'somepassword';
  const root = render(
    <MockedProvider mocks={[...getLoginRequestMocks(email, password)]}>
      <Providers environment={environment}>
        <Root />
      </Providers>
    </MockedProvider>
  );
  expect(await root.findByText('Sign in')).toBeInTheDocument();

  const emailInput = root.getByLabelText('Work Email');
  const passwordInput = root.getByLabelText('Password');
  const loginButton = root.getByRole('button', { name: 'Sign in' });

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(loginButton);

  expect((await root.findAllByRole('navigation', { name: 'Sidebar' }))[0]).toBeInTheDocument();
});
