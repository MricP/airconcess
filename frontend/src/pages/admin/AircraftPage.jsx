import React from 'react'
import { createAircraft } from '../../services/admin';
import { useState } from 'react';

function AircraftPage() {
    
    const [formData, setFormData] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createAircraft({
                model: formData.model,
                isAvailable: formData.isAvailable === "true" ? 1 : 0,  // Conversion booléenne
                planeImg: formData.planeImg,
                serialNumber: formData.serialNumber, 
                price: parseFloat(formData.price),  // Conversion en nombre décimal
                year: parseInt(formData.year),      // Conversion en entier
                hours: formData.hours ? parseInt(formData.hours) : 0,  // Conversion en entier
                capacity: parseInt(formData.capacity),
                autonomy: parseInt(formData.autonomy),
                description: formData.description,  
                aircraftType: formData.aircraftType
            });
            if (!response || response.error) {
                console.error('Erreur côté backend:', response.error || 'Réponse vide');
            } else {
                console.log('Avion ajouté avec succès:', response);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'avion:', error);
        }
    };
    
    
    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        setFormData(values => ({...values, [name]: value}));
        
    }

    return (
        <div> 
            <form method="POST">
                <div><label htmlFor="model">Modèle</label><input type="text" name='model' value={formData.model} onChange={handleChange}/></div>
                <div><label htmlFor="serialNumber">Numéro de série</label><input type="text" name='serialNumber' value={formData.serialNumber} onChange={handleChange}/></div>
                <div><label htmlFor="price">Prix</label><input type="text" name='price' value={formData.price} onChange={handleChange}/></div>
                <div><label htmlFor="planeImg">Image avion</label><input type="text"  name='planeImg' value={formData.planeImg} onChange={handleChange}/></div>
                <div><label htmlFor="year">Année</label><input type="text"  name='year'  value={formData.year} onChange={handleChange}/></div>
                <div><label htmlFor="hours">Heures de vols</label><input type="text" name='hours'  value={formData.hours} onChange={handleChange}/></div>
                <div><label htmlFor="capacity">Capaicité</label><input type="text" name='capacity'  value={formData.capacity} onChange={handleChange}/></div>
                <div><label htmlFor="autonomy">Autonomy</label><input type="text" name='autonomy'  value={formData.autonomy} onChange={handleChange}/></div>
                <div><label htmlFor="isAvailable">est disponible</label><input type="text" name='isAvailable'  value={formData.isAvailable} onChange={handleChange}/></div>
                <div><label htmlFor="description">Description</label><input type="text" name='description'  value={formData.description} onChange={handleChange}/></div>
                <div><label htmlFor="aircraftType">Type avion</label><input type="text" name='aircraftType'  value={formData.aircraftType} onChange={handleChange} /></div>
                <button type='submit' onClick={handleSubmit}>Valider</button>
            </form>
        </div>
    )
}

export default AircraftPage
