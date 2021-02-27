/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Content_currentUser = {
    readonly " $fragmentRefs": FragmentRefs<"Header_currentUser">;
    readonly " $refType": "Content_currentUser";
};
export type Content_currentUser$data = Content_currentUser;
export type Content_currentUser$key = {
    readonly " $data"?: Content_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"Content_currentUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Content_currentUser",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_currentUser"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '0cd2851b1600fd8dea1edc206508935e';
export default node;
