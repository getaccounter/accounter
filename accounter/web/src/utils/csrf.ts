import Cookies from 'js-cookie';
import useFetch from 'use-http';

export const useCSRFCookie = () => {
  /* fetches and sets the csrf cookie */
  const { loading } = useFetch('/api/get_csrf_cookie', []);
  return { loading, token: Cookies.get('csrftoken') };
};

export const getCSRFCookie = () => Cookies.get('csrftoken');
