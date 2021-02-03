/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationAccountList_accounts = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"IntegrationAccount_account">;
    readonly " $refType": "IntegrationAccountList_accounts";
}>;
export type IntegrationAccountList_accounts$data = IntegrationAccountList_accounts;
export type IntegrationAccountList_accounts$key = ReadonlyArray<{
    readonly " $data"?: IntegrationAccountList_accounts$data;
    readonly " $fragmentRefs": FragmentRefs<"IntegrationAccountList_accounts">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "IntegrationAccountList_accounts",
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
      "name": "IntegrationAccount_account"
    }
  ],
  "type": "AccountNode",
  "abstractKey": null
};
(node as any).hash = 'b64e34ff7e4a637bf942862cacb70ac4';
export default node;
