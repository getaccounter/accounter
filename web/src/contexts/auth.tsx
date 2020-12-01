import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import React, { createContext, ReactNode, useContext } from "react";

const isTokenStillValid = (expiry: number) => {
  return Date.now() < expiry * 1000;
};

export const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyToken {
    verifyToken {
      payload
    }
  }
`;

export type Payload = {
  username: string;
  exp: number;
  origIat: number;
};

export type VerificationResponse = {
  verifyToken: {
    payload: Payload;
  };
};

export type VerificationParameters = void;

const useIsLoggedIn = () => {
  const [verify, { data, called, loading }] = useMutation<
    VerificationResponse,
    VerificationParameters
  >(VERIFY_TOKEN_MUTATION, {
    errorPolicy: "all",
    onError: () => undefined,
  });

  const expiry = data?.verifyToken?.payload.exp;

  // if it wasnt determined if user is logged in or not, it's set to undefined
  const isLoggedIn =
    called && !loading ? !!expiry && isTokenStillValid(expiry) : undefined;
  return [verify, isLoggedIn] as [() => void, typeof isLoggedIn];
};

export const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      payload
      refreshExpiresIn
    }
  }
`;

export type LoginResponse = {
  tokenAuth: {
    payload: Payload;
    refreshExpiresIn: number;
  };
};

export type LoginParameters = {
  username: string;
  password: string;
};

const authContext = createContext<{
  isLoggedIn?: boolean;
  signInError?: string;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}>(undefined!);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [login, loginResponse] = useMutation<LoginResponse, LoginParameters>(
    LOGIN_MUTATION,
    {
      errorPolicy: "all",
      onError: () => undefined,
    }
  );

  const [checkIsLoggedIn, isLoggedIn] = useIsLoggedIn();

  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn, loginResponse.data?.tokenAuth]);

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
        isLoggedIn,
        signInError: loginResponse.error?.message,
        signIn,
        signOut,
      }}
    />
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
