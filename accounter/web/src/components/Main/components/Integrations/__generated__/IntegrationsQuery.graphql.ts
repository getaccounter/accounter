/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "GITHUB" | "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type IntegrationsQueryVariables = {};
export type IntegrationsQueryResponse = {
    readonly integrations: ReadonlyArray<{
        readonly name: string;
        readonly service: {
            readonly name: ServiceName;
        };
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
    name
    service {
      name
    }
    ...Integration_integration
    id
  }
}

fragment Integration_integration on IntegrationNode {
  id
  name
  hasValidToken
  service {
    name
    logo
  }
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
    "name": "IntegrationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "IntegrationNode",
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
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
              (v0/*: any*/)
            ],
            "storageKey": null
          },
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
        "concreteType": "IntegrationNode",
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
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
          },
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
            "name": "hasValidToken",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "52fbf2f855c7f0213460143863c2764d",
    "id": null,
    "metadata": {},
    "name": "IntegrationsQuery",
    "operationKind": "query",
    "text": "query IntegrationsQuery {\n  integrations {\n    name\n    service {\n      name\n    }\n    ...Integration_integration\n    id\n  }\n}\n\nfragment Integration_integration on IntegrationNode {\n  id\n  name\n  hasValidToken\n  service {\n    name\n    logo\n  }\n}\n"
  }
};
})();
(node as any).hash = '15fd5f58c6aa82d5ed649f3871efa959';
export default node;
