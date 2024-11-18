import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const getCatalogData = async (page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get('/catalog', {
      params: { page, limit },
    });
    console.log('Full response:', response); // Log complet pour débogage
    console.log('Catalog data fetched:', response.data); // Affiche les données principales
    return response.data; // Renvoie toute la réponse (données, page, totalPages, etc.)
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    throw error;
  }
};

