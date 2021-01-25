/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountList_accounts = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"Account_account">;
    readonly " $refType": "AccountList_accounts";
}>;
export type AccountList_accounts$data = AccountList_accounts;
export type AccountList_accounts$key = ReadonlyArray<{
    readonly " $data"?: AccountList_accounts$data;
    readonly " $fragmentRefs": FragmentRefs<"AccountList_accounts">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "AccountList_accounts",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Account_account"
    }
  ],
  "type": "AccountInterface",
  "abstractKey": "__isAccountInterface"
};
(node as any).hash = 'b5675461bb75dca6da3218a7fdcd0072';
export default node;
