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
                        readonly " $fragmentRefs": FragmentRefs<"Content_profile" | "Content_profileList">;
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
            ...Content_profileList
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

fragment Accounts_profile on ProfileNode {
  accounts {
    id
    integration {
      name
      service {
        name
        logo
      }
      id
    }
    username
    role
    externalProfile
    isDisabled
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
  ...Accounts_profile
}

fragment Content_profileList on ProfileNode {
  ...EditUser_profileList
}

fragment DescriptionList_profile on ProfileNode {
  firstName
  lastName
  email
  title
}

fragment EditUser_currentUser on ProfileNode {
  ...UserForm_currentUser
}

fragment EditUser_profile on ProfileNode {
  ...UserForm_profile
}

fragment EditUser_profileList on ProfileNode {
  ...UserForm_profileList
}

fragment Header_currentUser on ProfileNode {
  isOwner
}

fragment Header_profile on ProfileNode {
  id
  image
  firstName
  lastName
  isAdmin
  currentUserCanEdit
  isOwner
  isCurrentUser
}

fragment UserDirectory_profiles on ProfileNodeConnection {
  totalCount
  edges {
    node {
      id
      lastName
      firstName
      email
      accounts {
        isDisabled
      }
      ...User_profile
    }
  }
}

fragment UserForm_currentUser on ProfileNode {
  organization {
    id
  }
}

fragment UserForm_profile on ProfileNode {
  id
  firstName
  lastName
  email
  title
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
  "name": "isOwner",
  "storageKey": null
},
v6 = {
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
                          },
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Content_profileList"
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
                          (v0/*: any*/),
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
                          (v5/*: any*/),
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
                            "concreteType": "AccountNode",
                            "kind": "LinkedField",
                            "name": "accounts",
                            "plural": true,
                            "selections": [
                              (v0/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "IntegrationNode",
                                "kind": "LinkedField",
                                "name": "integration",
                                "plural": false,
                                "selections": [
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ServiceNode",
                                    "kind": "LinkedField",
                                    "name": "service",
                                    "plural": false,
                                    "selections": [
                                      (v6/*: any*/),
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
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "username",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "role",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "externalProfile",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isDisabled",
                                "storageKey": null
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
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Users_profiles",
                "kind": "LinkedHandle",
                "name": "profiles"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3a1e47d0df6bdbef9ef2f13a28adcf52",
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
    "text": "query UsersQuery {\n  currentUser {\n    ...Content_currentUser\n    organization {\n      profiles(first: 100) {\n        edges {\n          node {\n            id\n            ...Content_profile\n            ...Content_profileList\n            __typename\n          }\n          cursor\n        }\n        ...UserDirectory_profiles\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Accounts_profile on ProfileNode {\n  accounts {\n    id\n    integration {\n      name\n      service {\n        name\n        logo\n      }\n      id\n    }\n    username\n    role\n    externalProfile\n    isDisabled\n  }\n}\n\nfragment Content_currentUser on ProfileNode {\n  ...EditUser_currentUser\n  ...Header_currentUser\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n  ...Accounts_profile\n}\n\nfragment Content_profileList on ProfileNode {\n  ...EditUser_profileList\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n}\n\nfragment EditUser_currentUser on ProfileNode {\n  ...UserForm_currentUser\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment EditUser_profileList on ProfileNode {\n  ...UserForm_profileList\n}\n\nfragment Header_currentUser on ProfileNode {\n  isOwner\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOwner\n  isCurrentUser\n}\n\nfragment UserDirectory_profiles on ProfileNodeConnection {\n  totalCount\n  edges {\n    node {\n      id\n      lastName\n      firstName\n      email\n      accounts {\n        isDisabled\n      }\n      ...User_profile\n    }\n  }\n}\n\nfragment UserForm_currentUser on ProfileNode {\n  organization {\n    id\n  }\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n}\n\nfragment UserForm_profileList on ProfileNode {\n  id\n  ...UserSelect_profileList\n}\n\nfragment UserSelect_profileList on ProfileNode {\n  id\n  firstName\n  lastName\n  image\n}\n\nfragment User_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  title\n  isAdmin\n  isOwner\n}\n"
  }
};
})();
(node as any).hash = '622b6a37d7a89dc0c03f75849e86e560';
export default node;
