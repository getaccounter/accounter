/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserFormUpdateMutationVariables = {
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    title?: string | null;
    department?: string | null;
    isAdmin?: boolean | null;
};
export type UserFormUpdateMutationResponse = {
    readonly updateUser: {
        readonly profile: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
        };
    } | null;
};
export type UserFormUpdateMutation = {
    readonly response: UserFormUpdateMutationResponse;
    readonly variables: UserFormUpdateMutationVariables;
};



/*
mutation UserFormUpdateMutation(
  $id: ID!
  $email: String
  $firstName: String
  $lastName: String
  $title: String
  $department: ID
  $isAdmin: Boolean
) {
  updateUser(input: {id: $id, email: $email, firstName: $firstName, lastName: $lastName, title: $title, department: $department, isAdmin: $isAdmin}) {
    profile {
      id
      ...Content_profile
    }
  }
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
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isAdmin"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lastName"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v7 = [
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "isAdmin",
        "variableName": "isAdmin"
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserFormUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "updateUser",
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
              (v8/*: any*/),
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
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserFormUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "updateUser",
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
              (v8/*: any*/),
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
                "name": "isActive",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
    "cacheID": "47fa8f4dec2c99eff7725f1d636f7fe1",
    "id": null,
    "metadata": {},
    "name": "UserFormUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation UserFormUpdateMutation(\n  $id: ID!\n  $email: String\n  $firstName: String\n  $lastName: String\n  $title: String\n  $department: ID\n  $isAdmin: Boolean\n) {\n  updateUser(input: {id: $id, email: $email, firstName: $firstName, lastName: $lastName, title: $title, department: $department, isAdmin: $isAdmin}) {\n    profile {\n      id\n      ...Content_profile\n    }\n  }\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n  ...OffboardUser_profile\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n  department {\n    name\n    id\n  }\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isActive\n  isOwner\n  isCurrentUser\n}\n\nfragment OffboardUser_profile on ProfileNode {\n  id\n  isActive\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n  isAdmin\n  department {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '46e6a417cfba658268f8cf02e01ab8e7';
export default node;
