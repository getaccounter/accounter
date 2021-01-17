/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Users_organization = {
    readonly profiles: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
            } | null;
        } | null>;
        readonly " $fragmentRefs": FragmentRefs<"UserDirectory_profiles">;
    };
    readonly " $fragmentRefs": FragmentRefs<"Content_organization">;
    readonly " $refType": "Users_organization";
};
export type Users_organization$data = Users_organization;
export type Users_organization$key = {
    readonly " $data"?: Users_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"Users_organization">;
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
  "name": "Users_organization",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Content_organization"
    }
  ],
  "type": "OrganizationNode",
  "abstractKey": null
};
(node as any).hash = '8513fe91220efdc18ce9048bb6978cb0';
export default node;
