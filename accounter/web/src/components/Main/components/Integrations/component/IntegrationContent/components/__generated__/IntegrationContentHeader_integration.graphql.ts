/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationContentHeader_integration = {
    readonly name: string;
    readonly managementUrl: string;
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
      "kind": "ScalarField",
      "name": "managementUrl",
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
  "type": "IntegrationNode",
  "abstractKey": null
};
(node as any).hash = '4e0be028acd8de36a796e4e3cf8f8f54';
export default node;
