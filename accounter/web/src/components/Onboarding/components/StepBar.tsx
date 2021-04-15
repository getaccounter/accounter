import { CheckIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';

enum Stage {
  past,
  current,
  future
}

type StepProps = {
  label: ReactNode;
  stage: Stage;
  isLast: boolean;
};

const Step = (props: StepProps) => {
  const isPast = props.stage === Stage.past;
  const isCurrent = props.stage === Stage.current;
  const isFuture = props.stage === Stage.future;

  const circleColorStyles = isPast
    ? 'bg-green-400'
    : isCurrent
    ? 'bg-white border-2 border-green-400'
    : 'bg-white border-2 border-gray-300';

  const lineColorStyles = isPast ? 'bg-green-400' : 'bg-gray-200';
  return (
    <li className={`relative ${!props.isLast && 'pr-8 sm:pr-20'}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className={`h-0.5 w-full ${lineColorStyles}`} />
      </div>
      <div
        className={`${
          isFuture && 'group'
        } relative w-8 h-8 flex items-center justify-center ${circleColorStyles} rounded-full`}
      >
        {isPast && <CheckIcon className="w-5 h-5 text-white" />}
        {isCurrent && <span className="h-2.5 w-2.5 bg-green-400 rounded-full" aria-hidden />}
        {isFuture && <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" aria-hidden />}
        <span className="sr-only">{props.label}</span>
      </div>
    </li>
  );
};

type Props = {
  currentStep: number;
  steps: Array<ReactNode>;
};

const StepBar = (props: Props) => (
  <nav aria-label="Progress">
    <ol className="flex items-center justify-center pb-10">
      {props.steps.map((label, idx) => {
        const stage = idx < props.currentStep ? Stage.past : idx === props.currentStep ? Stage.current : Stage.future
        return (
          <Step
            label={label}
            stage={stage}
            isLast={idx + 1 === props.steps.length}
          />
        )
      })}
    </ol>
  </nav>
);

export default StepBar;
