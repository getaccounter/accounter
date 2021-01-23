import graphql from "babel-plugin-relay/macro";
import React, { useEffect } from "react";
import { commitMutation, createFragmentContainer } from "react-relay";
import { Redirect, useLocation } from "react-router-dom";
import { PayloadError } from "relay-runtime";
import { Environment } from "relay-runtime/lib/store/RelayStoreTypes";
import { useEnvironment } from "../../../../../contexts/relay";
import Loading from "../../../../Loading";
import {
  OffboardUserMutationVariables,
  OffboardUserMutationResponse,
  OffboardUserMutation,
} from "./__generated__/OffboardUserMutation.graphql";
import { OffboardUser_profile } from "./__generated__/OffboardUser_profile.graphql";

const offboardUser = (
  environment: Environment,
  variables: OffboardUserMutationVariables,
  onCompleted: (
    response: OffboardUserMutationResponse,
    errors?: ReadonlyArray<PayloadError> | null
  ) => void,
  onError: ((error: Error) => void) | null
) => {
  commitMutation<OffboardUserMutation>(environment, {
    mutation: graphql`
      mutation OffboardUserMutation($id: ID!) {
        offboardUser(input: { id: $id }) {
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
  profile: OffboardUser_profile;
};

const OffboardUser = ({ profile }: Props) => {
  const environment = useEnvironment();
  const location = useLocation();
  useEffect(() => {
    const variables = {
      id: profile!.id,
    };

    offboardUser(
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

export default createFragmentContainer(OffboardUser, {
  profile: graphql`
    fragment OffboardUser_profile on ProfileNode {
      id
      isOffboarded
    }
  `,
});
