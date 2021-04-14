/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "GITHUB" | "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type OnboardingAppSelectorApp_service = {
    readonly name: ServiceName;
    readonly logo: string;
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
      "name": "logo",
      "storageKey": null
    }
  ],
  "type": "ServiceNode",
  "abstractKey": null
};
(node as any).hash = '849efbb99773b4d39fe2836c9d6e943a';
export default node;
