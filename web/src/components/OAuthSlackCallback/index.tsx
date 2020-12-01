import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type CallbackParameters = {
  code: string;
  state: string;
};

export const LOGIN_MUTATION = gql`
  mutation SlackMutation($code: String!, $state: String!) {
    integrations {
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
  const [errorMessage, setErrorMessage] = useState<string>();
  const [handleCallback] = useMutation<void, CallbackParameters>(
    LOGIN_MUTATION,
    {
      errorPolicy: "all",
    }
  );
  const code = query.get("code");
  const state = query.get("state");

  useEffect(() => {
    if (!code || !state) {
      setErrorMessage("Something went wrong");
    } else {
      handleCallback({ variables: { code, state } });
    }
  }, [handleCallback, code, state]);

  return (
    <div>
      <div>code: {query.get("code")}</div>
      <div>state: {query.get("state")}</div>
      <div>error: {errorMessage}</div>
    </div>
  );
}
