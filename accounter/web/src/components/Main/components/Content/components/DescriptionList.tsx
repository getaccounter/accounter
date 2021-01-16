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
    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <Description term="Email">{profile.email}</Description>
        <Description term="Title">{profile.title ?? "-"}</Description>
        <Description term="Team">{!profile.department ? "-" : profile.department.name}</Description>
        <Description term="Birthday">June 8, 1990</Description>
        <Description long term="About">
          <p>
            Tincidunt quam neque in cursus viverra orci, dapibus nec tristique.
            Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus
            congue arcu aenean posuere aliquam.
          </p>
          <p className="mt-5">
            Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea
            rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus
            vitae. Scelerisque fermentum, cursus felis dui suspendisse velit
            pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan
            vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.
          </p>
        </Description>
      </dl>
    </div>
  );
};

export default createFragmentContainer(DescriptionList, {
  profile: graphql`
    fragment DescriptionList_profile on ProfileNode {
      email
      title
      department {
        name
      }
    }
  `,
});
