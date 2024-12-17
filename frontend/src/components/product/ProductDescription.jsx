import React, {createElement, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/product/ProductDescription.css"
import { BiDownload } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";


const ProductDescription = ({aircraftId,modelName,modelDescription,aircraftDescription,technicalSheetPath, mode, onInputChange}) => {
    const navigate = useNavigate()
    const [selectedTechnicalSheet, setSelectedTechnicalSheet] = useState(null)

    const aircraftDescriptionTab = 
    [ 
        "serialNumber",
        "manufactureYear",
        "flightHours",
        "configuration",
        "recentMaintenance",
        "typicalRoutes",
        "owner",
        "costPerKm",
        "monthlyMaintenanceCost",
        "estimatedPrice"
    ]

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

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type === "application/pdf") {
          const reader = new FileReader()
          reader.onload = (e) => {
            setSelectedTechnicalSheet(e.target.result) // Mettre à jour le fichier dans le state
          };
          reader.readAsDataURL(file)
        } else {
          setSelectedTechnicalSheet(null)
          alert("Veuillez choisir un fichier valide.")
        }
      };

    useEffect(() => {
         // Force le défilement en haut de la page
    }, []);

    const handleFieldChange = (field, event, index) => {
        if (onInputChange) {
          onInputChange(field, event.target.textContent)
        }
        const criteria = document.getElementById("aircraftDescription"+index)
        const divCriteria = event.target.parentElement
        const newP = document.createElement("p")
        newP.textContent = criteria.textContent + event.target.textContent
        divCriteria.innerHTML = ""
        divCriteria.appendChild(newP)
    };

    if (mode === "add"){
        return (
            <div className='productDescription-container'>
                <h2>SPÉCIFICATIONS</h2>
                <hr></hr>
                <p>*Modifier le contenu en cliquant dessus</p>
                <hr />
                <div className='informations-div'>
                    <div>
                        <h3>À propos du modèle</h3>
                        <div className='informationsList'>
                            {modelDescription.map((line, index) => (
                                <div key={line.varName} className="input-description">
                                    <p>{"• "+line.txt+" : "}</p>
                                    <p contentEditable = "true" suppressContentEditableWarning = "true">Inconnu</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <h3>À propos de l'appareil</h3>
                        <div className='informationsList'>
                            {aircraftDescription.map((line, index) => (
                                <div className="input-description criteria" key={line.varName}>
                                    <p id={"aircraftDescription"+index}>{"• "+line.txt+" : "}</p>
                                    <p contentEditable = "true" suppressContentEditableWarning = "true" onBlur={(e) => {handleFieldChange(aircraftDescriptionTab[index], e, index)}}>Inconnu</p> {/*Permet l'édition de l'élément} */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='button-div'>
                    <label htmlFor="fileTechnicalSheet" >
                        {selectedTechnicalSheet ? 
                        <div className='label-content'>
                            <GrStatusGood color='green'/> Fiche technique Insérée
                        </div> : 
                        <div className='label-content'>
                            <BiDownload /> Insérer la fiche technique 
                        </div>} 
                        <input type="file" id="fileTechnicalSheet" onChange={handleFileChange} accept='.pdf'/>
                    </label>
                </div>
            </div>
        )
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