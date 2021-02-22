/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserForm_profileList = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"UserSelect_profileList">;
    readonly " $refType": "UserForm_profileList";
}>;
export type UserForm_profileList$data = UserForm_profileList;
export type UserForm_profileList$key = ReadonlyArray<{
    readonly " $data"?: UserForm_profileList$data;
    readonly " $fragmentRefs": FragmentRefs<"UserForm_profileList">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "UserForm_profileList",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSelect_profileList"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'ec2d82f447b8816eb3af29e85c020cc7';
export default node;
