/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationsQueryVariables = {};
export type IntegrationsQueryResponse = {
    readonly integrations: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"Integration_integration" | "IntegrationContent_integration">;
    }>;
};
export type IntegrationsQuery = {
    readonly response: IntegrationsQueryResponse;
    readonly variables: IntegrationsQueryVariables;
};



/*
query IntegrationsQuery {
  integrations {
    __typename
    id
    ...Integration_integration
    ...IntegrationContent_integration
  }
}

fragment IntegrationAccountList_accounts on SlackAccountNode {
  id
  ...IntegrationAccount_account
}

fragment IntegrationAccount_account on AccountInterface {
  __isAccountInterface: __typename
  image
  profile {
    firstName
    lastName
    id
  }
  username
}

fragment IntegrationContentHeader_integration on IntegrationInterface {
  __isIntegrationInterface: __typename
  name
  service {
    logo
  }
}

fragment IntegrationContent_integration on SlackIntegrationNode {
  name
  ...IntegrationContentHeader_integration
  accounts {
    ...IntegrationAccountList_accounts
    id
  }
}

fragment Integration_integration on IntegrationInterface {
  __isIntegrationInterface: __typename
  id
  name
  service {
    name
    logo
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IntegrationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Integration_integration"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IntegrationContent_integration"
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
    "name": "IntegrationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v0/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isIntegrationInterface"
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceNode",
            "kind": "LinkedField",
            "name": "service",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "logo",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SlackAccountNode",
                "kind": "LinkedField",
                "name": "accounts",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "image",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ProfileNode",
                        "kind": "LinkedField",
                        "name": "profile",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "firstName",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lastName",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      }
                    ],
                    "type": "AccountInterface",
                    "abstractKey": "__isAccountInterface"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "SlackIntegrationNode",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "23131e28b6465acce7bfd2be0e7f7fb1",
    "id": null,
    "metadata": {},
    "name": "IntegrationsQuery",
    "operationKind": "query",
    "text": "query IntegrationsQuery {\n  integrations {\n    __typename\n    id\n    ...Integration_integration\n    ...IntegrationContent_integration\n  }\n}\n\nfragment IntegrationAccountList_accounts on SlackAccountNode {\n  id\n  ...IntegrationAccount_account\n}\n\nfragment IntegrationAccount_account on AccountInterface {\n  __isAccountInterface: __typename\n  image\n  profile {\n    firstName\n    lastName\n    id\n  }\n  username\n}\n\nfragment IntegrationContentHeader_integration on IntegrationInterface {\n  __isIntegrationInterface: __typename\n  name\n  service {\n    logo\n  }\n}\n\nfragment IntegrationContent_integration on SlackIntegrationNode {\n  name\n  ...IntegrationContentHeader_integration\n  accounts {\n    ...IntegrationAccountList_accounts\n    id\n  }\n}\n\nfragment Integration_integration on IntegrationInterface {\n  __isIntegrationInterface: __typename\n  id\n  name\n  service {\n    name\n    logo\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b05e16da4b350632304bd75ed608b702';
export default node;
