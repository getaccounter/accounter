/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReactivateUser_profile = {
    readonly id: string;
    readonly isActive: boolean;
    readonly " $refType": "ReactivateUser_profile";
};
export type ReactivateUser_profile$data = ReactivateUser_profile;
export type ReactivateUser_profile$key = {
    readonly " $data"?: ReactivateUser_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"ReactivateUser_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReactivateUser_profile",
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
      "name": "isActive",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '9d563ae17ffaef549da63f10894249f8';
export default node;
