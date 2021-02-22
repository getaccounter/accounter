/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSelect_profileList = ReadonlyArray<{
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly image: string;
    readonly " $refType": "UserSelect_profileList";
}>;
export type UserSelect_profileList$data = UserSelect_profileList;
export type UserSelect_profileList$key = ReadonlyArray<{
    readonly " $data"?: UserSelect_profileList$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSelect_profileList">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "UserSelect_profileList",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "name": "image",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '5d105c8aa9d5d6a20d0951b1ddaa4cd0';
export default node;
