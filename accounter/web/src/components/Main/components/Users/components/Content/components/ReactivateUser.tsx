import graphql from "babel-plugin-relay/macro";
import React, { useEffect } from "react";
import { commitMutation, createFragmentContainer } from "react-relay";
import { Redirect, useLocation } from "react-router-dom";
import { PayloadError } from "relay-runtime";
import { Environment } from "relay-runtime/lib/store/RelayStoreTypes";
import { useEnvironment } from "../../../../../../../contexts/relay";
import Loading from "../../../../../../Loading";
import {
  ReactivateUserMutationVariables,
  ReactivateUserMutationResponse,
  ReactivateUserMutation,
} from "./__generated__/ReactivateUserMutation.graphql";
import { ReactivateUser_profile } from "./__generated__/ReactivateUser_profile.graphql";

const reactivateUser = (
  environment: Environment,
  variables: ReactivateUserMutationVariables,
  onCompleted: (
    response: ReactivateUserMutationResponse,
    errors?: ReadonlyArray<PayloadError> | null
  ) => void,
  onError: ((error: Error) => void) | null
) => {
  commitMutation<ReactivateUserMutation>(environment, {
    mutation: graphql`
      mutation ReactivateUserMutation($id: ID!) {
        reactivateUser(input: { id: $id }) {
          profile {
            id
            ...Content_profile
          }
        }
      }
    `,
    variables,
    onCompleted,
    onError,
  });
};

type Props = {
  profile: ReactivateUser_profile;
};

const ReactivateUser = ({ profile }: Props) => {
  const environment = useEnvironment();
  const location = useLocation();
  useEffect(() => {
    const variables = {
      id: profile!.id,
    };

    reactivateUser(
      environment,
      variables,
      (response, errors) => {
        if (errors) {
          console.error(errors);
        }
      },
      (err) => console.error(err)
    );
  });
  return !profile.isOffboarded ? (
    <Loading />
  ) : (
    <Redirect
      to={{
        pathname: `/users/details/${profile.id}`,
        state: { from: location },
      }}
    />
  );
};

export default createFragmentContainer(ReactivateUser, {
  profile: graphql`
    fragment ReactivateUser_profile on ProfileNode {
      id
      isOffboarded
    }
  `,
});
