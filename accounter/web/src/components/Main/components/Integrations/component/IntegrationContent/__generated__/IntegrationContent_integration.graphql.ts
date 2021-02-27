/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationContent_integration = {
    readonly accounts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"IntegrationAccountList_accounts">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"IntegrationContentHeader_integration">;
    readonly " $refType": "IntegrationContent_integration";
};
export type IntegrationContent_integration$data = IntegrationContent_integration;
export type IntegrationContent_integration$key = {
    readonly " $data"?: IntegrationContent_integration$data;
    readonly " $fragmentRefs": FragmentRefs<"IntegrationContent_integration">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IntegrationContent_integration",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountNode",
      "kind": "LinkedField",
      "name": "accounts",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "IntegrationAccountList_accounts"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "IntegrationContentHeader_integration"
    }
  ],
  "type": "IntegrationNode",
  "abstractKey": null
};
(node as any).hash = '0c00e30f77751f1d13bd2b279fe5d372';
export default node;
