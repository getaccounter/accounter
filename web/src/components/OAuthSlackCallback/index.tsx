import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
  const [handleCallback] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
    variables: { code: query.get("code"), state: query.get("state") },
  });

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);
  return (
    <div>
      <div>code: {query.get("code")}</div>
      <div>state: {query.get("state")}</div>
    </div>
  );
}
