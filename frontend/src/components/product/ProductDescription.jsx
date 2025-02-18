import React, { useEffect, useState} from 'react'
import "../../styles/product/ProductDescription.css"
import { BiDownload } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import useRedirect from '../Custom-hooks';


const ProductDescription = ({aircraftId,modelName,modelDescription,aircraftDescription,technicalSheetPath, mode, onInputChange, modelSelected}) => {
    const redirect = useRedirect()
    const [selectedTechnicalSheet, setSelectedTechnicalSheet] = useState(null)
    const [modelDescriptionTab, setModelDescriptionTab] = 
    useState([
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
        "estimatedPrice",
        "id"
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
        redirect("/appointment/"+aircraftId)

        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight,
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
        if (modelSelected !== "Nouveau" && mode === "add") {
            setModelDescriptionTab([
                modelSelected.range_type,
                modelSelected.manufacturer,
                "Jusqu'à " + modelSelected.passenger_capacity + " passager(s)",
                modelSelected.crew_size,
                modelSelected.length,
                modelSelected.wingspan,
                modelSelected.height,
                modelSelected.max_takeoff_weight,
                modelSelected.engines,
                modelSelected.speed_avg,
                modelSelected.max_range + " km",
                modelSelected.max_altitude
            ]);
        }
    }, [modelSelected,mode]);

    const handleProductFieldChange = (field, event, index) => {
        if (onInputChange) {
          if (field === "manufactureYear") {
            if (/^(19|20)\d{2}$/.test(event.target.textContent)){
                onInputChange(field, event.target.textContent)
                const criteria = document.getElementById("aircraftDescription"+index)
                const divCriteria = event.target.parentElement
                const newP = document.createElement("p")
                newP.textContent = criteria.textContent + event.target.textContent
                divCriteria.innerHTML = ""
                divCriteria.appendChild(newP)
            } else {
                event.target.style.color = "red"
            }
          } else if (field === "flightHours" || field === "estimatedPrice"){
            if (/\d/.test(event.target.textContent)){
                onInputChange(field, event.target.textContent)
                const criteria = document.getElementById("aircraftDescription"+index)
                const divCriteria = event.target.parentElement
                const newP = document.createElement("p")
                newP.textContent = criteria.textContent + event.target.textContent
                divCriteria.innerHTML = ""
                divCriteria.appendChild(newP)
            } else {
                event.target.style.color = "red"
            }
          } else {
            onInputChange(field, event.target.textContent)
            const criteria = document.getElementById("aircraftDescription"+index)
            const divCriteria = event.target.parentElement
            const newP = document.createElement("p")
            newP.textContent = criteria.textContent + event.target.textContent
            divCriteria.innerHTML = ""
            divCriteria.appendChild(newP)
          }
        }
    };

    const handleModelFieldChange = (field, event, index) => {
        if (onInputChange) {
            if (field === "passengerCapacity" || field === "maxRange"){
              if (/\d/.test(event.target.textContent)){
                  onInputChange(field, event.target.textContent)
                    const criteria = document.getElementById("modelDescription"+index)
                    const divCriteria = event.target.parentElement
                    const newP = document.createElement("p")
                    newP.textContent = criteria.textContent + event.target.textContent
                    divCriteria.innerHTML = ""
                    divCriteria.appendChild(newP)
              } else {
                  event.target.style.color = "red"
              }
            } else {
              onInputChange(field, event.target.textContent)
                const criteria = document.getElementById("modelDescription"+index)
                const divCriteria = event.target.parentElement
                const newP = document.createElement("p")
                newP.textContent = criteria.textContent + event.target.textContent
                divCriteria.innerHTML = ""
                divCriteria.appendChild(newP)
            }
        }
    };

    const loadData = () => {
        modelDescription.map((line, index) => (
            onInputChange(modelDescriptionTab[index], line.value)
        ))

        aircraftDescription.map((line, index) => (
            onInputChange(aircraftDescriptionTab[index], line.value)
        ))
        onInputChange(aircraftDescriptionTab[10], aircraftId)
    }

    useEffect(() => {
        if (mode === "edit"){
            loadData();
        }
    }, [aircraftDescription])

    if (mode === "add"){
        return (
            <div className='productDescription-container'>
                <h2>SPÉCIFICATIONS</h2>
                <hr></hr>
                <p>*Modifier le contenu en cliquant dessus</p>
                <hr />
                <div className='informations-div'>
                    <div>
                        
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
    } else if (mode === "edit") {
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
                            {aircraftDescription.map((line, index) => (
                                <div className="input-description criteria" key={line.varName}>
                                    <p id={"aircraftDescription"+index}>{"• "+line.txt+" : "}</p>
                                    <p contentEditable = "true" suppressContentEditableWarning = "true" onBlur={(e) => {handleProductFieldChange(aircraftDescriptionTab[index], e, index)}}>{line.value}</p> {/*Permet l'édition de l'élément} */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='button-div'>
                    <button onClick={handleDownload}><BiDownload/>{"Changer la fiche technique"}</button>
                    {/* <button onClick={handleRedirection} disabled>Prendre rendez-vous</button> */}
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