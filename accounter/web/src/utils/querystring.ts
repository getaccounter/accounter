import { useLocation } from "react-router-dom";

export const useQueryString = (name: string) => {
  return new URLSearchParams(useLocation().search).get(name);
};

export const useBooleanQueryString = (name: string) => {
    const stringValue = useQueryString(name);
    return stringValue == 'true'
  };