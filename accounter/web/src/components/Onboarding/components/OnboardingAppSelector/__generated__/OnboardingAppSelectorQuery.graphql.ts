/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingAppSelectorQueryVariables = {};
export type OnboardingAppSelectorQueryResponse = {
    readonly services: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"OnboardingAppSelectorApp_service">;
    }>;
};
export type OnboardingAppSelectorQuery = {
    readonly response: OnboardingAppSelectorQueryResponse;
    readonly variables: OnboardingAppSelectorQueryVariables;
};



/*
query OnboardingAppSelectorQuery {
  services {
    ...OnboardingAppSelectorApp_service
  }
}

fragment OnboardingAppSelectorApp_service on ServiceNode {
  name
  logo
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingAppSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ServiceNode",
        "kind": "LinkedField",
        "name": "services",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OnboardingAppSelectorApp_service"
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
    "name": "OnboardingAppSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ServiceNode",
        "kind": "LinkedField",
        "name": "services",
        "plural": true,
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
    ]
  },
  "params": {
    "cacheID": "f3de77c5b2829d6e6a7873f978e27525",
    "id": null,
    "metadata": {},
    "name": "OnboardingAppSelectorQuery",
    "operationKind": "query",
    "text": "query OnboardingAppSelectorQuery {\n  services {\n    ...OnboardingAppSelectorApp_service\n  }\n}\n\nfragment OnboardingAppSelectorApp_service on ServiceNode {\n  name\n  logo\n}\n"
  }
};
(node as any).hash = 'f55d963f243212e0db41ef3465b468e9';
export default node;
