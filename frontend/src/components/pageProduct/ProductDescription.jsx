import React from 'react'
import '../../styles/pageProduct/ProductDescription.css'
import { BiDownload } from "react-icons/bi";


const ProductDescription = ({modelName,modelDescription,deviceDescription,technicalSheetPath}) => {
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

    return (
        <div className='productDescription-container'>
            <h2>SPÉCIFICATIONS</h2>
            <hr></hr>
            <div className='informations-div'>
                <div>
                    <h3>À propos du modèle</h3>
                    <div className='informationsList'>
                        {modelDescription.map((line) => (
                            <p key={line} >• {line}</p>
                        ))}
                    </div>
                </div>
                <hr></hr>
                <div>
                    <h3>À propos de l'appareil</h3>
                    <div className='informationsList'>
                        {deviceDescription.map((line) => (
                            <p key={line} >• {line}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='button-div'>
                <button onClick={handleDownload}><BiDownload/>{"Télécharger la fiche technique"}</button>
                <button>Prendre rendez-vous</button>
            </div>
        </div>
    )
}

export default ProductDescription