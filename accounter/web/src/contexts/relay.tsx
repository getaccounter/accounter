import { createContext, ReactNode, useContext } from "react";
import { Environment } from "relay-runtime";

const relayContext = createContext<{
  environment: Environment;
}>(undefined!);

type Props = {
  children: ReactNode;
  environment: Environment;
};
export default function RelayProvider({ children, environment }: Props) {
  return (
    <relayContext.Provider
      children={children}
      value={{
        environment,
      }}
    />
  );
}

export const useEnvironment = () => {
  const { environment } = useContext(relayContext);
  return environment;
};
