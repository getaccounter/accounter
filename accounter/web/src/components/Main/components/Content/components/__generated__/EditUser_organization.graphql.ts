/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EditUser_organization = {
    readonly " $fragmentRefs": FragmentRefs<"UserForm_organization">;
    readonly " $refType": "EditUser_organization";
};
export type EditUser_organization$data = EditUser_organization;
export type EditUser_organization$key = {
    readonly " $data"?: EditUser_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"EditUser_organization">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditUser_organization",
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
(node as any).hash = '7987d6f91b117c01b43835a7e87df333';
export default node;
