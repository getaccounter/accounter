/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Users_organization = {
    readonly " $fragmentRefs": FragmentRefs<"UserDirectory_organization">;
    readonly " $refType": "Users_organization";
};
export type Users_organization$data = Users_organization;
export type Users_organization$key = {
    readonly " $data"?: Users_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"Users_organization">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Users_organization",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserDirectory_organization"
    }
  ],
  "type": "OrganizationNode",
  "abstractKey": null
};
(node as any).hash = 'b16fe78c0b838aea6f84908370280230';
export default node;
