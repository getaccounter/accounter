import React from 'react';
import SideBar from './components/Sidebar';
import { MenuIcon, UserGroupIcon, ViewGridIcon, ViewGridAddIcon } from '@heroicons/react/outline';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Integrations from './components/Integrations';
import Users from './components/Users';
import Services from './components/Services';
import queryString from 'query-string';
import Loading from '../Loading';
import graphql from 'babel-plugin-relay/macro';
import { MainQuery } from './__generated__/MainQuery.graphql';
import ErrorBoundary from './components/ErrorBoundary';
import { useQuery } from 'relay-hooks';

const Header = () => {
  const location = useLocation();
  const qsObject = {
    ...queryString.parse(location.search),
    showMobileSidebar: true
  };
  const menuLink = `${location.pathname}?${queryString.stringify(qsObject)}`;
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
        <div>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
            alt="Workflow"
          />
        </div>
        <div>
          <Link to={menuLink}>
            <button
              type="button"
              className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Main() {
  const { data, error } = useQuery<MainQuery>(graphql`
    query MainQuery {
      currentUser {
        ...Sidebar_profile
      }
    }
  `);

  if (error) {
    // catch in ErrorBoundary
    throw error;
  }

  if (!data) {
    return <Loading />;
  }

  const mainPages = [
    {
      tab: {
        label: 'Apps',
        path: '/integrations',
        Icon: ViewGridIcon
      },
      content: <Integrations />
    },
    {
      tab: {
        label: 'Users',
        path: '/users',
        Icon: UserGroupIcon
      },
      content: <Users />
    }
  ];

  const extraPages = [
    {
      tab: {
        label: 'Add Apps',
        path: '/services',
        Icon: ViewGridAddIcon
      },
      content: <Services />
    }
  ];
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <SideBar
        profile={data.currentUser}
        mainTabs={mainPages.map((p) => p.tab)}
        extraTabs={extraPages.map((p) => p.tab)}
      />
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <Header />
        <Switch>
          {[...mainPages, ...extraPages].map(({ tab, content }) => (
            <Route key={tab.path} path={tab.path}>
              <ErrorBoundary>{content}</ErrorBoundary>
            </Route>
          ))}
          <Route exact path="/">
            <Redirect to="/integrations" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
