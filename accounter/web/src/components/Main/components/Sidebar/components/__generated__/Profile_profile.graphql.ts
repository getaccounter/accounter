/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Profile_profile = {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
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
      "name": "id",
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
(node as any).hash = '5d18629d1d0b1d61d081c2041f593a82';
export default node;
