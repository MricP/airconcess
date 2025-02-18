import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://airconcess.org/public/api.php',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const submitContact = (formData) => {
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
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCatalogData = async () => {
  try {
    const response = await axiosInstance.get('/catalog');
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
    const response = await axiosInstance.get(`testimonial/id-user?id_user=${id_user}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials by user:', error);
    throw error;
  }
};

