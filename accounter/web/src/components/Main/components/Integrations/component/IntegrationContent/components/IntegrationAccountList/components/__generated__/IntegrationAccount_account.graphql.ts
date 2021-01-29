/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationAccount_account = {
    readonly profile: {
        readonly firstName: string;
        readonly lastName: string;
    };
    readonly username?: string;
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
        }
      ],
      "type": "SlackAccountNode",
      "abstractKey": null
    }
  ],
  "type": "AccountInterface",
  "abstractKey": "__isAccountInterface"
};
(node as any).hash = '37ffcedb1dd434ed1d82f6915fe49c34';
export default node;
