/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserDirectory_organization = {
    readonly profiles: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly lastName: string;
                readonly " $fragmentRefs": FragmentRefs<"User_profile">;
            } | null;
        } | null>;
    };
    readonly " $refType": "UserDirectory_organization";
};
export type UserDirectory_organization$data = UserDirectory_organization;
export type UserDirectory_organization$key = {
    readonly " $data"?: UserDirectory_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"UserDirectory_organization">;
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
          "profiles"
        ]
      }
    ]
  },
  "name": "UserDirectory_organization",
  "selections": [
    {
      "alias": "profiles",
      "args": null,
      "concreteType": "ProfileNodeConnection",
      "kind": "LinkedField",
      "name": "__UserDirectory_profiles_connection",
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
                  "name": "lastName",
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
                  "name": "User_profile"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrganizationNode",
  "abstractKey": null
};
(node as any).hash = '3790d1a986ffd4ae2b28448d494e5774';
export default node;
