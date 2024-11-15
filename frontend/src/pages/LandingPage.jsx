import { useEffect, useState } from 'react';
import { fetchTestMessage } from '../services/api';
import FirstSectionLanding from '../components/landing-page/FirstSectionLanding';
import SecondSectionLanding from '../components/landing-page/SecondSectionLanding';

export default function LandingPage() {
  const [message, setMessage] = useState('Bienvenue');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetchTestMessage();
        if (response) {
          setMessage(response);
          console.log('Data fetched:', response);
        } else {
          setMessage('No message received from server');
        }
      } catch (error) {
        setMessage('Error fetching data');
        console.error('Error:', error);
      }
    }
    fetchTest();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Vérifie si le token est expiré
      const isExpired = payload.exp * 1000 < Date.now();
      setIsAuthenticated(!isExpired);
      if (isExpired) {
        localStorage.removeItem('token');
        // ON suppr les données de l'utilisateur si le token est expiré
        localStorage.removeItem('user'); 
      }
    }
  }, []);

  return (
    <main className="">
      {/* <h1 className=''>{message}</h1>
      <div className='flex-col'> 
        <Link to="/sign-up">sign-up</Link>
        <Link to="/sign-in">sign-in</Link>
        <Link to="/my-profile">my-Profile</Link>
      </div> 
      {isAuthenticated ? (
        <p>Connecté</p>
      ) : (
        <p>Déconnecté</p>
      )}*/}
      <FirstSectionLanding />
      <SecondSectionLanding />
    </main>
  )
}