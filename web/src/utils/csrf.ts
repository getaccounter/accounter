import Cookies from "js-cookie";
import useFetch from "use-http";

export const useCSRFCookie = () => {
  /* fetches and sets the csrf cookie */
  const { loading } = useFetch("/api/get_csrf_cookie", []);
  return loading;
};

export const getCSRFCookie = () => Cookies.get("csrftoken");
