/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EditUser_profile = {
    readonly " $fragmentRefs": FragmentRefs<"UserForm_profile">;
    readonly " $refType": "EditUser_profile";
};
export type EditUser_profile$data = EditUser_profile;
export type EditUser_profile$key = {
    readonly " $data"?: EditUser_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"EditUser_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditUser_profile",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserForm_profile"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'f312b6b59c36db073af98a8f17c63feb';
export default node;
