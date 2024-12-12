import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/product/ProductDescription.css"
import { BiDownload } from "react-icons/bi";


const ProductDescription = ({aircraftId,modelName,modelDescription,aircraftDescription,technicalSheetPath}) => {
    const navigate = useNavigate()

    function handleDownload() {
        const fileUrl = technicalSheetPath; // Remplace par le chemin de ton fichier
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', `fiche-produit-${modelName}.pdf`); // Nom du fichier téléchargé
        // étapes pour simuler le click sur la balise 'a'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function handleRedirection() {
        navigate("/appointment/"+aircraftId)
        window.scrollTo({
            top: 0,
        });

        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight + 0.20 * (window.innerHeight),
                behavior: 'smooth',
            });
        },100)
    }

    useEffect(() => {
         // Force le défilement en haut de la page
    }, []);

    return (
        <div className='productDescription-container'>
            <h2>SPÉCIFICATIONS</h2>
            <hr></hr>
            <div className='informations-div'>
                <div>
                    <h3>À propos du modèle</h3>
                    <div className='informationsList'>
                        {modelDescription.map((line) => (
                            <p key={line.varName} >{"• "+line.txt+" : "+line.value}</p>
                        ))}
                    </div>
                </div>
                <hr></hr>
                <div>
                    <h3>À propos de l'appareil</h3>
                    <div className='informationsList'>
                        {aircraftDescription.map((line) => (
                            <p key={line.varName} >{"• "+line.txt+" : "+line.value}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='button-div'>
                <button onClick={handleDownload}><BiDownload/>{"Télécharger la fiche technique"}</button>
                <button onClick={handleRedirection}>Prendre rendez-vous</button>
            </div>
        </div>
    )
}

export default ProductDescription