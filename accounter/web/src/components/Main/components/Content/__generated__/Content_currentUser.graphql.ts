/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Content_currentUser = {
    readonly " $fragmentRefs": FragmentRefs<"EditUser_currentUser" | "Header_currentUser">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_currentUser"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'e51ba8849e5637f60c9fc7fc8b81a5a7';
export default node;
