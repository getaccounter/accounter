import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Redirect, useLocation } from "react-router-dom";
import Loading from "../Loading";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type CallbackResponse = {
  oauth: {
    slack: {
      handleCallback?: {
        status: "success";
      };
    };
  };
};

type CallbackParameters = {
  code: string;
  state: string;
};

export const LOGIN_MUTATION = gql`
  mutation SlackMutation($code: String!, $state: String!) {
    oauth {
      slack {
        handleCallback(code: $code, state: $state) {
          status
        }
      }
    }
  }
`;

export default function OAuthSlackCallback() {
  const query = useQuery();
  const [handleCallback, { data, error }] = useMutation<
    CallbackResponse,
    CallbackParameters
  >(LOGIN_MUTATION, {
    errorPolicy: "all",
  });
  const code = query.get("code");
  const state = query.get("state");

  useEffect(() => {
    if (!code || !state || error?.message) {

    } else {
      handleCallback({ variables: { code, state } });
    }
  }, [handleCallback, code, state, error]);
  const location = useLocation();

  return data?.oauth.slack.handleCallback?.status === "success" ? (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : (
    <Loading />
  );
}
