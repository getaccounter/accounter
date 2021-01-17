/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Sidebar_profile = {
    readonly " $fragmentRefs": FragmentRefs<"Profile_profile">;
    readonly " $refType": "Sidebar_profile";
};
export type Sidebar_profile$data = Sidebar_profile;
export type Sidebar_profile$key = {
    readonly " $data"?: Sidebar_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Sidebar_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Sidebar_profile",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Profile_profile"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '8ee1b6cafe9bdca0e637d25580d194fb';
export default node;
