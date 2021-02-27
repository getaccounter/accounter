/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeaderAdminMutationVariables = {
    id: string;
    isAdmin: boolean;
};
export type HeaderAdminMutationResponse = {
    readonly updateUser: {
        readonly profiles: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"Header_profile" | "DescriptionList_profile" | "EditUser_profile" | "Accounts_profile">;
        } | null>;
    } | null;
};
export type HeaderAdminMutation = {
    readonly response: HeaderAdminMutationResponse;
    readonly variables: HeaderAdminMutationVariables;
};



/*
mutation HeaderAdminMutation(
  $id: ID!
  $isAdmin: Boolean!
) {
  updateUser(input: {id: $id, isAdmin: $isAdmin}) {
    profiles {
      id
      ...Header_profile
      ...DescriptionList_profile
      ...EditUser_profile
      ...Accounts_profile
    }
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
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isAdmin"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "isAdmin",
        "variableName": "isAdmin"
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HeaderAdminMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
            "name": "profiles",
            "plural": true,
            "selections": [
              (v2/*: any*/),
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeaderAdminMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
            "name": "profiles",
            "plural": true,
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "21d9384317c915426cd2a22d59df3559",
    "id": null,
    "metadata": {},
    "name": "HeaderAdminMutation",
    "operationKind": "mutation",
    "text": "mutation HeaderAdminMutation(\n  $id: ID!\n  $isAdmin: Boolean!\n) {\n  updateUser(input: {id: $id, isAdmin: $isAdmin}) {\n    profiles {\n      id\n      ...Header_profile\n      ...DescriptionList_profile\n      ...EditUser_profile\n      ...Accounts_profile\n    }\n  }\n}\n\nfragment Accounts_profile on ProfileNode {\n  accounts {\n    integration {\n      name\n      service {\n        name\n        logo\n      }\n      id\n    }\n    username\n    role\n    externalProfile\n    isDisabled\n  }\n}\n\nfragment DescriptionList_profile on ProfileNode {\n  firstName\n  lastName\n  email\n  title\n}\n\nfragment EditUser_profile on ProfileNode {\n  ...UserForm_profile\n}\n\nfragment Header_profile on ProfileNode {\n  id\n  image\n  firstName\n  lastName\n  isAdmin\n  currentUserCanEdit\n  isOwner\n}\n\nfragment UserForm_profile on ProfileNode {\n  id\n  firstName\n  lastName\n  email\n  title\n}\n"
  }
};
})();
(node as any).hash = 'a16a85990e1526d9ebc2302a52a95d42';
export default node;
