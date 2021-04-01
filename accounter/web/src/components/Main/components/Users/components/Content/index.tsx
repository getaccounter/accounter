import React, { ReactNode } from 'react';
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Header from './components/Header';
import { createFragmentContainer, QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import DescriptionList from './components/DescriptionList';
import EditUser from './components/EditUser';
import { Content_currentUser } from './__generated__/Content_currentUser.graphql';
import Accounts from './components/Accounts';
import Breadcrumb from '../../../Breadcrumb';
import { Content_profileList } from './__generated__/Content_profileList.graphql';
import { useEnvironment } from '../../../../../../contexts/relay';
import Loading from '../../../../../Loading';
import { ContentQuery } from './__generated__/ContentQuery.graphql';

const Tab = (props: { children: ReactNode; to: string }) => {
  const { pathname } = useLocation();
  const isSelected = props.to === pathname;

  const sharedClassNames = 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm';
  const selectedClassNames = 'border-pink-500 text-gray-900';
  const unSelectedClassNames = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  return (
    <Link to={props.to} className={`${isSelected ? selectedClassNames : unSelectedClassNames} ${sharedClassNames}`}>
      {props.children}
    </Link>
  );
};

const Tabs = () => {
  const { url } = useRouteMatch();
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <Tab to={`${url}/profile`}>Profile</Tab>
            <Tab to={`${url}/apps`}>Accounts</Tab>
          </nav>
        </div>
      </div>
    </div>
  );
};

graphql`
  fragment Content_profile on ProfileNode {
    ...Header_profile
    ...DescriptionList_profile
    ...EditUser_profile
    ...Accounts_profile
  }
`;

type Props = {
  profileId: string;
  currentUser: Content_currentUser;
  profileList: Content_profileList;
};

const Content = ({ currentUser, profileList, profileId }: Props) => {
  const { path, url } = useRouteMatch();
  const environment = useEnvironment();
  return (
    <QueryRenderer<ContentQuery>
      environment={environment}
      query={graphql`
        query ContentQuery($profileId: ID!) {
          currentUser {
            organization {
              profile(id: $profileId) {
                ...Content_profile @relay(mask: false)
              }
            }
          }
        }
      `}
      variables={{
        profileId
      }}
      render={({ props, error }) => {
        if (error) {
          // catch in ErrorBoundary
          throw error;
        }
        if (!props) {
          return <Loading />;
        }
        const profile = props.currentUser.organization.profile!;
        return (
          <Switch>
            <Route path={`${path}/edit`}>
              <EditUser profileList={profileList} profile={profile} cancelRoute={url} />
            </Route>
            <Route>
              <Breadcrumb title="Users" to="/users" />
              <article>
                <Header currentUser={currentUser} profile={profile} />
                <Tabs />
                <div className="mt-6 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Switch>
                    <Route path={`${path}/profile`}>
                      <DescriptionList profile={profile} />
                    </Route>
                    <Route path={`${path}/apps`}>
                      <Accounts profile={profile} />
                    </Route>
                    <Route>
                      <Redirect to={`${url}/profile`} />
                    </Route>
                  </Switch>
                </div>
              </article>
            </Route>
          </Switch>
        );
      }}
    />
  );
};

export default createFragmentContainer(Content, {
  currentUser: graphql`
    fragment Content_currentUser on ProfileNode {
      ...Header_currentUser
    }
  `,
  profileList: graphql`
    fragment Content_profileList on ProfileNode @relay(plural: true) {
      ...EditUser_profileList
    }
  `
});
