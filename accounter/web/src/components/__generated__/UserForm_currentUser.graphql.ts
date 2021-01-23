/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserForm_currentUser = {
    readonly organization: {
        readonly id: string;
        readonly departments: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly name: string;
                } | null;
            } | null>;
        };
    };
    readonly " $refType": "UserForm_currentUser";
};
export type UserForm_currentUser$data = UserForm_currentUser;
export type UserForm_currentUser$key = {
    readonly " $data"?: UserForm_currentUser$data;
    readonly " $fragmentRefs": FragmentRefs<"UserForm_currentUser">;
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
  "name": "UserForm_currentUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "OrganizationNode",
      "kind": "LinkedField",
      "name": "organization",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "ProfileNode",
  "abstractKey": null
};
})();
(node as any).hash = '305ddec0e7a310b6618b0057cd685c80';
export default node;
