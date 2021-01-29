/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Accounts_profile = {
    readonly accounts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"AccountList_accounts">;
    }>;
    readonly " $refType": "Accounts_profile";
};
export type Accounts_profile$data = Accounts_profile;
export type Accounts_profile$key = {
    readonly " $data"?: Accounts_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Accounts_profile">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Accounts_profile",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "accounts",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountList_accounts"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = '77fb490f41783c1a04db8f779d04493f';
export default node;
