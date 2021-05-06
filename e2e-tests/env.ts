export const parseEnv = <T>(
  envName: string,
  parser: (val: string) => T,
  defaultValue: T
) => {
  const value = process.env[envName];
  if (value !== undefined) {
    return parser(value);
  }
  return defaultValue;
};

export const parseRequiredEnv = <T>(
  envName: string,
  parser: (val: string) => T
) => {
  const parsedValue = parseEnv(envName, parser, null);
  if (parsedValue === null) {
    throw new Error(`Missing environment variable: ${envName}`);
  }
  return parsedValue;
};

export const LOADBALANCER_HOST = parseRequiredEnv('LOADBALANCER_HOST', String)
export const LOADBALANCER_PORT = parseRequiredEnv('LOADBALANCER_PORT', String)
export const LOADBALANCER_URL = `http://${LOADBALANCER_HOST}:${LOADBALANCER_PORT}`