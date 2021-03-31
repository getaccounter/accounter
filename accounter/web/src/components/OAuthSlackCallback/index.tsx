import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import Loading from '../Loading';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type CallbackResponse = {
  oauth: {
    slack: {
      handleCallback?: {
        status: 'success';
      };
    };
  };
};

type Service = 'SLACK' | 'GOOGLE';

type CallbackParameters = {
  service: Service;
  code: string;
  state: string;
};

export const LOGIN_MUTATION = gql`
  mutation SlackMutation($service: Types!, $code: String!, $state: String!) {
    oauth {
      slack {
        handleCallback(service: $service, code: $code, state: $state) {
          status
        }
      }
    }
  }
`;

export default function OAuthSlackCallback() {
  const params = useParams<{ service: string }>();
  const service = params.service.toUpperCase() as Service;
  const query = useQuery();
  const [handleCallback, { data, error }] = useMutation<CallbackResponse, CallbackParameters>(LOGIN_MUTATION, {
    errorPolicy: 'all'
  });
  const code = query.get('code') || query.get('installation_id');
  const state = query.get('state');

  useEffect(() => {
    if (!code || error?.message) {
    } else {
      handleCallback({ variables: { service, code, state: state ?? '' } });
    }
  }, [handleCallback, code, state, error, service]);
  const location = useLocation();

  return data?.oauth.slack.handleCallback?.status === 'success' ? (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location }
      }}
    />
  ) : error ? (
    <div className="flex flex-col items-center ">
      <div className="flex justify-center height h-full">
        <h1>Something went wrong. Please try again. If the issue still persists, please contact us.</h1>
      </div>
      <Link to="/">
        <button
          type="button"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go back
        </button>
      </Link>
    </div>
  ) : (
    <Loading />
  );
}
