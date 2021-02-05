/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationAccountList_accounts = ReadonlyArray<{
    readonly id: string;
    readonly imageSmall: string;
    readonly profile: {
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly title: string | null;
    };
    readonly username: string;
    readonly role: string;
    readonly externalProfile: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageSmall",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProfileNode",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "role",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "externalProfile",
      "storageKey": null
    }
  ],
  "type": "AccountNode",
  "abstractKey": null
};
(node as any).hash = '6cd46b61268a43825075f49a05341a17';
export default node;
