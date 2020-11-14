import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;

function App() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
  });

  const isLoggedOut = !data && !error;

  return isLoggedOut ? (
    <div>
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
          login({
            variables: { username: usernameInput, password: passwordInput },
          });
        }}
      >
        Login
      </button>
    </div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <div>Logged in!</div>
  );
}

export default App;
