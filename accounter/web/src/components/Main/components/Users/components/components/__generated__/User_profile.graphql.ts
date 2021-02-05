/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type User_profile = {
    readonly id: string;
    readonly image: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly title: string | null;
    readonly isAdmin: boolean;
    readonly isOwner: boolean;
    readonly " $refType": "User_profile";
};
export type User_profile$data = User_profile;
export type User_profile$key = {
    readonly " $data"?: User_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"User_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_profile",
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
      "name": "image",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAdmin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOwner",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'cb9378fbc60ff82a137f6011357c00e5';
export default node;
