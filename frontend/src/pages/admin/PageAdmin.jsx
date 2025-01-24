import "../../styles/admin/PageAdmin.css";
import EditArticle from "../../components/admin/EditArticle";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import PageProduct from "../product/PageProduct";
import { insertAircraft, insertModel, getModelByName, getAllModel, uploadImage, insertImage, getAircraftBySerialNumber, deleteAircraft, deleteModel } from "../../services/product";

export default function PageAdmin(){

    const [isClicked1, updateClicked1] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [models, setModels] = useState(null);
    const [model, setModel] = useState(null)
    
    

    const handleMenuClick1 = () => {
        updateClicked1(!isClicked1);
    };

    const [isClicked2, updateClicked2] = useState(false)

    const handleMenuClick2 = () => {
        updateClicked2(!isClicked2);
    };

    const handleElementClick = (event) => {
        const allElements = document.querySelectorAll(".element");
        allElements.forEach((el) => el.classList.remove("underline"));
        event.target.classList.add("underline")
        console.log(event.target.textContent)
        if (event.target.textContent === "• Modifier un produit"){
            setSelectedComponent(<EditArticle use= "edit"/>)
        } else if (event.target.textContent === "• Supprimer un produit") {
            setSelectedComponent(<EditArticle use= "delete"/>)
        } else if (event.target.textContent === "• Ajouter un produit"){
            setModel("Nouveau")
            setSelectedComponent(
                <div className="add-mode">
                    <div className="selector">
                        <label htmlFor="comboBox">Choisissez un model :</label>
                        <select id="comboBox" name="options" onChange={handleModelChange}>
                            <option value="Nouveau">Nouveau</option>
                            {models.map((element) =>(
                                <option key={element.model_id} value={element.model_name}>{element.model_name}</option>
                            ))}
                        </select>
                    </div> 
                    <PageProduct mode="add" onSubmitProduct={handleAddButtonClick} model={"Nouveau"}/>
                </div>
            )
        }
    }

    const handleAddButtonClick = async (productData, modelData, imageData) => {
        const {
            addMode,
            modelName,
            rangeType,
            manufacturer,
            passengerCapacity,
            engines,
            speedAvg,
            maxRange,
            maxAltitude,
            crewSize,
            length,
            wingspan,
            height,
            maxTakeoffWeight,
        } = modelData;

        const {
            serialNumber,
            manufactureYear,
            flightHours,
            configuration,
            recentMaintenance,
            typicalRoutes,
            owner,
            costPerKm,
            monthlyMaintenanceCost,
            estimatedPrice,
            isAvailable,
        } = productData;
    
        let insertedAircraftId = null;
    
        try {
            // Étape 1 : Insérer le modèle (si nécessaire)
            if (addMode === "Nouveau") {
                const resultInsertModel = await insertModel(
                    modelName,
                    rangeType,
                    manufacturer,
                    +passengerCapacity,
                    engines,
                    speedAvg,
                    +maxRange,
                    maxAltitude,
                    crewSize,
                    length,
                    wingspan,
                    height,
                    maxTakeoffWeight
                );
    
                if (!resultInsertModel.success) {
                    throw new Error("Échec de l'insertion du modèle.");
                }
    
            }
    
            // Étape 2 : Insérer l'aircraft
            const model = await getModelByName(modelName);
            const resultInsertAircraft = await insertAircraft(
                model.model_id,
                serialNumber,
                +manufactureYear,
                flightHours,
                configuration,
                recentMaintenance,
                typicalRoutes,
                owner,
                costPerKm,
                monthlyMaintenanceCost,
                +estimatedPrice,
                isAvailable
            );
    
            if (!resultInsertAircraft.success) {
                throw new Error("Échec de l'insertion de l'aircraft.");
            }
    
            insertedAircraftId = await getAircraftBySerialNumber(serialNumber); // Stocker l'ID de l'aircraft inséré
            insertedAircraftId = insertedAircraftId.aircraft_id
            // Étape 3 : Gestion des images
            const { file, files, icon } = imageData;
    
            // Image principale
            if (file) {
                const responseMainImage = await uploadImage(file, model.model_name, insertedAircraftId);
                if (!responseMainImage.success) throw new Error("Échec de l'upload de l'image principale.");
    
                const resultMainImage = await insertImage("main", insertedAircraftId, responseMainImage.filePath);
                if (!resultMainImage.success) throw new Error("Échec de l'insertion de l'image principale.");
            } else throw new Error("Échec de l'upload de l'image principale.");
    
            // Icône
            if (icon) {
                const responseIcon = await uploadImage(icon, model.model_name, insertedAircraftId);
                if (!responseIcon.success) throw new Error("Échec de l'upload de l'icône.");
    
                const resultIcon = await insertImage("icon", insertedAircraftId, responseIcon.filePath);
                if (!resultIcon.success) throw new Error("Échec de l'insertion de l'icône.");
            } else throw new Error("Échec de l'upload de l'image principale.");
    
            // Images du slider
            if (files && files.length > 0) {
                for (const sliderImage of files) {
                    const responseSlider = await uploadImage(sliderImage, model.model_name, insertedAircraftId);
                    if (!responseSlider.success) throw new Error("Échec de l'upload d'une image du slider.");
    
                    const resultSliderImage = await insertImage("slider", insertedAircraftId, responseSlider.filePath);
                    if (!resultSliderImage.success) throw new Error("Échec de l'insertion d'une image du slider.");
                }
            } else throw new Error("Échec de l'upload de l'image principale.");
    
            console.log("Toutes les opérations ont été effectuées avec succès !");
        } catch (error) {
            alert("Il y a eu un problème lors de l'insertion du nouveau produit. Veillez à ce que toutes les images et icones soient remplis et que tous les champs ne contiennent pas le texte 'Inconnu' !")
    
            // Rollback
            if (insertedAircraftId) {
                console.log("Annulation : suppression de l'aircraft...");
                await deleteAircraft(insertedAircraftId, modelName);
            }
    
            if (model && addMode === "Nouveau") {
                console.log("Annulation : suppression du modèle...");
                await deleteModel(model.model_id, modelName);
            }
        }
    };
    
    
    const handleModelChange = async (event) => {
        const selectedModelName = event.target.value;
        if (selectedModelName === "Nouveau") {
            setModel("Nouveau");
        } else {
            const fetchedModel = await getModelByName(selectedModelName);
            setModel(fetchedModel);
        }
    };

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await getAllModel();
                setModels(response.data);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des modèles :", error);
            }
        };
        if (models == null) fetchModels()
        
    })

    useEffect(() => {
        // Mettre à jour le composant quand le modèle change
        if (model) {
            setSelectedComponent(
                <div className="add-mode">
                    <div className="selector">
                        <label htmlFor="comboBox">Choisissez un modèle :</label>
                        <select id="comboBox" name="options" onChange={handleModelChange}>
                            <option value="Nouveau">Nouveau</option>
                            {models.map((element) => (
                                <option key={element.model_id} value={element.model_name}>
                                    {element.model_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <PageProduct mode="add" onSubmitProduct={handleAddButtonClick} model={model} />
                </div>
            );
        }
    }, [model, models]);

    return (
        <div className="page-admin">
            <div className="first-admin-component">
                <div className="title-menu">
                    {isClicked1 ? <FaChevronDown onClick={handleMenuClick1} className="chevron"/> : <FaChevronRight onClick={handleMenuClick1} className="chevron" />}
                    <p>Articles</p>
                </div>

                {isClicked1 && 
                    <div className="title-menu-child">
                        <p className ="element" onClick={handleElementClick}>• Ajouter un produit</p>
                        <p className ="element" onClick={handleElementClick}>• Modifier un produit</p>
                        <p className ="element" onClick={handleElementClick}>• Supprimer un produit</p>
                    </div>
                }

                <div className="title-menu">
                    {isClicked2 ? <FaChevronDown onClick={handleMenuClick2} className="chevron"/> : <FaChevronRight onClick={handleMenuClick2} className="chevron" />}
                    <p>Utilisateurs</p>
                </div>

                {isClicked2 && 
                    <div className="title-menu-child">
                        <p className ="element" onClick={handleElementClick}>• Ajouter un utilisateur</p>
                        <p className ="element" onClick={handleElementClick}>• Modifier un utilisateur</p>
                        <p className ="element" onClick={handleElementClick}>• Supprimer un utilisateur</p>
                    </div>
                }
                
            </div>
            <div className="second-admin-component">
                {selectedComponent}
            </div>
        </div>
    )
}