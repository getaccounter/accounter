/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ServiceEnum = "AWS" | "Aircall" | "Asana" | "Atlassian" | "BambooHR" | "Figma" | "GitHub" | "Google" | "HubSpot" | "Intercom" | "Notion" | "Salesforce" | "Slack" | "Zendesk" | "Zoom" | "%future added value";
export type ServicesQueryVariables = {};
export type ServicesQueryResponse = {
    readonly services: ReadonlyArray<{
        readonly logo: string;
        readonly name: ServiceEnum;
        readonly oauthUrl: string;
    }>;
};
export type ServicesQuery = {
    readonly response: ServicesQueryResponse;
    readonly variables: ServicesQueryVariables;
};



/*
query ServicesQuery {
  services {
    logo
    name
    oauthUrl
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "logo",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oauthUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServicesQuery",
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
          (v1/*: any*/),
          (v2/*: any*/)
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
    "name": "ServicesQuery",
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
          (v1/*: any*/),
          (v2/*: any*/),
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
    "cacheID": "66f62f72eced8b29c41d7cbeecb3975b",
    "id": null,
    "metadata": {},
    "name": "ServicesQuery",
    "operationKind": "query",
    "text": "query ServicesQuery {\n  services {\n    logo\n    name\n    oauthUrl\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '02531c6ddfec85907f85061d128430c4';
export default node;
