/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "SLACK" | "%future added value";
export type Integration_integration = {
    readonly service: {
        readonly name: ServiceName;
        readonly logo: string;
    };
    readonly " $refType": "Integration_integration";
};
export type Integration_integration$data = Integration_integration;
export type Integration_integration$key = {
    readonly " $data"?: Integration_integration$data;
    readonly " $fragmentRefs": FragmentRefs<"Integration_integration">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Integration_integration",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceType",
      "kind": "LinkedField",
      "name": "service",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "IntegrationInterface",
  "abstractKey": "__isIntegrationInterface"
};
(node as any).hash = '5f9dcc326d085a56214449248a82dd2a';
export default node;
