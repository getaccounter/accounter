import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
