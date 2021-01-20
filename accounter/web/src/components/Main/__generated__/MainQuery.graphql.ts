/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainQueryVariables = {};
export type MainQueryResponse = {
    readonly currentUser: {
        readonly organization: {
            readonly " $fragmentRefs": FragmentRefs<"Users_organization" | "AddUsers_organization">;
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
    ...Sidebar_profile
    organization {
      ...Users_organization
      ...AddUsers_organization
      id
    }
    id
  }
}

fragment AddUsers_organization on OrganizationNode {
  ...UserForm_organization
}

fragment Content_organization on OrganizationNode {
  ...EditUser_organization
}

fragment Content_profile on ProfileNode {
  ...Header_profile
  ...DescriptionList_profile
  ...EditUser_profile
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

fragment EditUser_organization on OrganizationNode {
  ...UserForm_organization
}

fragment EditUser_profile on ProfileNode {
  ...UserForm_profile
}

fragment Header_profile on ProfileNode {
  firstName
  lastName
  isAdmin
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
      ...User_profile
    }
  }
}

fragment UserForm_organization on OrganizationNode {
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

fragment UserForm_profile on ProfileNode {
  id
  firstName
  lastName
  email
  title
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

fragment Users_organization on OrganizationNode {
  ...Content_organization
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
  "name": "name",
  "storageKey": null
},
v5 = [
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
            "alias": null,
            "args": null,
            "concreteType": "OrganizationNode",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Users_organization"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AddUsers_organization"
              }
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
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
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
                          (v4/*: any*/)
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
                "args": (v5/*: any*/),
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
                              (v4/*: any*/),
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
                "args": (v5/*: any*/),
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
    "cacheID": "a87820399fb3807dc5c9c12a2bd96a3b",
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  currentUser {\n    ...Sidebar_profile\n    organization {\n      ...Users_organization\n      ...AddUsers_organization\n      id\n    }\n    id\n  }\n}\n\nfragment AddUsers_organization on OrganizationNode {\n  ...UserForm_organization\n}\n\nfragment Content_organization on OrganizationNode {\n  ...EditUser_organization\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n  department {\n    name\n    id\n  }\n}\n\nfragment Dropdown_profile on ProfileNode {\n  id\n}\n\nfragment EditUser_organization on OrganizationNode {\n  ...UserForm_organization\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  firstName\n  lastName\n  isAdmin\n}\n\nfragment Profile_profile on ProfileNode {\n  ...Dropdown_profile\n  firstName\n  lastName\n  title\n}\n\nfragment Sidebar_profile on ProfileNode {\n  ...Profile_profile\n}\n\nfragment UserDirectory_profiles on ProfileNodeConnection {\n  totalCount\n  edges {\n    node {\n      id\n      lastName\n      ...User_profile\n    }\n  }\n}\n\nfragment UserForm_organization on OrganizationNode {\n  id\n  departments {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n  department {\n    id\n  }\n}\n\nfragment User_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  title\n  isAdmin\n}\n\nfragment Users_organization on OrganizationNode {\n  ...Content_organization\n  profiles(first: 100) {\n    edges {\n      node {\n        id\n        ...Content_profile\n        __typename\n      }\n      cursor\n    }\n    ...UserDirectory_profiles\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '03b3d72ebd1b23596e8ac6d506f6cf95';
export default node;
