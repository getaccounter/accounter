import React from "react";
import graphql from "babel-plugin-relay/macro";
import DetailLayout from "../DetailLayout";
import Content from "./components/Content";
import UserDirectory from "./components/UserDirectory";
import { UsersQuery } from "./__generated__/UsersQuery.graphql";
import Loading from "../../../Loading";
import { useQuery } from "relay-hooks";

const Users = () => {
  const { data, isLoading } = useQuery<UsersQuery>(graphql`
    
  query UsersQuery {
    currentUser {
      ...Content_currentUser
      organization {
        profiles(first: 100) @connection(key: "Users_profiles") {
          edges {
            node {
              id
              ...Content_profile
            }
          }
          ...UserDirectory_profiles
        }
      }
    }
  }
  `)
  if (!data || isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <DetailLayout
        mainColumn={(id) => {
          const profile = data.currentUser.organization.profiles.edges.find(
            (p) => p!.node!.id === id
          );
          return (
            <Content
              title="Users"
              profile={profile!.node!}
              currentUser={data.currentUser}
            />
          );
        }}
        secondaryColumn={() => (
          <UserDirectory
            profiles={data.currentUser.organization.profiles}
          />
        )}
      />
    </div>
  );
};

export default Users;
