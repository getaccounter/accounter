/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingBasics_roles = ReadonlyArray<{
    readonly value: string;
    readonly label: string;
    readonly " $refType": "OnboardingBasics_roles";
}>;
export type OnboardingBasics_roles$data = OnboardingBasics_roles;
export type OnboardingBasics_roles$key = ReadonlyArray<{
    readonly " $data"?: OnboardingBasics_roles$data;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingBasics_roles">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "OnboardingBasics_roles",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    }
  ],
  "type": "ValueLabelPair",
  "abstractKey": null
};
(node as any).hash = '4bc2414ed1b000194196bf5932db19d0';
export default node;
