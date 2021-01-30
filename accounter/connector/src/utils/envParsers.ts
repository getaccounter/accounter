export const parseEnv = <T>(envName: string, parser: (val: string) => T, defaultValue: T) => {
  const value = process.env[envName]
  if (value !== undefined) {
    return parser(value)
  }
  return defaultValue
}

export const parseRequiredEnv = <T>(envName: string, parser: (val: string) => T) => {
  const parsedValue = parseEnv(envName, parser, null)
  if (parsedValue === null) {
    throw new Error(`Missing environment variable: ${envName}`)
  }
  return parsedValue
}