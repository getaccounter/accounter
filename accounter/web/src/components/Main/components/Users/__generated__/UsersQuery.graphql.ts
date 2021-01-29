/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UsersQueryVariables = {};
export type UsersQueryResponse = {
    readonly currentUser: {
        readonly organization: {
            readonly profiles: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                        readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
                    } | null;
                } | null>;
                readonly " $fragmentRefs": FragmentRefs<"UserDirectory_profiles">;
            };
        };
        readonly " $fragmentRefs": FragmentRefs<"Content_currentUser">;
    };
};
export type UsersQuery = {
    readonly response: UsersQueryResponse;
    readonly variables: UsersQueryVariables;
};



/*
query UsersQuery {
  currentUser {
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
    id
  }
}

fragment AccountList_accounts on AccountInterface {
  __isAccountInterface: __typename
  id
  ...Account_account
}

fragment Account_account on AccountInterface {
  __isAccountInterface: __typename
  id
  integration {
    __typename
    name
    service {
      name
      logo
    }
    id
  }
  ... on SlackAccountNode {
    username
    email
  }
}

fragment Accounts_profile on ProfileNode {
  accounts {
    __typename
    ...AccountList_accounts
    id
  }
}

fragment Content_currentUser on ProfileNode {
  ...EditUser_currentUser
  ...Header_currentUser
}

fragment Content_profile on ProfileNode {
  ...Header_profile
  ...DescriptionList_profile
  ...EditUser_profile
  ...OffboardUser_profile
  ...ReactivateUser_profile
  ...Accounts_profile
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

fragment EditUser_currentUser on ProfileNode {
  ...UserForm_currentUser
}

fragment EditUser_profile on ProfileNode {
  ...UserForm_profile
}

fragment Header_currentUser on ProfileNode {
  isOwner
}

fragment Header_profile on ProfileNode {
  id
  firstName
  lastName
  isAdmin
  currentUserCanEdit
  isOffboarded
  isOwner
  isCurrentUser
}

fragment OffboardUser_profile on ProfileNode {
  id
  isOffboarded
}

fragment ReactivateUser_profile on ProfileNode {
  id
  isOffboarded
}

fragment UserDirectory_profiles on ProfileNodeConnection {
  totalCount
  edges {
    node {
      id
      lastName
      isOffboarded
      ...User_profile
    }
  }
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
  isOwner
  isOffboarded
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
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
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
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOwner",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersQuery",
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
                "alias": "profiles",
                "args": null,
                "concreteType": "ProfileNodeConnection",
                "kind": "LinkedField",
                "name": "__Users_profiles_connection",
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
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Content_profile"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "UserDirectory_profiles"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Content_currentUser"
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
    "name": "UsersQuery",
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
                            "name": "isOffboarded",
                            "storageKey": null
                          },
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isCurrentUser",
                            "storageKey": null
                          },
                          (v7/*: any*/),
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "accounts",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isAccountInterface"
                              },
                              (v0/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "integration",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ServiceNode",
                                    "kind": "LinkedField",
                                    "name": "service",
                                    "plural": false,
                                    "selections": [
                                      (v4/*: any*/),
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
                                  (v0/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "username",
                                    "storageKey": null
                                  },
                                  (v7/*: any*/)
                                ],
                                "type": "SlackAccountNode",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                  (v3/*: any*/)
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
          },
          (v6/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fa6f0339ab56c425e8c57e027435b92e",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "currentUser",
            "organization",
            "profiles"
          ]
        }
      ]
    },
    "name": "UsersQuery",
    "operationKind": "query",
    "text": "query UsersQuery {\n  currentUser {\n    ...Content_currentUser\n    organization {\n      profiles(first: 100) {\n        edges {\n          node {\n            id\n            ...Content_profile\n            __typename\n          }\n          cursor\n        }\n        ...UserDirectory_profiles\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment AccountList_accounts on AccountInterface {\n  __isAccountInterface: __typename\n  id\n  ...Account_account\n}\n\nfragment Account_account on AccountInterface {\n  __isAccountInterface: __typename\n  id\n  integration {\n    __typename\n    name\n    service {\n      name\n      logo\n    }\n    id\n  }\n  ... on SlackAccountNode {\n    username\n    email\n  }\n}\n\nfragment Accounts_profile on ProfileNode {\n  accounts {\n    __typename\n    ...AccountList_accounts\n    id\n  }\n}\n\nfragment Content_currentUser on ProfileNode {\n  ...EditUser_currentUser\n  ...Header_currentUser\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n  ...OffboardUser_profile\n  ...ReactivateUser_profile\n  ...Accounts_profile\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n  department {\n    name\n    id\n  }\n}\n\nfragment EditUser_currentUser on ProfileNode {\n  ...UserForm_currentUser\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_currentUser on ProfileNode {\n  isOwner\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOffboarded\n  isOwner\n  isCurrentUser\n}\n\nfragment OffboardUser_profile on ProfileNode {\n  id\n  isOffboarded\n}\n\nfragment ReactivateUser_profile on ProfileNode {\n  id\n  isOffboarded\n}\n\nfragment UserDirectory_profiles on ProfileNodeConnection {\n  totalCount\n  edges {\n    node {\n      id\n      lastName\n      isOffboarded\n      ...User_profile\n    }\n  }\n}\n\nfragment UserForm_currentUser on ProfileNode {\n  organization {\n    id\n    departments {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n  department {\n    id\n  }\n}\n\nfragment User_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  title\n  isAdmin\n  isOwner\n  isOffboarded\n}\n"
  }
};
})();
(node as any).hash = '34efbe5e69d7b45078b28aba8e86b97b';
export default node;
