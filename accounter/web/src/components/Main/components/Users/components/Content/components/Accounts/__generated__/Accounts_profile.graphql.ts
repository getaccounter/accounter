/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountRole = "ADMIN" | "OWNER" | "USER" | "%future added value";
export type ServiceName = "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type Accounts_profile = {
    readonly accounts: ReadonlyArray<{
        readonly id: string;
        readonly integration: {
            readonly name: string;
            readonly service: {
                readonly name: ServiceName;
                readonly logo: string;
            };
        };
        readonly username: string;
        readonly role: AccountRole;
        readonly externalProfile: string;
        readonly isDisabled: boolean;
    }>;
    readonly " $refType": "Accounts_profile";
};
export type Accounts_profile$data = Accounts_profile;
export type Accounts_profile$key = {
    readonly " $data"?: Accounts_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"Accounts_profile">;
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
  "name": "Accounts_profile",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "IntegrationNode",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDisabled",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
})();
(node as any).hash = '2c915fd69c1d5e0cbf78013d6b67bd5f';
export default node;
