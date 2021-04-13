import { gql, useMutation, useQuery } from '@apollo/client';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';

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
  const { refetch, data, loading } = useQuery<SessionInfoQueryResponse>(SESSION_INFO_QUERY, {
    notifyOnNetworkStatusChange: true
  });
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
    status: 'success';
    message: string;
  };
};

export type LoginParameters = {
  email: string;
  password: string;
};

export const SIGNUP_MUTATION = gql`
  mutation Signup($orgName: String!, $email: String!, $password: String!) {
    signup(orgName: $orgName, email: $email, password: $password) {
      status
    }
  }
`;

type SignupResponse = {
  signup: {
    status: 'success' | 'error';
    message: string
  };
};

type SignupParameters = {
  orgName: string;
  email: string;
  password: string;
};

export const LOGOUT_MUTATION = gql`
  mutation Signout {
    signout {
      status
      message
    }
  }
`;

export type LogoutResponse = {
  signin: {
    status: 'success';
    message: string;
  };
};

export type LogoutParameters = {};

const authContext = createContext<{
  isSignedIn?: boolean;
  isSigningIn?: boolean;
  isSigningUp?: boolean;
  signInError?: string;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, orgName: string) => void;
  signUpError?: string,
  signOut: () => void;
}>(undefined!);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [login, { data: loginData, error: loginError, loading: isSigningIn }] = useMutation<LoginResponse, LoginParameters>(LOGIN_MUTATION, {
    errorPolicy: 'all',
    onError: () => undefined
  });
  const [signup, { data: signupData, error: signUpError, loading: isSigningUp }] = useMutation<SignupResponse, SignupParameters>(
    SIGNUP_MUTATION,
    {
      errorPolicy: 'all',
      onError: () => undefined
    }
  );
  const [logout, { data: logoutData }] = useMutation<LoginResponse, LoginParameters>(LOGOUT_MUTATION, {
    errorPolicy: 'all',
    onError: () => undefined
  });

  const { recheck, isSignedIn } = useIsSignedIn();

  useEffect(() => {
    setTimeout(() => {
      // stupid dumb hack, but for some reason sometimes it takes a bit for
      // the browser to set the cookie in time
      recheck();
    }, 100);
  }, [recheck, loginData, signupData, logoutData]);

  const signIn = (email: string, password: string) => {
    login({
      variables: { email, password }
    });
  };

  const signUp = (email: string, password: string, orgName: string) => {
    signup({
      variables: { email, password, orgName }
    });
  };

  const signOut = () => {
    logout();
  };

  return (
    <authContext.Provider
      children={children}
      value={{
        isSignedIn,
        isSigningIn,
        isSigningUp,
        signInError: loginError && loginError.message,
        signUpError: signUpError && signUpError.message,
        signIn,
        signUp,
        signOut
      }}
    />
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
