/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Users_currentUser = {
    readonly organization: {
        readonly profiles: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
                } | null;
            } | null>;
            readonly " $fragmentRefs": FragmentRefs<"UserDirectory_profiles">;
        };
    };
    readonly " $fragmentRefs": FragmentRefs<"Content_currentUser">;
    readonly " $refType": "Users_currentUser";
};
export type Users_currentUser$data = Users_currentUser;
export type Users_currentUser$key = {
    readonly " $data"?: Users_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"Users_currentUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "organization",
          "profiles"
        ]
      }
    ]
  },
  "name": "Users_currentUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "OrganizationNode",
      "kind": "LinkedField",
      "name": "organization",
      "plural": false,
      "selections": [
        {
          "alias": "profiles",
          "args": null,
          "concreteType": "ProfileNodeConnection",
          "kind": "LinkedField",
          "name": "__Users_profiles_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ProfileNodeEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ProfileNode",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
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
                      "name": "__typename",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "Content_profile"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "UserDirectory_profiles"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Content_currentUser"
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
(node as any).hash = 'd922c8cea0cef10aad5b8a1af36550c4';
export default node;
