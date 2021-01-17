/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ServiceName = "SLACK" | "%future added value";
export type ServicesQueryVariables = {};
export type ServicesQueryResponse = {
    readonly services: ReadonlyArray<{
        readonly logo: string;
        readonly name: ServiceName;
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
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ServiceType",
    "kind": "LinkedField",
    "name": "services",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "logo",
        "storageKey": null
      },
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
        "name": "oauthUrl",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServicesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ServicesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "cd3ab3169ead67cff3268dc9872c5dcd",
    "id": null,
    "metadata": {},
    "name": "ServicesQuery",
    "operationKind": "query",
    "text": "query ServicesQuery {\n  services {\n    logo\n    name\n    oauthUrl\n  }\n}\n"
  }
};
})();
(node as any).hash = '02531c6ddfec85907f85061d128430c4';
export default node;
