/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Profile_profile = {
    readonly email: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly " $refType": "Profile_profile";
};
export type Profile_profile$data = Profile_profile;
export type Profile_profile$key = {
    readonly " $data"?: Profile_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Profile_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Profile_profile",
  "selections": [
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
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '64f90a6ef3ef202e8db0bea0272a6d18';
export default node;
