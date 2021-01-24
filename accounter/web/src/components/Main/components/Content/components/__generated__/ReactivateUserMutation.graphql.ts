/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReactivateUserMutationVariables = {
    id: string;
};
export type ReactivateUserMutationResponse = {
    readonly reactivateUser: {
        readonly profile: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"Content_profile">;
        };
    } | null;
};
export type ReactivateUserMutation = {
    readonly response: ReactivateUserMutationResponse;
    readonly variables: ReactivateUserMutationVariables;
};



/*
mutation ReactivateUserMutation(
  $id: ID!
) {
  reactivateUser(input: {id: $id}) {
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
  ...ReactivateUser_profile
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReactivateUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReactivateUserPayload",
        "kind": "LinkedField",
        "name": "reactivateUser",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReactivateUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReactivateUserPayload",
        "kind": "LinkedField",
        "name": "reactivateUser",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
    "cacheID": "c4e7a2fdb2fcb00110a19c38376f596d",
    "id": null,
    "metadata": {},
    "name": "ReactivateUserMutation",
    "operationKind": "mutation",
    "text": "mutation ReactivateUserMutation(\n  $id: ID!\n) {\n  reactivateUser(input: {id: $id}) {\n    profile {\n      id\n      ...Content_profile\n    }\n  }\n}\n\nfragment Content_profile on ProfileNode {\n  ...Header_profile\n  ...DescriptionList_profile\n  ...EditUser_profile\n  ...OffboardUser_profile\n  ...ReactivateUser_profile\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n  department {\n    name\n    id\n  }\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOffboarded\n  isOwner\n  isCurrentUser\n}\n\nfragment OffboardUser_profile on ProfileNode {\n  id\n  isOffboarded\n}\n\nfragment ReactivateUser_profile on ProfileNode {\n  id\n  isOffboarded\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n  department {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '7491e57927e4f6517461a3eb197d1a46';
export default node;