import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const submitContact = (formData) =>{
  console.log(formData);

  if (formData.consent !== true) {
    throw new Error('Consentement requis');
  }
  try{
    const response = axiosInstance.post('/contact-submit', formData);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi du formulaire');
  }
}

