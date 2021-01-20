/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Content_currentUser = {
    readonly " $fragmentRefs": FragmentRefs<"EditUser_currentUser">;
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
      "name": "EditUser_currentUser"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '6a4fc29522e7cc47d1b2188c1e98186f';
export default node;
