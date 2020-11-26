import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const { token, signIn, signInError } = useAuth();
  const location = useLocation();

  const isLoggedOut = !token && !signInError;
  return (
    <div>
      {isLoggedOut ? (
        <>
          <input
            value={usernameInput}
            onChange={(evt) => setUsernameInput(evt.target.value)}
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            value={passwordInput}
            onChange={(evt) => setPasswordInput(evt.target.value)}
            type="password"
            name="password"
            placeholder="password"
            minLength={8}
            required
          />
          <button
            onClick={() => {
              signIn(usernameInput, passwordInput);
            }}
          >
            Login
          </button>
        </>
      ) : signInError ? (
        signInError
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    </div>
  );
}
