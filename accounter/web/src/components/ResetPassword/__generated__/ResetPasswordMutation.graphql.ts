/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ResetPasswordMutationVariables = {
    username: string;
    token: string;
    password: string;
};
export type ResetPasswordMutationResponse = {
    readonly resetPassword: {
        readonly status: string;
    } | null;
};
export type ResetPasswordMutation = {
    readonly response: ResetPasswordMutationResponse;
    readonly variables: ResetPasswordMutationVariables;
};



/*
mutation ResetPasswordMutation(
  $username: String!
  $token: String!
  $password: String!
) {
  resetPassword(username: $username, token: $token, password: $password) {
    status
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      },
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "ResetPassword",
    "kind": "LinkedField",
    "name": "resetPassword",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ResetPasswordMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ResetPasswordMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "fe5ef9b99388b2548c9e7123886766a9",
    "id": null,
    "metadata": {},
    "name": "ResetPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ResetPasswordMutation(\n  $username: String!\n  $token: String!\n  $password: String!\n) {\n  resetPassword(username: $username, token: $token, password: $password) {\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f30259f68ae856c4683455e78dc52d1';
export default node;
