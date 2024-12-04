import "../../styles/admin/EditArticle.css";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function EditArticle() {

    const [aircrafts, setAircrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAircrafts = async () => {
            try {
                const response = await axios.get(`http://localhost/air-concess/backend/public/api.php`);
                setAircrafts(response.data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAircrafts();
    }, []);

    
    return (
        <div className="edit-article">
            
        </div>
    )
}