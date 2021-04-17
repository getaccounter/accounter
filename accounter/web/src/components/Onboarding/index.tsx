import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import OnboardingAppSelector from './components/OnboardingAppSelector';
import OnboardingBasics from './components/OnboardingBasics';
import OnboardingWelcome from './components/OnboardingWelcome';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { OnboardingQuery } from './__generated__/OnboardingQuery.graphql';
import StepBar from './components/StepBar';

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

  const onboardingSteps = [
    "Basics",
    "Apps",
  ]

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <Switch>
        <Route path={`${path}/basic`}>
          <StepBar steps={onboardingSteps} currentStep={0} />
          <OnboardingBasics roles={data.leads.roles} organizationSizes={data.leads.organizationSizes} />
        </Route>
        <Route path={`${path}/apps`}>
          <StepBar steps={onboardingSteps} currentStep={1} />
          <OnboardingAppSelector />
        </Route>
        <Route path={`${path}/welcome`}>
          <StepBar steps={onboardingSteps} currentStep={onboardingSteps.length} />
          <OnboardingWelcome />
        </Route>
        <Route exact path={`${path}/`}>
          <Redirect to={`${path}/basic`} />
        </Route>
      </Switch>
    </div>
  );
}
