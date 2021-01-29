/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "SLACK" | "%future added value";
export type Account_account = {
    readonly id: string;
    readonly integration: {
        readonly name: string;
        readonly service: {
            readonly name: ServiceName;
            readonly logo: string;
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



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ServiceNode",
          "kind": "LinkedField",
          "name": "service",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "logo",
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
})();
(node as any).hash = 'df5649fe294b0438793c37e7e3f465fa';
export default node;
