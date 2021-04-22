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
        logoLarge
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
        <div className="hover:border-indigo-500 label-checked:border-2 label-checked:border-indigo-500 relative flex items-center rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-2 cursor-pointer hover:border-gray-400 sm:flex sm:justify-center focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
          
            <img className="h-12" src={service.logoLarge} alt={`${service.name} logo`} />
          
        </div>
      </label>
    </>
  );
};

export default OnboardingAppSelectorApp;
