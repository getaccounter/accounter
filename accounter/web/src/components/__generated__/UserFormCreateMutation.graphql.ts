/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
            readonly email: string;
            readonly firstName: string;
            readonly lastName: string;
            readonly title: string | null;
            readonly department: {
                readonly name: string;
            } | null;
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
      email
      firstName
      lastName
      title
      department {
        name
        id
      }
    }
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
  "name": "email",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "DepartmentNode",
                "kind": "LinkedField",
                "name": "department",
                "plural": false,
                "selections": [
                  (v11/*: any*/)
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "DepartmentNode",
                "kind": "LinkedField",
                "name": "department",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v6/*: any*/)
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
    "cacheID": "fe4903d4d1e6a6fe67784c640702a5bc",
    "id": null,
    "metadata": {},
    "name": "UserFormCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserFormCreateMutation(\n  $email: String!\n  $firstName: String!\n  $lastName: String!\n  $title: String\n  $department: ID\n) {\n  createUser(input: {email: $email, firstName: $firstName, lastName: $lastName, title: $title, department: $department}) {\n    profile {\n      id\n      email\n      firstName\n      lastName\n      title\n      department {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a0c93ad8a06354c197a4254f3b16a1d6';
export default node;
