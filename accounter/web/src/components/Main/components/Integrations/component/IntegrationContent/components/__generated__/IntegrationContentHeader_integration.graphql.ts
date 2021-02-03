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
  "type": "IntegrationNode",
  "abstractKey": null
};
(node as any).hash = 'cfdf3ae208a7153a4b92d9eca68ca53d';
export default node;
