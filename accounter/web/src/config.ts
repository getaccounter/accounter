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
  "/api/graphql/"
);

export const NODE_ENV = parseRequiredEnv(
  "NODE_ENV",
  (val) => String(val) as "development" | "production"
);

export const VERSION = parseEnv("REACT_APP_VERSION", String, "dev")