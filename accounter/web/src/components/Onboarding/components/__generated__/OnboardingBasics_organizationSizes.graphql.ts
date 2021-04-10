/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingBasics_organizationSizes = ReadonlyArray<{
    readonly value: string;
    readonly label: string;
    readonly " $refType": "OnboardingBasics_organizationSizes";
}>;
export type OnboardingBasics_organizationSizes$data = OnboardingBasics_organizationSizes;
export type OnboardingBasics_organizationSizes$key = ReadonlyArray<{
    readonly " $data"?: OnboardingBasics_organizationSizes$data;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingBasics_organizationSizes">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "OnboardingBasics_organizationSizes",
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
(node as any).hash = 'dcb9a4c6f4dc882f47bf86fe51a7e799';
export default node;
