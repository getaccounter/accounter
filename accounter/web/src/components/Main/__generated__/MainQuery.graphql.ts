/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainQueryVariables = {};
export type MainQueryResponse = {
    readonly currentUser: {
        readonly organization: {
            readonly isBetaUser: boolean;
        };
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
    organization {
      isBetaUser
      id
    }
    ...Sidebar_profile
    id
  }
}

fragment Dropdown_profile on ProfileNode {
  id
}

fragment Profile_profile on ProfileNode {
  ...Dropdown_profile
  firstName
  lastName
  title
  image
}

fragment Sidebar_profile on ProfileNode {
  ...Profile_profile
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isBetaUser",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
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
            "alias": null,
            "args": null,
            "concreteType": "OrganizationNode",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
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
            "concreteType": "OrganizationNode",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/),
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "image",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2d3ea9c5dd75cb88d514ce84cf836c79",
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  currentUser {\n    organization {\n      isBetaUser\n      id\n    }\n    ...Sidebar_profile\n    id\n  }\n}\n\nfragment Dropdown_profile on ProfileNode {\n  id\n}\n\nfragment Profile_profile on ProfileNode {\n  ...Dropdown_profile\n  firstName\n  lastName\n  title\n  image\n}\n\nfragment Sidebar_profile on ProfileNode {\n  ...Profile_profile\n}\n"
  }
};
})();
(node as any).hash = '26bde995436c1055f67d95dd745404b0';
export default node;
