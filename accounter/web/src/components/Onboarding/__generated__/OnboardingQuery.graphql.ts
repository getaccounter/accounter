/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingQueryVariables = {};
export type OnboardingQueryResponse = {
    readonly leads: {
        readonly roles: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"OnboardingBasics_roles">;
        }>;
        readonly organizationSizes: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"OnboardingBasics_organizationSizes">;
        }>;
    };
};
export type OnboardingQuery = {
    readonly response: OnboardingQueryResponse;
    readonly variables: OnboardingQueryVariables;
};



/*
query OnboardingQuery {
  leads {
    roles {
      ...OnboardingBasics_roles
    }
    organizationSizes {
      ...OnboardingBasics_organizationSizes
    }
  }
}

fragment OnboardingBasics_organizationSizes on OrganizationSizeValueLabelPair {
  value
  label
}

fragment OnboardingBasics_roles on RoleValueLabelPair {
  value
  label
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LeadNode",
        "kind": "LinkedField",
        "name": "leads",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RoleValueLabelPair",
            "kind": "LinkedField",
            "name": "roles",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "OnboardingBasics_roles"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "OrganizationSizeValueLabelPair",
            "kind": "LinkedField",
            "name": "organizationSizes",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "OnboardingBasics_organizationSizes"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OnboardingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LeadNode",
        "kind": "LinkedField",
        "name": "leads",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RoleValueLabelPair",
            "kind": "LinkedField",
            "name": "roles",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "OrganizationSizeValueLabelPair",
            "kind": "LinkedField",
            "name": "organizationSizes",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cde5cdc5109825f1e8aef71ea34aac18",
    "id": null,
    "metadata": {},
    "name": "OnboardingQuery",
    "operationKind": "query",
    "text": "query OnboardingQuery {\n  leads {\n    roles {\n      ...OnboardingBasics_roles\n    }\n    organizationSizes {\n      ...OnboardingBasics_organizationSizes\n    }\n  }\n}\n\nfragment OnboardingBasics_organizationSizes on OrganizationSizeValueLabelPair {\n  value\n  label\n}\n\nfragment OnboardingBasics_roles on RoleValueLabelPair {\n  value\n  label\n}\n"
  }
};
})();
(node as any).hash = '2b70cae30629f7e234afb6ff63b85afa';
export default node;
