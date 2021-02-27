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
                        readonly " $fragmentRefs": FragmentRefs<"Content_profileList">;
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
            ...Content_profileList
            id
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

fragment Content_currentUser on ProfileNode {
  ...Header_currentUser
}

fragment Content_profileList on ProfileNode {
  ...EditUser_profileList
}

fragment EditUser_profileList on ProfileNode {
  ...UserForm_profileList
}

fragment Header_currentUser on ProfileNode {
  isOwner
}

fragment UserDirectory_profiles on ProfileNodeConnection {
  totalCount
  edges {
    node {
      id
      lastName
      firstName
      email
      hasActiveAccounts
      ...User_profile
    }
  }
}

fragment UserForm_profileList on ProfileNode {
  id
  ...UserSelect_profileList
}

fragment UserSelect_profileList on ProfileNode {
  id
  firstName
  lastName
  image
}

fragment User_profile on ProfileNode {
  id
  image
  firstName
  lastName
  title
  isAdmin
  isOwner
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v2 = {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOwner",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v5 = {
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
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Content_profileList"
                          }
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "OrganizationNode",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v4/*: any*/),
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
                          (v5/*: any*/),
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
                            "name": "image",
                            "storageKey": null
                          },
                          (v0/*: any*/),
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
                            "name": "hasActiveAccounts",
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
                            "name": "isAdmin",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
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
                  (v2/*: any*/)
                ],
                "storageKey": "profiles(first:100)"
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Users_profiles",
                "kind": "LinkedHandle",
                "name": "profiles"
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6a067157d08a4531ac40d56e0058fa20",
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
    "text": "query UsersQuery {\n  currentUser {\n    ...Content_currentUser\n    organization {\n      profiles(first: 100) {\n        edges {\n          node {\n            ...Content_profileList\n            id\n            __typename\n          }\n          cursor\n        }\n        ...UserDirectory_profiles\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Content_currentUser on ProfileNode {\n  ...Header_currentUser\n}\n\nfragment Content_profileList on ProfileNode {\n  ...EditUser_profileList\n}\n\nfragment EditUser_profileList on ProfileNode {\n  ...UserForm_profileList\n}\n\nfragment Header_currentUser on ProfileNode {\n  isOwner\n}\n\nfragment UserDirectory_profiles on ProfileNodeConnection {\n  totalCount\n  edges {\n    node {\n      id\n      lastName\n      firstName\n      email\n      hasActiveAccounts\n      ...User_profile\n    }\n  }\n}\n\nfragment UserForm_profileList on ProfileNode {\n  id\n  ...UserSelect_profileList\n}\n\nfragment UserSelect_profileList on ProfileNode {\n  id\n  firstName\n  lastName\n  image\n}\n\nfragment User_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  title\n  isAdmin\n  isOwner\n}\n"
  }
};
})();
(node as any).hash = '7780999fa2122c4ea6e2365faabaa65c';
export default node;
