/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Role = "c_level" | "engineering" | "hr" | "marketing" | "other" | "product" | "sales" | "%future added value";
export type OnboardingBasics_roles = ReadonlyArray<{
    readonly value: Role;
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
  "type": "RoleValueLabelPair",
  "abstractKey": null
};
(node as any).hash = 'b9cc1deab30061ecfe171d35eda9dfec';
export default node;
