import OnboardingAppSelectorApp from './components/OnboardingAppSelectorApp';
import { useLazyLoadQuery } from 'react-relay';
import { OnboardingAppSelectorQuery, ServiceName } from './__generated__/OnboardingAppSelectorQuery.graphql';
import graphql from 'babel-plugin-relay/macro';
import { useState } from 'react';

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

  const [selectedApps, setSelectedApps] = useState<Array<ServiceName>>([]);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tell us more about you!</h3>
        <p className="mt-1 text-sm text-gray-600">Customizing your experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <OnboardingAppSelectorApp
            service={service}
            selected={selectedApps.includes(service.name)}
            onSelect={(selected) =>
              setSelectedApps((selectedApps) => {
                const updatedSelectedApps = selectedApps.filter((app) => app !== service.name)
                if (selected) {
                  updatedSelectedApps.push(service.name)
                }
                return updatedSelectedApps
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingAppSelector;
