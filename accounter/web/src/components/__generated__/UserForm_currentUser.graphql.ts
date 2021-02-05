/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserForm_currentUser = {
    readonly organization: {
        readonly id: string;
    };
    readonly " $refType": "UserForm_currentUser";
};
export type UserForm_currentUser$data = UserForm_currentUser;
export type UserForm_currentUser$key = {
    readonly " $data"?: UserForm_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"UserForm_currentUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserForm_currentUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "OrganizationNode",
      "kind": "LinkedField",
      "name": "organization",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'f7fe5d9a010755fcf863a0c6903fbf82';
export default node;
