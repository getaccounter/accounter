/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainQueryVariables = {};
export type MainQueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"Sidebar_profile" | "Users_currentUser" | "AddUsers_currentUser">;
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
    ...Users_currentUser
    ...AddUsers_currentUser
    id
  }
}

fragment AddUsers_currentUser on ProfileNode {
  ...UserForm_currentUser
}

fragment Content_currentUser on ProfileNode {
  ...EditUser_currentUser
}

fragment Content_profile on ProfileNode {
  ...Header_profile
  ...DescriptionList_profile
  ...EditUser_profile
  ...OffboardUser_profile
}

fragment DescriptionList_profile on ProfileNode {
  firstName
  lastName
  email
  title
  department {
    name
    id
  }
}

fragment Dropdown_profile on ProfileNode {
  id
}

fragment EditUser_currentUser on ProfileNode {
  ...UserForm_currentUser
}

fragment EditUser_profile on ProfileNode {
  ...UserForm_profile
}

fragment Header_profile on ProfileNode {
  firstName
  lastName
  isAdmin
  currentUserCanEdit
  isActive
  isOwner
  isCurrentUser
}

fragment OffboardUser_profile on ProfileNode {
  id
  isActive
}

fragment Profile_profile on ProfileNode {
  ...Dropdown_profile
  firstName
  lastName
  title
}

fragment Sidebar_profile on ProfileNode {
  ...Profile_profile
}

fragment UserDirectory_profiles on ProfileNodeConnection {
  totalCount
  edges {
    node {
      id
      lastName
      isActive
      ...User_profile
    }
  }
}

fragment UserForm_currentUser on ProfileNode {
  isOwner
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

fragment UserForm_profile on ProfileNode {
  id
  firstName
  lastName
  email
  title
  isAdmin
  department {
    id
  }
}

fragment User_profile on ProfileNode {
  id
  firstName
  lastName
  title
  isAdmin
}

fragment Users_currentUser on ProfileNode {
  ...Content_currentUser
  organization {
    profiles(first: 100) {
      edges {
        node {
          id
          ...Content_profile
          __typename
        }
        cursor
      }
      ...UserDirectory_profiles
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    id
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOwner",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
];
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
            "name": "Users_currentUser"
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
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "ProfileNodeConnection",
                "kind": "LinkedField",
                "name": "profiles",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProfileNodeEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ProfileNode",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v1/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAdmin",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "currentUserCanEdit",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isActive",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isCurrentUser",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "email",
                            "storageKey": null
                          },
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DepartmentNode",
                            "kind": "LinkedField",
                            "name": "department",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v0/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "profiles(first:100)"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Users_profiles",
                "kind": "LinkedHandle",
                "name": "profiles"
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
    "cacheID": "4d19e5694cf29b967ac9c585f1a1b9e3",
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  currentUser {\n    ...Sidebar_profile\n    ...Users_currentUser\n    ...AddUsers_currentUser\n    id\n  }\n}\n\nfragment AddUsers_currentUser on ProfileNode {\n  ...UserForm_currentUser\n}\n\nfragment Content_currentUser on ProfileNode {\n  ...EditUser_currentUser\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n  ...OffboardUser_profile\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n  department {\n    name\n    id\n  }\n}\n\nfragment Dropdown_profile on ProfileNode {\n  id\n}\n\nfragment EditUser_currentUser on ProfileNode {\n  ...UserForm_currentUser\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isActive\n  isOwner\n  isCurrentUser\n}\n\nfragment OffboardUser_profile on ProfileNode {\n  id\n  isActive\n}\n\nfragment Profile_profile on ProfileNode {\n  ...Dropdown_profile\n  firstName\n  lastName\n  title\n}\n\nfragment Sidebar_profile on ProfileNode {\n  ...Profile_profile\n}\n\nfragment UserDirectory_profiles on ProfileNodeConnection {\n  totalCount\n  edges {\n    node {\n      id\n      lastName\n      isActive\n      ...User_profile\n    }\n  }\n}\n\nfragment UserForm_currentUser on ProfileNode {\n  isOwner\n  organization {\n    id\n    departments {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n  isAdmin\n  department {\n    id\n  }\n}\n\nfragment User_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  title\n  isAdmin\n}\n\nfragment Users_currentUser on ProfileNode {\n  ...Content_currentUser\n  organization {\n    profiles(first: 100) {\n      edges {\n        node {\n          id\n          ...Content_profile\n          __typename\n        }\n        cursor\n      }\n      ...UserDirectory_profiles\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ce54f8f04c3b2ce1830aeeff7ac287c5';
export default node;
