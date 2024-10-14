import { useEffect, useState } from 'react';
import { fetchTestMessage } from '../services/api';

export default function LandingPage() {
    const [message, setMessage] = useState('Bienvenue');

  useEffect(() => {
    const fetchTest = async () => {
      const response = await fetchTestMessage();
      if (response) {
        setMessage(response);
      } else {
        setMessage('Error fetching data');
      }
    }

    fetchTest();
  }, []);

  return (
    <main className="">
      <h1 className=''>{message}</h1>
    </main>
  )
}
