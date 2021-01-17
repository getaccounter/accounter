/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserForm_organization = {
    readonly id: string;
    readonly departments: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            } | null;
        } | null>;
    };
    readonly " $refType": "UserForm_organization";
};
export type UserForm_organization$data = UserForm_organization;
export type UserForm_organization$key = {
    readonly " $data"?: UserForm_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"UserForm_organization">;
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
  "name": "UserForm_organization",
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
(node as any).hash = '1efb5b0e9513502bb644639d8123f3bd';
export default node;
