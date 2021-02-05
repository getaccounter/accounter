/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_profile = {
    readonly id: string;
    readonly image: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly isAdmin: boolean;
    readonly currentUserCanEdit: boolean;
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
(node as any).hash = 'c8788d1b5f0d2b912a3e5ffb6ee70f44';
export default node;
