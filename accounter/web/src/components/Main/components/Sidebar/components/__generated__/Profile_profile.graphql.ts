/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Profile_profile = {
    readonly firstName: string;
    readonly lastName: string;
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
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '7bf2d6a73f406dfd81c3ccfc136b79c1';
export default node;
