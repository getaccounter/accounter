/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserDirectory_profiles = {
  readonly totalCount: number;
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
      readonly lastName: string;
      readonly " $fragmentRefs": FragmentRefs<"User_profile">;
    } | null;
  } | null>;
  readonly " $refType": "UserDirectory_profiles";
};
export type UserDirectory_profiles$data = UserDirectory_profiles;
export type UserDirectory_profiles$key = {
  readonly " $data"?: UserDirectory_profiles$data;
  readonly " $fragmentRefs": FragmentRefs<"UserDirectory_profiles">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "UserDirectory_profiles",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "totalCount",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "ProfileNodeEdge",
      kind: "LinkedField",
      name: "edges",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "ProfileNode",
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "lastName",
              storageKey: null,
            },
            {
              args: null,
              kind: "FragmentSpread",
              name: "User_profile",
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "ProfileNodeConnection",
  abstractKey: null,
};
(node as any).hash = "ac719a041bcc635364b87a8046d596d2";
export default node;
