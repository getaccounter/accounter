/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "SLACK" | "%future added value";
export type Account_account = {
    readonly id: string;
    readonly integration: {
        readonly service: {
            readonly name: ServiceName;
        };
    };
    readonly username?: string;
    readonly email?: string;
    readonly " $refType": "Account_account";
};
export type Account_account$data = Account_account;
export type Account_account$key = {
    readonly " $data"?: Account_account$data;
    readonly " $fragmentRefs": FragmentRefs<"Account_account">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Account_account",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "integration",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ServiceNode",
          "kind": "LinkedField",
          "name": "service",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
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
(node as any).hash = 'c777cd229a5cccf4c8b49242c71058f1';
export default node;
