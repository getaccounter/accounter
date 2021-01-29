/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OffboardUser_profile = {
    readonly id: string;
    readonly isOffboarded: boolean;
    readonly " $refType": "OffboardUser_profile";
};
export type OffboardUser_profile$data = OffboardUser_profile;
export type OffboardUser_profile$key = {
    readonly " $data"?: OffboardUser_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"OffboardUser_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OffboardUser_profile",
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
      "name": "isOffboarded",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '692c2ed201893e56b5987377776b3eb6';
export default node;
