
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitTraining = async (formData) => {
    try {
        const response = await axiosInstance.post('/subTraining/submit',formData);    
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteTraining = async (trainingId) => {
  try {
    const response = await axiosInstance.post('/training/deleteTraining',trainingId);   
    return response;
  } catch (error) {
      throw error;
  }
}

export const getTrainers = async () => {
  try {
      const response = await axiosInstance.get('/subTraining/get-trainers');    
      return response;
  } catch (error) {
      throw error;
  }
};

export const getTrainingsOfTrainer = async (idTrainer) => {
  try {
    const response = await axiosInstance.post('/training/getTrainingsOfTrainer',idTrainer);   
    return response;
  } catch (error) {
      throw error;
  }
}

export const getTrainingsOfUser = async (idUser) => {
  try {
    const response = await axiosInstance.post('/training/getTrainingsOfUser',idUser);   
    return response;
  } catch (error) {
      throw error;
  }
}

export const insertProposals = async (trainerId,trainingId,proposals) => {
  try {
    const response = await axiosInstance.post('/training/insertProposals',{trainerId,trainingId,proposals});   
    return response;
  } catch (error) {
      throw error;
  }
}

export const deleteProposals = async (trainingId) => {
  try {
    const response = await axiosInstance.post('/training/deleteProposals',trainingId);   
    return response;
  } catch (error) {
      throw error;
  }
}

export const deleteProposal = async (proposalId) => {
  try {
    const response = await axiosInstance.post('/training/deleteProposalWithId',proposalId);   
    return response;
  } catch (error) {
      throw error;
  }
}

export const acceptProposal = async (trainingId,proposalId) => {
  try {
    const response = await axiosInstance.post('/training/acceptProposal',{trainingId,proposalId});   
    return response;
  } catch (error) {
      throw error;
  }
}

