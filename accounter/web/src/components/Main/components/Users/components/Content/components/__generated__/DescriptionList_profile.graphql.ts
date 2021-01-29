/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DescriptionList_profile = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly title: string | null;
    readonly department: {
        readonly name: string;
    } | null;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DepartmentNode",
      "kind": "LinkedField",
      "name": "department",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'c33ff84b48acc97547ee62ab0a1d09c0';
export default node;
