import "../../styles/admin/PageAdmin.css";
import EditArticle from "../../components/admin/EditArticle";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import PageProduct from "../product/PageProduct";
import CreateUser from "../../components/admin/CreateUser";
import UpdateUser from "../../components/admin/UpdateUser";


import { insertAircraft, insertModel, getModelByName, getAllModel, uploadImage, insertImage, getAircraftBySerialNumber, deleteAircraft, deleteModel, getLastLogs, insertLog } from "../../services/product";
import { useNavigate } from "react-router-dom";

export default function PageAdmin() {
    const navigate = useNavigate();
    const [isClicked1, updateClicked1] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [models, setModels] = useState(null);
    const [model, setModel] = useState(null)
    const [mode, setMode] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);


    const handleMenuClick1 = () => {
        updateClicked1(!isClicked1);
    };

    const [isClicked2, updateClicked2] = useState(false)

    const handleMenuClick2 = () => {
        updateClicked2(!isClicked2);
    };

    const handleElementClick = (event) => {
        setSelectedElement(event.target.textContent);

        if (event.target.textContent === "• Modifier un produit") {
            setMode("edit");
            setSelectedComponent(<EditArticle use="edit" />);
        } else if (event.target.textContent === "• Supprimer un produit") {
            setSelectedComponent(<EditArticle use="delete" />);
        } else if (event.target.textContent === "• Ajouter un produit") {
            setMode("add");
            setModel("Nouveau");  // Mettre à jour l'état
        } else if (event.target.textContent === "• Ajouter un utilisateur") {
            setSelectedComponent(<CreateUser />)
        } else if (event.target.textContent === "• Modifier un utilisateur") {
            setSelectedComponent(<UpdateUser />)
        }
    };

    // Ajout d'un useEffect pour surveiller les changements de `model` et `mode`
    useEffect(() => {
        if (mode === "add") {
            setSelectedComponent(
                <div className="add-mode">
                    <div className="selector">
                        <label htmlFor="comboBox">Choisissez un modèle :</label>
                        <select id="comboBox" name="options" onChange={handleModelChange}>
                            <option value="Nouveau">Nouveau</option>
                            {models?.map((element) => (
                                <option key={element.model_id} value={element.model_name}>{element.model_name}</option>
                            ))}
                        </select>
                    </div>
                    <PageProduct mode={mode} onSubmitProduct={handleAddButtonClick} model={"Nouveau"} />
                </div>
            );
        }
    }, [mode, model]);

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
            description
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
                isAvailable,
                description
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
            } else throw new Error("Échec de l'upload de l'image icône.");

            // Images du slider
            if (files && files.length > 0) {
                for (const sliderImage of files) {
                    const responseSlider = await uploadImage(sliderImage, model.model_name, insertedAircraftId);
                    if (!responseSlider.success) throw new Error("Échec de l'upload d'une image du slider.");

                    const resultSliderImage = await insertImage("slider", insertedAircraftId, responseSlider.filePath);
                    if (!resultSliderImage.success) throw new Error("Échec de l'insertion d'une image du slider.");
                }
            } else throw new Error("Échec de l'upload des images du slider.");


            if (addMode === "Nouveau") {
                const contentModel = `Nouveau model inséré : ${model}`
                await insertLog(contentModel)
            }
            const contentAircraft = `Nouveau produit inséré : ${model} ${serialNumber}`
            await insertLog(contentAircraft)

            console.log("Toutes les opérations ont été effectuées avec succès !");
            window.location.reload()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate('/');
            }
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
                if (error.response && error.response.status === 403) {
                    navigate('/');
                } else {
                    console.error("Erreur lors de la récupération des modèles :", error);
                }
            }
        };
        if (models == null) fetchModels()
    }, [models, navigate]);


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
                    <PageProduct mode={mode} onSubmitProduct={handleAddButtonClick} model={model} />
                </div>
            );
        }
    }, [model, models]);

    useEffect(() => {
        const fetchLogs = async () => {
            const response = await getLastLogs();
            setSelectedComponent(
                <div className="last-modifications">
                    <h2>Dernières modifications</h2>
                    <div className="logs">
                        {response.map((element) => (
                            <div className="log" key={element.id}>
                                <p>{element.log_content}</p>
                                <p>{element.date_log}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        };
        if (selectedComponent == null) fetchLogs()


    }, [selectedComponent])

    return (
        <div className="page-admin">
            <div className="first-admin-component">
                <div className="title-menu">
                    {isClicked1 ? <FaChevronDown onClick={handleMenuClick1} className="chevron" /> : <FaChevronRight onClick={handleMenuClick1} className="chevron" />}
                    <p>Produits</p>
                </div>

                {isClicked1 &&
                    <div className="title-menu-child">
                        <p className={`element ${selectedElement === "• Ajouter un produit" ? "underline" : ""}`} onClick={handleElementClick}>• Ajouter un produit</p>
                        <p className={`element ${selectedElement === "• Modifier un produit" ? "underline" : ""}`} onClick={handleElementClick}>• Modifier un produit</p>
                        <p className={`element ${selectedElement === "• Supprimer un produit" ? "underline" : ""}`} onClick={handleElementClick}>• Supprimer un produit</p>
                    </div>
                }

                <div className="title-menu">
                    {isClicked2 ? <FaChevronDown onClick={handleMenuClick2} className="chevron" /> : <FaChevronRight onClick={handleMenuClick2} className="chevron" />}
                    <p>Utilisateurs</p>
                </div>

                {isClicked2 &&
                    <div className="title-menu-child">
                        <p className={`element ${selectedElement === "• Ajouter un utilisateur" ? "underline" : ""}`} onClick={handleElementClick}>• Ajouter un utilisateur</p>
                        <p className={`element ${selectedElement === "• Modifier un utilisateur" ? "underline" : ""}`} onClick={handleElementClick}>• Modifier un utilisateur</p>
                    </div>
                }

            </div>
            <div className="second-admin-component">
                {selectedComponent}
            </div>
        </div>
    )
}