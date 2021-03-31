import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuthSlackCallback from './components/OAuthSlackCallback';
import Main from './components/Main';
import PrivateRoute from './components/ProtectedRoute';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout';
import ResetPassword from './components/ResetPassword';
import Onboarding from './components/Onboarding';

export default function Root() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
          {/* TODO: make /signup redirect to the app if you're already loged in */}
          <Signup />
        </Route>
        <Route path="/onboarding">
          {/* TODO: make /onboarding redirect to the app if you're already loged in */}
          <Onboarding />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route exact path="/:service/oauth/callback">
          <OAuthSlackCallback />
        </Route>
        <PrivateRoute path="/">
          <Main />
        </PrivateRoute>
      </Switch>
    </div>
  );
}
