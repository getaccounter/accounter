import OnboardingAppSelectorApp from './components/OnboardingAppSelectorApp';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { OnboardingAppSelectorQuery } from './__generated__/OnboardingAppSelectorQuery.graphql';
import graphql from 'babel-plugin-relay/macro';
import { useState } from 'react';
import { OnboardingAppSelectorMutation, ServiceEnum } from './__generated__/OnboardingAppSelectorMutation.graphql';
import Loading from '../../../Loading';
import { useHistory } from 'react-router-dom';

const OnboardingAppSelector = () => {
  const { services } = useLazyLoadQuery<OnboardingAppSelectorQuery>(
    graphql`
      query OnboardingAppSelectorQuery {
        services {
          name
          ...OnboardingAppSelectorApp_service
        }
      }
    `,
    {}
  );
  const [commit, isInFlight] = useMutation<OnboardingAppSelectorMutation>(graphql`
    mutation OnboardingAppSelectorMutation($apps: [ServiceEnum!]!) {
      onboardApps(apps: $apps) {
        status
      }
    }
  `);
  
  const history = useHistory();
  const [selectedApps, setSelectedApps] = useState<Array<ServiceEnum>>([]);

  return isInFlight ? <Loading /> : (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tell us more about you!</h3>
        <p className="mt-1 text-sm text-gray-600">Customizing your experience.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          commit({
            variables: {
              apps: selectedApps
            },
            onCompleted: (data) => history.push("/")
          })
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <OnboardingAppSelectorApp
              key={service.name}
              service={service}
              selected={selectedApps.includes(service.name)}
              onSelect={(selected) =>
                setSelectedApps((selectedApps) => {
                  const updatedSelectedApps = selectedApps.filter((app) => app !== service.name);
                  if (selected) {
                    updatedSelectedApps.push(service.name);
                  }
                  return updatedSelectedApps;
                })
              }
            />
          ))}
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingAppSelector;
