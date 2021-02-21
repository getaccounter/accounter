/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserForm_profile = {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string;
    readonly title: string | null;
    readonly " $refType": "UserForm_profile";
};
export type UserForm_profile$data = UserForm_profile;
export type UserForm_profile$key = {
    readonly " $data"?: UserForm_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"UserForm_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserForm_profile",
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '5287eeb63c32b0ea8655338779b1c8e5';
export default node;
