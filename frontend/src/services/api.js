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

export const getCatalogData = async () => {
  try {
    const response = await axiosInstance.get('/catalog');
    console.log('Full response:', response); // Log the full response
    console.log('Data fetched:', response.data.message); // Log the message
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getAllAircrafts = async (req) => {
  try{
    const response = await axiosInstance.get('/catalog');
    console.log('Full response:', response); // Log the full response
    console.log('Data fetched:', response.data.message); // Log the message
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM aircrafts LIMIT ${limit} OFFSET ${offset}`;

    db.query(sql,res, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de la récupération des données" });
      }})
}catch(error){}
};
