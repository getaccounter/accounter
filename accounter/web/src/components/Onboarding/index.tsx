import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import OnboardingAppSelector from './components/OnboardingAppSelector';
import OnboardingBasics from './components/OnboardingBasics';

export default function Onboarding() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/basic`}>
        <OnboardingBasics />
      </Route>
      <Route path={`${path}/apps`}>
        <OnboardingAppSelector />
      </Route>
      <Route exact path={`${path}/`}>
        <Redirect to={`${path}/basic`} />
      </Route>
    </Switch>
  );
}
