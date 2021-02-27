/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContentQueryVariables = {
    profileId: string;
};
export type ContentQueryResponse = {
    readonly currentUser: {
        readonly organization: {
            readonly profile: {
                readonly " $fragmentRefs": FragmentRefs<"Header_profile" | "DescriptionList_profile" | "EditUser_profile" | "Accounts_profile">;
            } | null;
        };
    };
};
export type ContentQuery = {
    readonly response: ContentQueryResponse;
    readonly variables: ContentQueryVariables;
};



/*
query ContentQuery(
  $profileId: ID!
) {
  currentUser {
    organization {
      profile(id: $profileId) {
        ...Header_profile
        ...DescriptionList_profile
        ...EditUser_profile
        ...Accounts_profile
        id
      }
      id
    }
    id
  }
}

fragment Accounts_profile on ProfileNode {
  accounts {
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

fragment DescriptionList_profile on ProfileNode {
  firstName
  lastName
  email
  title
}

fragment EditUser_profile on ProfileNode {
  ...UserForm_profile
}

fragment Header_profile on ProfileNode {
  id
  image
  firstName
  lastName
  isAdmin
  currentUserCanEdit
  isOwner
}

fragment UserForm_profile on ProfileNode {
  id
  firstName
  lastName
  email
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "profileId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "profileId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContentQuery",
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
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ProfileNode",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Header_profile"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "DescriptionList_profile"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "EditUser_profile"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Accounts_profile"
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContentQuery",
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
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ProfileNode",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isOwner",
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "IntegrationNode",
                        "kind": "LinkedField",
                        "name": "integration",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ServiceNode",
                            "kind": "LinkedField",
                            "name": "service",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
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
                          (v2/*: any*/)
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
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5db0def837414d50f333364aa556a79b",
    "id": null,
    "metadata": {},
    "name": "ContentQuery",
    "operationKind": "query",
    "text": "query ContentQuery(\n  $profileId: ID!\n) {\n  currentUser {\n    organization {\n      profile(id: $profileId) {\n        ...Header_profile\n        ...DescriptionList_profile\n        ...EditUser_profile\n        ...Accounts_profile\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Accounts_profile on ProfileNode {\n  accounts {\n    integration {\n      name\n      service {\n        name\n        logo\n      }\n      id\n    }\n    username\n    role\n    externalProfile\n    isDisabled\n  }\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOwner\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n}\n"
  }
};
})();
(node as any).hash = '1f6aac5dcb866e6ecee50375b9c68323';
export default node;
