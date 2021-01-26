/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "SLACK" | "%future added value";
export type Integration_integration = {
    readonly name: string;
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
    (v0/*: any*/),
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
  "type": "IntegrationInterface",
  "abstractKey": "__isIntegrationInterface"
};
})();
(node as any).hash = '2a18cd812b0d276def24d694f4464958';
export default node;
