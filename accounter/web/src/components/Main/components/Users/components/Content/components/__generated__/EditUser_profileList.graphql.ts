/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EditUser_profileList = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"UserForm_profileList">;
    readonly " $refType": "EditUser_profileList";
}>;
export type EditUser_profileList$data = EditUser_profileList;
export type EditUser_profileList$key = ReadonlyArray<{
    readonly " $data"?: EditUser_profileList$data;
    readonly " $fragmentRefs": FragmentRefs<"EditUser_profileList">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "EditUser_profileList",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserForm_profileList"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'ebc86e06f6fa9f5bbed1c7abfe6e2f09';
export default node;
