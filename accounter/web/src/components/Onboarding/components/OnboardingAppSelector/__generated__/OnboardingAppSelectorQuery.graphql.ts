/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceEnum = "Atlassian" | "Figma" | "GitHub" | "Google" | "HubSpot" | "Intercom" | "Notion" | "Salesforce" | "Slack" | "Zoom" | "%future added value";
export type OnboardingAppSelectorQueryVariables = {};
export type OnboardingAppSelectorQueryResponse = {
    readonly services: ReadonlyArray<{
        readonly name: ServiceEnum;
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
    id
  }
}

fragment OnboardingAppSelectorApp_service on ServiceNode {
  name
  logoLarge
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
            "name": "logoLarge",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9ad4a0515bbdb5736960d6fa7e457dbd",
    "id": null,
    "metadata": {},
    "name": "OnboardingAppSelectorQuery",
    "operationKind": "query",
    "text": "query OnboardingAppSelectorQuery {\n  services {\n    name\n    ...OnboardingAppSelectorApp_service\n    id\n  }\n}\n\nfragment OnboardingAppSelectorApp_service on ServiceNode {\n  name\n  logoLarge\n}\n"
  }
};
})();
(node as any).hash = '7820c139c0f6f1105404df673d3d037d';
export default node;
