import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import Loading from './Loading';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const { isSignedIn } = useAuth();
  if (isSignedIn === undefined) {
    return <Loading />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
