import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuthSlackCallback from './components/OAuthSlackCallback';
import Main from './components/Main';
import PrivateRoute from './components/ProtectedRoute';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout';
import ResetPassword from './components/ResetPassword';
import Onboarding from './components/Onboarding';
import Loading from './components/Loading';
import BetaBlocker from './components/BetaBlocker';

export default function Root() {
  return (
    <Suspense fallback={<Loading />}>
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
        <PrivateRoute path="/onboarding">
          {/* TODO: make /onboarding redirect to the app if you're already loged in */}
          <Onboarding />
        </PrivateRoute>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route exact path="/:service/oauth/callback">
          <OAuthSlackCallback />
        </Route>
        <PrivateRoute path="/betablocker">
          <BetaBlocker />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Main />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
}
