/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DescriptionList_profile = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string;
    readonly title: string | null;
    readonly " $refType": "DescriptionList_profile";
};
export type DescriptionList_profile$data = DescriptionList_profile;
export type DescriptionList_profile$key = {
    readonly " $data"?: DescriptionList_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"DescriptionList_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionList_profile",
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
(node as any).hash = 'a0c1c15881d2406636d2900e24875cf1';
export default node;
