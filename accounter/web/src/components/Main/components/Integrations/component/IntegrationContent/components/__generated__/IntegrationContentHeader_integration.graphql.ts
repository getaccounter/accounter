/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationContentHeader_integration = {
    readonly name: string;
    readonly managementUrl: string;
    readonly hasValidToken: boolean;
    readonly service: {
        readonly logo: string;
        readonly oauthUrl: string;
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
      "kind": "ScalarField",
      "name": "hasValidToken",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "oauthUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IntegrationNode",
  "abstractKey": null
};
(node as any).hash = 'ac62f6a835fed43a991a6e4618a5f3e0';
export default node;
