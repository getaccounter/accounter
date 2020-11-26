import { gql, useMutation } from "@apollo/client";
import React, { createContext, ReactNode, useContext } from "react";

export const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;

export type LoginResponse = {
  tokenAuth: {
    token: string;
    payload: { username: string; exp: number; origIat: number };
    refreshExpiresIn: number;
  };
};

export type LoginParameters = {
  username: string;
  password: string;
};

type AuthContext = {
  token?: string;
  signInError?: string;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

const authContext = createContext<AuthContext>(undefined!);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [login, { data, error }] = useMutation<LoginResponse, LoginParameters>(
    LOGIN_MUTATION,
    {
      errorPolicy: "all",
    }
  );

  const signIn = (username: string, password: string) => {
    login({
      variables: { username, password },
    });
  };
  const signOut = () => "TODO";

  return (
    <authContext.Provider
      children={children}
      value={{
        token: data?.tokenAuth.token,
        signInError: error?.message,
        signIn,
        signOut,
      }}
    />
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
