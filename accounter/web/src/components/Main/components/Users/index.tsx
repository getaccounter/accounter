import React from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import DetailLayout from '../DetailLayout';
import Content from './components/Content';
import UserDirectory from './components/UserDirectory';
import { UsersQuery } from './__generated__/UsersQuery.graphql';
import { useEnvironment } from '../../../../contexts/relay';
import Loading from '../../../Loading';

const Users = () => {
  const environment = useEnvironment();
  return (
    <QueryRenderer<UsersQuery>
      environment={environment}
      query={graphql`
        query UsersQuery {
          currentUser {
            ...Content_currentUser
            organization {
              profiles(first: 100) @connection(key: "Users_profiles") {
                edges {
                  node {
                    ...Content_profileList
                  }
                }
                ...UserDirectory_profiles
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (error) {
          // catch in ErrorBoundary
          throw error;
        }
        if (!props) {
          return <Loading />;
        }
        return (
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <DetailLayout
              mainColumn={(id) => {
                return (
                  <Content
                    profileId={id}
                    profileList={props.currentUser.organization.profiles.edges.map((edge) => edge!.node!)}
                    currentUser={props.currentUser}
                  />
                );
              }}
              secondaryColumn={() => <UserDirectory profiles={props.currentUser.organization.profiles} />}
            />
          </div>
        );
      }}
    />
  );
};

export default Users;
