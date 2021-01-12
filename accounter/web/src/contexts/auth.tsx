import { gql, useMutation, useQuery } from "@apollo/client";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

export const SESSION_INFO_QUERY = gql`
  query SessionInfo {
    sessionInfo {
      signedIn
    }
  }
`;

export type SessionInfoQueryResponse = {
  sessionInfo: {
    signedIn: boolean;
  };
};

export type VerificationParameters = void;

const useIsSignedIn = () => {
  const { refetch, data, loading } = useQuery<SessionInfoQueryResponse>(
    SESSION_INFO_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  const isSignedIn = !loading ? data?.sessionInfo.signedIn : undefined;
  return { recheck: refetch, isSignedIn };
};

export const LOGIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      status
      message
    }
  }
`;

export type LoginResponse = {
  signin: {
    status: "success";
    message: string;
  };
};

export type LoginParameters = {
  email: string;
  password: string;
};

const authContext = createContext<{
  isSignedIn?: boolean;
  signInError?: string;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}>(undefined!);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [login, { data, error }] = useMutation<LoginResponse, LoginParameters>(
    LOGIN_MUTATION,
    {
      errorPolicy: "all",
      onError: () => undefined,
    }
  );

  const { recheck, isSignedIn } = useIsSignedIn();

  useEffect(() => {
    recheck();
  }, [recheck, data]);

  const signIn = (email: string, password: string) => {
    login({
      variables: { email, password },
    });
  };
  const signOut = () => "TODO";

  return (
    <authContext.Provider
      children={children}
      value={{
        isSignedIn,
        signInError: error && error.message,
        signIn,
        signOut,
      }}
    />
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
