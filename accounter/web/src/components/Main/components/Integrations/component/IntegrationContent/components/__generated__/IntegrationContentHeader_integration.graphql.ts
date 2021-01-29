/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationContentHeader_integration = {
    readonly name: string;
    readonly service: {
        readonly logo: string;
    };
    readonly " $refType": "IntegrationContentHeader_integration";
};
export type IntegrationContentHeader_integration$data = IntegrationContentHeader_integration;
export type IntegrationContentHeader_integration$key = {
    readonly " $data"?: IntegrationContentHeader_integration$data;
    readonly " $fragmentRefs": FragmentRefs<"IntegrationContentHeader_integration">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IntegrationContentHeader_integration",
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
      "concreteType": "ServiceNode",
      "kind": "LinkedField",
      "name": "service",
      "plural": false,
      "selections": [
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
(node as any).hash = 'f4605d6139c5e3b083b55ddaccba2d2e';
export default node;
