/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainQueryVariables = {};
export type MainQueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"Sidebar_profile" | "AddUsers_currentUser">;
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
    ...AddUsers_currentUser
    id
  }
}

fragment AddUsers_currentUser on ProfileNode {
  ...UserForm_currentUser
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

fragment UserForm_currentUser on ProfileNode {
  organization {
    id
    departments {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "Sidebar_profile"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddUsers_currentUser"
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
          (v0/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "OrganizationNode",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "DepartmentNodeConnection",
                "kind": "LinkedField",
                "name": "departments",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DepartmentNodeEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DepartmentNode",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
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
    "cacheID": "b44fcbf6d66cdf92d6336dafbb9da714",
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  currentUser {\n    ...Sidebar_profile\n    ...AddUsers_currentUser\n    id\n  }\n}\n\nfragment AddUsers_currentUser on ProfileNode {\n  ...UserForm_currentUser\n}\n\nfragment Dropdown_profile on ProfileNode {\n  id\n}\n\nfragment Profile_profile on ProfileNode {\n  ...Dropdown_profile\n  firstName\n  lastName\n  title\n  image\n}\n\nfragment Sidebar_profile on ProfileNode {\n  ...Profile_profile\n}\n\nfragment UserForm_currentUser on ProfileNode {\n  organization {\n    id\n    departments {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '80d047e1a6583cdb315a3d4c5c842f70';
export default node;
