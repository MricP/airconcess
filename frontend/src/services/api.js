import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const submitContact = (formData) => {
  console.log(formData);

  if (formData.consent !== true) {
    throw new Error('Consentement requis');
  }
  try {
    const response = axiosInstance.post('/contact-submit', formData);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi du formulaire');
  }
}
export const fetchTestMessage = async () => {
  try {
    const response = await axiosInstance.get('/api');
    console.log('Full response:', response); // Log the full response
    console.log('Data fetched:', response.data.message); // Log the message
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCatalogData = async () => {
  try {
    const response = await axiosInstance.get('/catalog');
    console.log('Full response:', response);
    console.log('Catalog data fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    throw error;
  }
};

export const getAllTestimonials = async () => {
  try {
    const response = await axiosInstance.get(`/testimonials`);
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials data:', error);
    throw error;
  }
}

export const getTestimonialsByUser = async (id_user) => {
  try {
    console.log('/testimonials/id-user');
    const response = await axiosInstance.get(`testimonial/id-user?id_user=${id_user}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials by user:', error);
    throw error;
  }
};

