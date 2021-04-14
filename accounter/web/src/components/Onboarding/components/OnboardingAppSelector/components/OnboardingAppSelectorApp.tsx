import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { OnboardingAppSelectorApp_service$key } from './__generated__/OnboardingAppSelectorApp_service.graphql';

type Props = {
  service: OnboardingAppSelectorApp_service$key;
};

const OnboardingAppSelectorApp = (props: Props) => {
  const service = useFragment(
    graphql`
      fragment OnboardingAppSelectorApp_service on ServiceNode {
        name
        logo
      }
    `,
    props.service
  );
  
  return (
    <div
      key={service.name}
      className="relative rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-md flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={service.logo} alt={`${service.name} logo`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-md font-medium text-gray-900">{service.name}</p>
      </div>
    </div>
  );
};

export default OnboardingAppSelectorApp;
