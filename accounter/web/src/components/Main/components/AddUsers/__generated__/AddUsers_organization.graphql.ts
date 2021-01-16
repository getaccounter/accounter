/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AddUsers_organization = {
    readonly id: string;
    readonly departments: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            } | null;
        } | null>;
    };
    readonly " $refType": "AddUsers_organization";
};
export type AddUsers_organization$data = AddUsers_organization;
export type AddUsers_organization$key = {
    readonly " $data"?: AddUsers_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"AddUsers_organization">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddUsers_organization",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "DepartmentNodeConnection",
      "kind": "LinkedField",
      "name": "departments",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "DepartmentNodeEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "DepartmentNode",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrganizationNode",
  "abstractKey": null
};
})();
(node as any).hash = 'a1a5b92beac7d232eae89ae4bd2823c3';
export default node;
