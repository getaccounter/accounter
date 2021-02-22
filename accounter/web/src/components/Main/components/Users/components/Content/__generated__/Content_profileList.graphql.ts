/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Content_profileList = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"EditUser_profileList">;
    readonly " $refType": "Content_profileList";
}>;
export type Content_profileList$data = Content_profileList;
export type Content_profileList$key = ReadonlyArray<{
    readonly " $data"?: Content_profileList$data;
    readonly " $fragmentRefs": FragmentRefs<"Content_profileList">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Content_profileList",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditUser_profileList"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '0d8d17f0fc2972fef4f529e55d75cf6a';
export default node;
