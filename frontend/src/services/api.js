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

export const getAllAircrafts = async (req, res) => {
  try {
    // Récupération des paramètres de pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const sql = `SELECT * FROM aircraft LIMIT ${limit} OFFSET ${offset}`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        return res.status(500).json({ error: "Erreur lors de la récupération des données" });
      }

      res.status(200).json({ message: "Données récupérées avec succès", data: results });
    });

  } catch (error) {
    console.error("Erreur dans le traitement de la requête :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des données" });
  }
};
