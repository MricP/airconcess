
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://46.101.169.59/public/api.php',
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const submitTraining = async (formData) => {
//     try {
//         const response = await axiosInstance.post('/subTraining/submit',formData);    
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getTrainers = async () => {
//   try {
//       const response = await axiosInstance.get('/subTraining/get-trainers');    
//       return response;
//   } catch (error) {
//       throw error;
//   }
// };

export const getAllTrainings = async (idTrainer) => {
  try {
      const response = await axiosInstance.get('/training/getTrainings',idTrainer);    
      return response;
  } catch (error) {
      throw error;
  }
};


