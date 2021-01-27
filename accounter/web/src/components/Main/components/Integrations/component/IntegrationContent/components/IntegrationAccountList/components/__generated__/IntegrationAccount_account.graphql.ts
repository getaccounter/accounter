/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationAccount_account = {
    readonly id: string;
    readonly profile: {
        readonly firstName: string;
        readonly lastName: string;
        readonly title: string | null;
    };
    readonly username?: string;
    readonly email?: string;
    readonly " $refType": "IntegrationAccount_account";
};
export type IntegrationAccount_account$data = IntegrationAccount_account;
export type IntegrationAccount_account$key = {
    readonly " $data"?: IntegrationAccount_account$data;
    readonly " $fragmentRefs": FragmentRefs<"IntegrationAccount_account">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IntegrationAccount_account",
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
      "kind": "InlineFragment",
      "selections": [
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
          "name": "email",
          "storageKey": null
        }
      ],
      "type": "SlackAccountNode",
      "abstractKey": null
    }
  ],
  "type": "AccountInterface",
  "abstractKey": "__isAccountInterface"
};
(node as any).hash = 'c50dccff9c1d8be5d1602eb194b729d3';
export default node;
