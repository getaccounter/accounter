/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserFormCreateMutationVariables = {
    email: string;
    firstName: string;
    lastName: string;
    title?: string | null;
};
export type UserFormCreateMutationResponse = {
    readonly createUser: {
        readonly profile: {
            readonly id: string;
            readonly lastName: string | null;
            readonly firstName: string | null;
            readonly email: string;
            readonly hasActiveAccounts: boolean;
            readonly " $fragmentRefs": FragmentRefs<"Header_profile" | "DescriptionList_profile" | "EditUser_profile" | "Accounts_profile" | "User_profile">;
        };
    } | null;
};
export type UserFormCreateMutation = {
    readonly response: UserFormCreateMutationResponse;
    readonly variables: UserFormCreateMutationVariables;
};



/*
mutation UserFormCreateMutation(
  $email: String!
  $firstName: String!
  $lastName: String!
  $title: String
) {
  createUser(input: {email: $email, firstName: $firstName, lastName: $lastName, title: $title}) {
    profile {
      id
      ...Header_profile
      ...DescriptionList_profile
      ...EditUser_profile
      ...Accounts_profile
      lastName
      firstName
      email
      hasActiveAccounts
      ...User_profile
    }
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
  isCurrentUser
}

fragment UserForm_profile on ProfileNode {
  id
  firstName
  lastName
  email
  title
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "firstName"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "lastName"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "firstName",
        "variableName": "firstName"
      },
      {
        "kind": "Variable",
        "name": "lastName",
        "variableName": "lastName"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
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
  "name": "lastName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasActiveAccounts",
  "storageKey": null
},
v7 = {
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
    "name": "UserFormCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserPayload",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProfileNode",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "User_profile"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFormCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserPayload",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
              (v4/*: any*/),
              (v3/*: any*/),
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
                "name": "isCurrentUser",
                "storageKey": null
              },
              (v5/*: any*/),
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IntegrationNode",
                    "kind": "LinkedField",
                    "name": "integration",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ServiceNode",
                        "kind": "LinkedField",
                        "name": "service",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
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
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "012d5c93bf1c71bd2ade558002ea4463",
    "id": null,
    "metadata": {},
    "name": "UserFormCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserFormCreateMutation(\n  $email: String!\n  $firstName: String!\n  $lastName: String!\n  $title: String\n) {\n  createUser(input: {email: $email, firstName: $firstName, lastName: $lastName, title: $title}) {\n    profile {\n      id\n      ...Header_profile\n      ...DescriptionList_profile\n      ...EditUser_profile\n      ...Accounts_profile\n      lastName\n      firstName\n      email\n      hasActiveAccounts\n      ...User_profile\n    }\n  }\n}\n\nfragment Accounts_profile on ProfileNode {\n  accounts {\n    id\n    integration {\n      name\n      service {\n        name\n        logo\n      }\n      id\n    }\n    username\n    role\n    externalProfile\n    isDisabled\n  }\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOwner\n  isCurrentUser\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n}\n\nfragment User_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  title\n  isAdmin\n  isOwner\n}\n"
  }
};
})();
(node as any).hash = '646e90e21a5e78226bf147708a048962';
export default node;
