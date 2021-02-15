/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type Integration_integration = {
    readonly id: string;
    readonly name: string;
    readonly hasValidToken: boolean;
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



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Integration_integration",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
        (v0/*: any*/),
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
})();
(node as any).hash = '780f28a299ee1fad707a534bab960abe';
export default node;
