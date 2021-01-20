/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EditUser_currentUser = {
    readonly " $fragmentRefs": FragmentRefs<"UserForm_currentUser">;
    readonly " $refType": "EditUser_currentUser";
};
export type EditUser_currentUser$data = EditUser_currentUser;
export type EditUser_currentUser$key = {
    readonly " $data"?: EditUser_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"EditUser_currentUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditUser_currentUser",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserForm_currentUser"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '296ca32f3dfb41094dc94ee8d97323fd';
export default node;
