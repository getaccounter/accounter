/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountRole = "ADMIN" | "OWNER" | "USER" | "%future added value";
export type ServiceEnum = "AWS" | "Aircall" | "Asana" | "Atlassian" | "BambooHR" | "Figma" | "GitHub" | "Google" | "HubSpot" | "Intercom" | "Notion" | "Salesforce" | "Slack" | "Zendesk" | "Zoom" | "%future added value";
export type Accounts_profile = {
    readonly accounts: ReadonlyArray<{
        readonly integration: {
            readonly name: string;
            readonly service: {
                readonly name: ServiceEnum;
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
(node as any).hash = 'd1ba3f897128429834386c0d51df31d2';
export default node;
