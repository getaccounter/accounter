/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_currentUser = {
    readonly isOwner: boolean;
    readonly " $refType": "Header_currentUser";
};
export type Header_currentUser$data = Header_currentUser;
export type Header_currentUser$key = {
    readonly " $data"?: Header_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"Header_currentUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_currentUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOwner",
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '1cba0cf36d00a8b2b7d787a67e6db937';
export default node;
