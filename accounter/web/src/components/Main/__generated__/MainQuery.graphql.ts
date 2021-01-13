/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainQueryVariables = {};
export type MainQueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"Sidebar_profile">;
    };
};
export type MainQuery = {
    readonly response: MainQueryResponse;
    readonly variables: MainQueryVariables;
};



/*
query MainQuery {
  currentUser {
    ...Sidebar_profile
    id
  }
}

fragment Profile_profile on ProfileNode {
  email
  firstName
  lastName
}

fragment Sidebar_profile on ProfileNode {
  ...Profile_profile
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ProfileNode",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Sidebar_profile"
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
    "name": "MainQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ProfileNode",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "983b1812bc4b67bbfff48ce4b3a13529",
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  currentUser {\n    ...Sidebar_profile\n    id\n  }\n}\n\nfragment Profile_profile on ProfileNode {\n  email\n  firstName\n  lastName\n}\n\nfragment Sidebar_profile on ProfileNode {\n  ...Profile_profile\n}\n"
  }
};
(node as any).hash = 'dfb3b18599f4d6581922b466f3bdfb59';
export default node;
