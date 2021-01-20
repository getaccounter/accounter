/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AddUsers_currentUser = {
    readonly " $fragmentRefs": FragmentRefs<"UserForm_currentUser">;
    readonly " $refType": "AddUsers_currentUser";
};
export type AddUsers_currentUser$data = AddUsers_currentUser;
export type AddUsers_currentUser$key = {
    readonly " $data"?: AddUsers_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"AddUsers_currentUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddUsers_currentUser",
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
(node as any).hash = 'f6efd12e946f263788c21889242be8de';
export default node;
