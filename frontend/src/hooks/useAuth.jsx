import { useEffect, useRef } from 'react';
import useRedirect from '../components/Custom-hooks';

const useAuth = () => {
  const redirect = useRedirect();
  const isFirstVisit = useRef(true); // Garde en mémoire la première visite

  const checkTokenValidity = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000;
      return expiration > Date.now();
    } catch (error) {
      return false;
    }
  };

  const handleTokenValidation = () => {
    if (!checkTokenValidity()) {
      localStorage.removeItem('token');

      // Empêche la redirection si c'est la première visite
      if (!isFirstVisit.current) {
        redirect('/sign-in');
      }
      isFirstVisit.current = false;
    }
  };

  useEffect(() => {
    handleTokenValidation();
  }, []);
};

export default useAuth;
