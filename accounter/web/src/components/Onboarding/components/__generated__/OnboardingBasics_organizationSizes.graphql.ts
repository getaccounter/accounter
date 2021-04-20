/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Size = "gt1" | "gt1000" | "gt200" | "gt50" | "%future added value";
export type OnboardingBasics_organizationSizes = ReadonlyArray<{
    readonly value: Size;
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
  "type": "OrganizationSizeValueLabelPair",
  "abstractKey": null
};
(node as any).hash = 'a37a43058454e2e4f33bce64a67d8399';
export default node;
