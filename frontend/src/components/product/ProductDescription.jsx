import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/product/ProductDescription.css"
import { BiDownload } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import { getAllModel, getModelByName } from '../../services/product';


const ProductDescription = ({aircraftId,modelName,modelDescription,aircraftDescription,technicalSheetPath, mode, onInputChange}) => {
    const navigate = useNavigate()
    const [selectedTechnicalSheet, setSelectedTechnicalSheet] = useState(null)
    const [models, setModels] = useState([]);
    const [modelSelected, setModelSelected] = useState(null);
    const [model, setModel] = useState(null)
    const [modelDescriptionTab, setModelDescriptionTab] = 
    useState([
        "modelName",
        "rangeType",
        "manufacturer",
        "passengerCapacity",
        "crewSize", 
        "length", 
        "wingspan", 
        "height", 
        "maxTakeoffWeight",
        "engines", 
        "speedAvg", 
        "maxRange", 
        "maxAltitude" 
    ]);


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
            const fetchModels = async () => {
                try {
                    const response = await getAllModel();
                    setModels(response.data);
                    console.log(model)
                    
                } catch (error) {
                    console.error("Erreur lors de la récupération des modèles :", error);
                }
            };

            if (model) {
                setModelDescriptionTab([
                    model.model_name,
                    model.range_type,
                    model.manufacturer,
                    "Jusqu'à " + model.passenger_capacity + " passager(s)",
                    model.crew_size,
                    model.length,
                    model.wingspan,
                    model.height,
                    model.max_takeoff_weight,
                    model.engines,
                    model.speed_avg,
                    model.max_range + " km",
                    model.max_altitude
                ]);
            }
    
            fetchModels();
        }, [model]);

    const handleProductFieldChange = (field, event, index) => {
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

    const handleModelFieldChange = (field, event, index) => {
        if (onInputChange) {
            console.log(field + " : " + event.target.textContent)
          onInputChange(field, event.target.textContent)
        }
        const criteria = document.getElementById("modelDescription"+index)
        const divCriteria = event.target.parentElement
        const newP = document.createElement("p")
        newP.textContent = criteria.textContent + event.target.textContent
        divCriteria.innerHTML = ""
        divCriteria.appendChild(newP)
    };

    const handleModelChange = async (event) => {
        setModelSelected(event.target.value);
        onInputChange("addMode", event.target.value)
        if (event.target.value !== "Nouveau" && event.target.value !== "Aucun") {
            try {
                onInputChange("modelName", event.target.value)
                const modelData = await getModelByName(event.target.value);
                setModel(modelData); 
                console.log(model)
                 
            } catch (error) {
                console.error("Erreur lors de la récupération du modèle :", error);
                setModel(null); 
            }
        }
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
                        {modelSelected == null &&
                            <div>
                                <label htmlFor="comboBox">Choisissez un model :</label>
                                <select id="comboBox" name="options" onChange={handleModelChange}>
                                    <option value="Aucun"></option>
                                    <option value="Nouveau">Nouveau modèle</option>
                                    {models.map((element) =>(
                                        <option key={element.model_id} value={element.model_name}>{element.model_name}</option>
                                    ))}
                                </select>
                            </div> 
                        }
                        {modelSelected === "Nouveau" && 
                            <div>
                                <h3>À propos du modèle</h3>
                                <div className='informationsList'>
                                    {modelDescription.map((line, index) => (
                                        <div key={line.varName} className="input-description">
                                            <p id={"modelDescription"+index}>{"• "+line.txt+" : "}</p>
                                            <p contentEditable = "true" suppressContentEditableWarning = "true" onBlur={(e) => {handleModelFieldChange(modelDescriptionTab[index], e, index)}}>Inconnu</p> {/*Permet l'édition de l'élément} */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        {modelSelected != null && modelSelected !== "Nouveau" && 
                            <div>
                            <h3>À propos du modèle</h3>
                            <div className='informationsList'>
                                {modelDescription.map((line, index) => (
                                    <div key={line.varName} className="input-description">
                                        
                                        <p key={line.varName} >{"• "+line.txt+" : "+(modelDescriptionTab[index] || "Donnée indisponible")}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h3>À propos de l'appareil</h3>
                        <div className='informationsList'>
                            {aircraftDescription.map((line, index) => (
                                <div className="input-description criteria" key={line.varName}>
                                    <p id={"aircraftDescription"+index}>{"• "+line.txt+" : "}</p>
                                    <p contentEditable = "true" suppressContentEditableWarning = "true" onBlur={(e) => {handleProductFieldChange(aircraftDescriptionTab[index], e, index)}}>Inconnu</p> {/*Permet l'édition de l'élément} */}
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