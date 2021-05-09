/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IntegrationContentQueryVariables = {
    id: string;
};
export type IntegrationContentQueryResponse = {
    readonly integration: {
        readonly accounts: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"IntegrationAccountList_accounts">;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"IntegrationContentHeader_integration">;
    } | null;
};
export type IntegrationContentQuery = {
    readonly response: IntegrationContentQueryResponse;
    readonly variables: IntegrationContentQueryVariables;
};



/*
query IntegrationContentQuery(
  $id: ID!
) {
  integration(id: $id) {
    ...IntegrationContentHeader_integration
    accounts {
      ...IntegrationAccountList_accounts
    }
    id
  }
}

fragment IntegrationAccountList_accounts on AccountNode {
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
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IntegrationContentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IntegrationNode",
        "kind": "LinkedField",
        "name": "integration",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountNode",
            "kind": "LinkedField",
            "name": "accounts",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "IntegrationAccountList_accounts"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IntegrationContentHeader_integration"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IntegrationContentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IntegrationNode",
        "kind": "LinkedField",
        "name": "integration",
        "plural": false,
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
              },
              (v2/*: any*/)
            ],
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
                  (v2/*: any*/)
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
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e2985c0a519f58d13a46f5c46d59c50d",
    "id": null,
    "metadata": {},
    "name": "IntegrationContentQuery",
    "operationKind": "query",
    "text": "query IntegrationContentQuery(\n  $id: ID!\n) {\n  integration(id: $id) {\n    ...IntegrationContentHeader_integration\n    accounts {\n      ...IntegrationAccountList_accounts\n    }\n    id\n  }\n}\n\nfragment IntegrationAccountList_accounts on AccountNode {\n  imageSmall\n  isDisabled\n  profile {\n    firstName\n    lastName\n    title\n    id\n  }\n  username\n  role\n  externalProfile\n}\n\nfragment IntegrationContentHeader_integration on IntegrationNode {\n  name\n  managementUrl\n  hasValidToken\n  service {\n    logo\n    oauthUrl\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8e49cabd972360c66ec212560d098f1a';
export default node;
