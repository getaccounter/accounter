/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationContent_integration = {
    readonly name: string;
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SlackAccountNode",
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
  "type": "SlackIntegrationNode",
  "abstractKey": null
};
(node as any).hash = '2835391206c8303d3b2b9ca8e6e8f4a6';
export default node;
