/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AddUsers_organization = {
    readonly " $fragmentRefs": FragmentRefs<"UserForm_organization">;
    readonly " $refType": "AddUsers_organization";
};
export type AddUsers_organization$data = AddUsers_organization;
export type AddUsers_organization$key = {
    readonly " $data"?: AddUsers_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"AddUsers_organization">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddUsers_organization",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserForm_organization"
    }
  ],
  "type": "OrganizationNode",
  "abstractKey": null
};
(node as any).hash = 'a7a672deb67e9c09031fd5bc22d09cc1';
export default node;
