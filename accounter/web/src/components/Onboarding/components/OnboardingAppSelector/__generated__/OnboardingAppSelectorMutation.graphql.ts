/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ServiceEnum = "Atlassian" | "Figma" | "GitHub" | "Google" | "HubSpot" | "Intercom" | "Notion" | "Salesforce" | "Slack" | "Zoom" | "%future added value";
export type OnboardingAppSelectorMutationVariables = {
    apps: Array<ServiceEnum>;
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
  $apps: [ServiceEnum!]!
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
    "cacheID": "db7e8bf2f8a6794694457546c27cbafe",
    "id": null,
    "metadata": {},
    "name": "OnboardingAppSelectorMutation",
    "operationKind": "mutation",
    "text": "mutation OnboardingAppSelectorMutation(\n  $apps: [ServiceEnum!]!\n) {\n  onboardApps(apps: $apps) {\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '80092b39c3c2aa9b321896d36f33fe62';
export default node;
