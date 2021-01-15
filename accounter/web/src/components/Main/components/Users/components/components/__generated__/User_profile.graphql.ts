/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type User_profile = {
    readonly firstName: string;
    readonly lastName: string;
    readonly title: string | null;
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
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'a786ba0b31b74388c512ed000720ec8c';
export default node;
