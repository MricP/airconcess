import axios from 'axios';

const chatbotInstance = axios.create({
    baseURL: 'http://localhost/air-concess/backend/public/api/chatbot',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const sendAQuestion = async (question) => {
    try {
        const response = await chatbotInstance.post("/send", { question });
        return response.data.answer;
    } catch (error) {
        console.error("erreur lors de l'envoi de la réponse.", error);
        throw new Error("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
    }
}