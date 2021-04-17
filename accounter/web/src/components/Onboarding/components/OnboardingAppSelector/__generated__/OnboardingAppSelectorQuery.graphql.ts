/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "GITHUB" | "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type OnboardingAppSelectorQueryVariables = {};
export type OnboardingAppSelectorQueryResponse = {
    readonly services: ReadonlyArray<{
        readonly name: ServiceName;
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
    name
    ...OnboardingAppSelectorApp_service
  }
}

fragment OnboardingAppSelectorApp_service on ServiceNode {
  name
  logo
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
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
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "3fe743c7fd37fca0c8c44410c4f39a32",
    "id": null,
    "metadata": {},
    "name": "OnboardingAppSelectorQuery",
    "operationKind": "query",
    "text": "query OnboardingAppSelectorQuery {\n  services {\n    name\n    ...OnboardingAppSelectorApp_service\n  }\n}\n\nfragment OnboardingAppSelectorApp_service on ServiceNode {\n  name\n  logo\n}\n"
  }
};
})();
(node as any).hash = '7820c139c0f6f1105404df673d3d037d';
export default node;
