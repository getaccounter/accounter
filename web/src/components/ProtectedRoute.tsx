import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const { token } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
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
