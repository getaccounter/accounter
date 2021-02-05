import { ReactNode } from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { DescriptionList_profile } from "./__generated__/DescriptionList_profile.graphql";

const Description = (props: {
  long?: boolean;
  term: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className={`sm:col-span-${props.long ? 2 : 1}`}>
      <dt className="text-sm font-medium text-gray-500">{props.term}</dt>
      <dd
        className={`mt-1 text-sm text-gray-900 ${props.long && "max-w-prose"}`}
      >
        {props.children}
      </dd>
    </div>
  );
};

type Props = {
  profile: DescriptionList_profile;
};

const DescriptionList = ({ profile }: Props) => {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <Description term="First name">{profile.firstName}</Description>
      <Description term="Last name">{profile.lastName}</Description>
      <Description term="Email">{profile.email}</Description>
      <Description term="Title">{profile.title ?? "-"}</Description>
    </dl>
  );
};

export default createFragmentContainer(DescriptionList, {
  profile: graphql`
    fragment DescriptionList_profile on ProfileNode {
      firstName
      lastName
      email
      title
    }
  `,
});
