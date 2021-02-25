/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserDirectory_profile = {
    readonly id: string;
    readonly lastName: string | null;
    readonly firstName: string | null;
    readonly email: string;
    readonly hasActiveAccounts: boolean;
    readonly " $fragmentRefs": FragmentRefs<"User_profile">;
    readonly " $refType": "UserDirectory_profile";
};
export type UserDirectory_profile$data = UserDirectory_profile;
export type UserDirectory_profile$key = {
    readonly " $data"?: UserDirectory_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"UserDirectory_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserDirectory_profile",
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
      "name": "lastName",
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasActiveAccounts",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "User_profile"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '998ed6d5a626cb713be9287dda24519d';
export default node;
