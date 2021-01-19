import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import Loading from "../Loading";

export default function Logout() {
  const { signOut, isSignedIn } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  const location = useLocation();

  return isSignedIn ? (
    <Loading />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
}
