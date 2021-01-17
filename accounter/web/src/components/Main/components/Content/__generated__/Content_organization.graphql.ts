/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Content_organization = {
    readonly " $fragmentRefs": FragmentRefs<"EditUser_organization">;
    readonly " $refType": "Content_organization";
};
export type Content_organization$data = Content_organization;
export type Content_organization$key = {
    readonly " $data"?: Content_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"Content_organization">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Content_organization",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditUser_organization"
    }
  ],
  "type": "OrganizationNode",
  "abstractKey": null
};
(node as any).hash = '98abbb4bdcd786806bec3cb02fced7b7';
export default node;
