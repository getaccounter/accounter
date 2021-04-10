import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import OnboardingAppSelector from './components/OnboardingAppSelector';
import OnboardingBasics from './components/OnboardingBasics';
import OnboardingWelcome from './components/OnboardingWelcome';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { OnboardingQuery } from './__generated__/OnboardingQuery.graphql';

export default function Onboarding() {
  const { path } = useRouteMatch();
  const data = useLazyLoadQuery<OnboardingQuery>(
    graphql`
      query OnboardingQuery {
        leads {
          roles {
            ...OnboardingBasics_roles
          }
          organizationSizes {
            ...OnboardingBasics_organizationSizes
          }
        }
      }
    `,
    {}
  );

  return (
    <Switch>
      <Route path={`${path}/basic`}>
        <OnboardingBasics roles={data.leads.roles} organizationSizes={data.leads.organizationSizes} />
      </Route>
      <Route path={`${path}/apps`}>
        <OnboardingAppSelector />
      </Route>
      <Route path={`${path}/welcome`}>
        <OnboardingWelcome />
      </Route>
      <Route exact path={`${path}/`}>
        <Redirect to={`${path}/basic`} />
      </Route>
    </Switch>
  );
}
