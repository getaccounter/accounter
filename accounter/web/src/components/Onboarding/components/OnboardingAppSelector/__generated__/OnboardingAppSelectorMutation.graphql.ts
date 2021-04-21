/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Type = "GITHUB" | "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type OnboardingAppSelectorMutationVariables = {
    apps: Array<Type>;
};
export type OnboardingAppSelectorMutationResponse = {
    readonly onboardApps: {
        readonly status: string;
    } | null;
};
export type OnboardingAppSelectorMutation = {
    readonly response: OnboardingAppSelectorMutationResponse;
    readonly variables: OnboardingAppSelectorMutationVariables;
};



/*
mutation OnboardingAppSelectorMutation(
  $apps: [Type!]!
) {
  onboardApps(apps: $apps) {
    status
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "apps"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "apps",
        "variableName": "apps"
      }
    ],
    "concreteType": "OnboardApps",
    "kind": "LinkedField",
    "name": "onboardApps",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingAppSelectorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OnboardingAppSelectorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "445371e04643dbbe4fb47f8833401073",
    "id": null,
    "metadata": {},
    "name": "OnboardingAppSelectorMutation",
    "operationKind": "mutation",
    "text": "mutation OnboardingAppSelectorMutation(\n  $apps: [Type!]!\n) {\n  onboardApps(apps: $apps) {\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '55de99eb2c11bb221d96817b0c262b02';
export default node;
