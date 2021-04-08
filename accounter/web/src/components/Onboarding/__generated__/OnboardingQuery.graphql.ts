/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingQueryVariables = {};
export type OnboardingQueryResponse = {
    readonly roles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"OnboardingBasics_roles">;
    }>;
};
export type OnboardingQuery = {
    readonly response: OnboardingQueryResponse;
    readonly variables: OnboardingQueryVariables;
};



/*
query OnboardingQuery {
  roles {
    ...OnboardingBasics_roles
  }
}

fragment OnboardingBasics_roles on ValueLabelPair {
  value
  label
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ValueLabelPair",
        "kind": "LinkedField",
        "name": "roles",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OnboardingBasics_roles"
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
    "name": "OnboardingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ValueLabelPair",
        "kind": "LinkedField",
        "name": "roles",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "label",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b18a343693bad08fe161906460e5f17",
    "id": null,
    "metadata": {},
    "name": "OnboardingQuery",
    "operationKind": "query",
    "text": "query OnboardingQuery {\n  roles {\n    ...OnboardingBasics_roles\n  }\n}\n\nfragment OnboardingBasics_roles on ValueLabelPair {\n  value\n  label\n}\n"
  }
};
(node as any).hash = 'd5f2ae8fc87a31f23a20c04af430c646';
export default node;
