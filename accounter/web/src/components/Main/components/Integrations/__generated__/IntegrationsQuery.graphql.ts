/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationsQueryVariables = {};
export type IntegrationsQueryResponse = {
    readonly integrations: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Integration_integration">;
    }>;
};
export type IntegrationsQuery = {
    readonly response: IntegrationsQueryResponse;
    readonly variables: IntegrationsQueryVariables;
};



/*
query IntegrationsQuery {
  integrations {
    __typename
    ...Integration_integration
  }
}

fragment Integration_integration on IntegrationInterface {
  __isIntegrationInterface: __typename
  service {
    name
    logo
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IntegrationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Integration_integration"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IntegrationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isIntegrationInterface"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceType",
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
              },
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
      }
    ]
  },
  "params": {
    "cacheID": "e3e81a8ad4997832dea013645fdd4c0a",
    "id": null,
    "metadata": {},
    "name": "IntegrationsQuery",
    "operationKind": "query",
    "text": "query IntegrationsQuery {\n  integrations {\n    __typename\n    ...Integration_integration\n  }\n}\n\nfragment Integration_integration on IntegrationInterface {\n  __isIntegrationInterface: __typename\n  service {\n    name\n    logo\n  }\n}\n"
  }
};
(node as any).hash = '5c86abe77e2b691ddb481f3b19625459';
export default node;
