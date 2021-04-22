import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { OnboardingAppSelectorApp_service$key } from './__generated__/OnboardingAppSelectorApp_service.graphql';

type Props = {
  service: OnboardingAppSelectorApp_service$key;
  selected: boolean;
  onSelect: (selected: boolean) => void
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
    <>
      <label key={service.name}>
        <input
          type="checkbox"
          checked={props.selected}
          name={service.name}
          onChange={evt => props.onSelect(evt.target.checked)}
          className="sr-only"
          aria-labelledby="server-size-0-label"
        />
        <div className="hover:border-indigo-500 label-checked:border-2 label-checked:border-indigo-500 relative flex items-center rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={service.logo} alt={`${service.name} logo`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-gray-900">{service.name}</p>
          </div>
        </div>
      </label>
    </>
  );
};

export default OnboardingAppSelectorApp;
