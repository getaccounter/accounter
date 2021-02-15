/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ServiceName = "GOOGLE" | "SLACK" | "ZOOM" | "%future added value";
export type IntegrationsQueryVariables = {};
export type IntegrationsQueryResponse = {
    readonly integrations: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly service: {
            readonly name: ServiceName;
        };
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
    id
    name
    service {
      name
    }
    ...Integration_integration
    ...IntegrationContent_integration
  }
}

fragment IntegrationAccountList_accounts on AccountNode {
  id
  imageSmall
  isDisabled
  profile {
    firstName
    lastName
    title
    id
  }
  username
  role
  externalProfile
}

fragment IntegrationContentHeader_integration on IntegrationNode {
  name
  managementUrl
  hasValidToken
  service {
    logo
    oauthUrl
  }
}

fragment IntegrationContent_integration on IntegrationNode {
  name
  ...IntegrationContentHeader_integration
  accounts {
    ...IntegrationAccountList_accounts
  }
}

fragment Integration_integration on IntegrationNode {
  id
  name
  hasValidToken
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
        "concreteType": "IntegrationNode",
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceNode",
            "kind": "LinkedField",
            "name": "service",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
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
        "concreteType": "IntegrationNode",
        "kind": "LinkedField",
        "name": "integrations",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
            "kind": "ScalarField",
            "name": "managementUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountNode",
            "kind": "LinkedField",
            "name": "accounts",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageSmall",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDisabled",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "role",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "externalProfile",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "39133cc47786679fff80c93b09e28e5a",
    "id": null,
    "metadata": {},
    "name": "IntegrationsQuery",
    "operationKind": "query",
    "text": "query IntegrationsQuery {\n  integrations {\n    id\n    name\n    service {\n      name\n    }\n    ...Integration_integration\n    ...IntegrationContent_integration\n  }\n}\n\nfragment IntegrationAccountList_accounts on AccountNode {\n  id\n  imageSmall\n  isDisabled\n  profile {\n    firstName\n    lastName\n    title\n    id\n  }\n  username\n  role\n  externalProfile\n}\n\nfragment IntegrationContentHeader_integration on IntegrationNode {\n  name\n  managementUrl\n  hasValidToken\n  service {\n    logo\n    oauthUrl\n  }\n}\n\nfragment IntegrationContent_integration on IntegrationNode {\n  name\n  ...IntegrationContentHeader_integration\n  accounts {\n    ...IntegrationAccountList_accounts\n  }\n}\n\nfragment Integration_integration on IntegrationNode {\n  id\n  name\n  hasValidToken\n  service {\n    name\n    logo\n  }\n}\n"
  }
};
})();
(node as any).hash = '5b9413e4f845b6359255193f17125983';
export default node;
