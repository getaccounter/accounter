/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Profile_profile = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly title: string | null;
    readonly image: string;
    readonly " $fragmentRefs": FragmentRefs<"Dropdown_profile">;
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Dropdown_profile"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '829ddd67cdb775c7da7faeeaed62837a';
export default node;
