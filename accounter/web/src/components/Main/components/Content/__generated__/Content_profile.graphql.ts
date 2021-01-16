/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Content_profile = {
    readonly " $fragmentRefs": FragmentRefs<"Header_profile">;
    readonly " $refType": "Content_profile";
};
export type Content_profile$data = Content_profile;
export type Content_profile$key = {
    readonly " $data"?: Content_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Content_profile",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_profile"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'fa1d71bd8bff165bdc28d11d8ed202e0';
export default node;
