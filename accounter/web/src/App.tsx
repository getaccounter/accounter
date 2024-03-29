import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_ENDPOINT } from './config';
import Root from './Root';
import { setContext } from '@apollo/client/link/context';
import { getCSRFCookie, useCSRFCookie } from './utils/csrf';
import NotificationProvider from './contexts/notification';
import RelayProvider from './contexts/relay';
import environment from './relay-env';
import ErrorBoundary from './components/Main/components/ErrorBoundary';
import { RelayEnvironmentProvider } from 'relay-hooks';
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-CSRFToken': getCSRFCookie()
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  const { token: csrfToken } = useCSRFCookie();
  return csrfToken ? (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AuthProvider>
          <RelayEnvironmentProvider environment={environment}>
            <RelayProvider environment={environment}>
              <Router>
                <NotificationProvider>
                  <Root />
                </NotificationProvider>
              </Router>
            </RelayProvider>
          </RelayEnvironmentProvider>
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  ) : null;
}
