/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Profile_profile = {
    readonly firstName: string;
    readonly lastName: string;
    readonly title: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Dropdown_profile">;
    readonly " $refType": "Profile_profile";
};
export type Profile_profile$data = Profile_profile;
export type Profile_profile$key = {
    readonly " $data"?: Profile_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Profile_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Profile_profile",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Dropdown_profile"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'b881c2ba75053ad73cc8db09263a110d';
export default node;
