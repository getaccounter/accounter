/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Dropdown_profile = {
    readonly id: string;
    readonly " $refType": "Dropdown_profile";
};
export type Dropdown_profile$data = Dropdown_profile;
export type Dropdown_profile$key = {
    readonly " $data"?: Dropdown_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Dropdown_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Dropdown_profile",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'fb13935bc88a3f129bd51e2017ff1fb3';
export default node;
