/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceEnum = "Atlassian" | "GitHub" | "Google" | "HubSpot" | "Salesforce" | "Slack" | "Zoom" | "%future added value";
export type OnboardingAppSelectorApp_service = {
    readonly name: ServiceEnum;
    readonly logoLarge: string;
    readonly " $refType": "OnboardingAppSelectorApp_service";
};
export type OnboardingAppSelectorApp_service$data = OnboardingAppSelectorApp_service;
export type OnboardingAppSelectorApp_service$key = {
    readonly " $data"?: OnboardingAppSelectorApp_service$data;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingAppSelectorApp_service">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OnboardingAppSelectorApp_service",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "logoLarge",
      "storageKey": null
    }
  ],
  "type": "ServiceNode",
  "abstractKey": null
};
(node as any).hash = '9ac94ac911baf7b6455f8eebc19a80cf';
export default node;
