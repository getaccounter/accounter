/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_profile = {
    readonly firstName: string;
    readonly lastName: string;
    readonly isAdmin: boolean;
    readonly currentUserCanEdit: boolean;
    readonly isActive: boolean;
    readonly isOwner: boolean;
    readonly isCurrentUser: boolean;
    readonly " $refType": "Header_profile";
};
export type Header_profile$data = Header_profile;
export type Header_profile$key = {
    readonly " $data"?: Header_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Header_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_profile",
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
      "name": "currentUserCanEdit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActive",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOwner",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isCurrentUser",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '5c9e53bb91e9d19b0b0cb97877dc8a4c';
export default node;
