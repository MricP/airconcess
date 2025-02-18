import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const checkTokenValidity = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000;  
    const now = Date.now();

    return expiration > now;  
  };

  const handleTokenValidation = () => {
    if (!checkTokenValidity()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/sign-in'); 
    }
  };

  useEffect(() => {
    handleTokenValidation();
  }, []); 
};

export default useAuth;
