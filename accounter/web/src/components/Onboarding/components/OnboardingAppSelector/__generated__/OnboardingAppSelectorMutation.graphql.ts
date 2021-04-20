/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Types = "GITHUB" | "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type OnboardingAppSelectorMutationVariables = {
    apps: Array<Types>;
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
  $apps: [Types!]!
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
    "cacheID": "4d77f00448bc21bb8d72bc0fe619c4e4",
    "id": null,
    "metadata": {},
    "name": "OnboardingAppSelectorMutation",
    "operationKind": "mutation",
    "text": "mutation OnboardingAppSelectorMutation(\n  $apps: [Types!]!\n) {\n  onboardApps(apps: $apps) {\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '375bbf190a9b507198dbefd6ee2ea32f';
export default node;
