const parseEnv = <T>(
  envName: string,
  parser: (val: string) => T,
  defaultValue: T
) => {
  const value = process.env[envName];
  if (value) {
    return parser(value);
  }
  return defaultValue;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseRequiredEnv = <T>(envName: string, parser: (val: string) => T) => {
  const parsedValue = parseEnv(envName, parser, undefined);
  if (parsedValue === undefined) {
    throw new Error(`Missing environment variable: ${envName}`);
  }
  return parsedValue;
};

export const GRAPHQL_ENDPOINT = parseEnv(
  "REACT_APP_GRAPHQL_ENDPOINT",
  String,
  "/api/graphql"
);
