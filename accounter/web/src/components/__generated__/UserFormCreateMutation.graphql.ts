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
    department?: string | null;
};
export type UserFormCreateMutationResponse = {
    readonly createUser: {
        readonly profile: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
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
  $department: ID
) {
  createUser(input: {email: $email, firstName: $firstName, lastName: $lastName, title: $title, department: $department}) {
    profile {
      id
      ...Content_profile
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
  }
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
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "department"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firstName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lastName"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v5 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "department",
        "variableName": "department"
      },
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserFormCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
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
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Content_profile"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserFormCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
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
              (v6/*: any*/),
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
                "name": "isOffboarded",
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
                "concreteType": "DepartmentNode",
                "kind": "LinkedField",
                "name": "department",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SlackAccountNode",
                "kind": "LinkedField",
                "name": "accounts",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SlackIntegrationNode",
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
                      (v6/*: any*/)
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
    "cacheID": "e348802cce884fe86865e7e9f1078f50",
    "id": null,
    "metadata": {},
    "name": "UserFormCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserFormCreateMutation(\n  $email: String!\n  $firstName: String!\n  $lastName: String!\n  $title: String\n  $department: ID\n) {\n  createUser(input: {email: $email, firstName: $firstName, lastName: $lastName, title: $title, department: $department}) {\n    profile {\n      id\n      ...Content_profile\n    }\n  }\n}\n\nfragment Accounts_profile on ProfileNode {\n  accounts {\n    id\n    integration {\n      name\n      service {\n        name\n        logo\n      }\n      id\n    }\n    username\n    role\n  }\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n  ...OffboardUser_profile\n  ...ReactivateUser_profile\n  ...Accounts_profile\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n  department {\n    name\n    id\n  }\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOffboarded\n  isOwner\n  isCurrentUser\n}\n\nfragment OffboardUser_profile on ProfileNode {\n  id\n  isOffboarded\n}\n\nfragment ReactivateUser_profile on ProfileNode {\n  id\n  isOffboarded\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n  department {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2c0a01ef75cd1fadf3e3eec715e27e67';
export default node;
