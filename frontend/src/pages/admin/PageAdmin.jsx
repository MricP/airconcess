import "../../styles/admin/PageAdmin.css";
import EditArticle from "../../components/admin/EditArticle";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import PageProduct from "../product/PageProduct";
import { insertAircraft, insertModel, getModelByName } from "../../services/product";

export default function PageAdmin(){

    const [isClicked1, updateClicked1] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState(null);
    
    

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
            setSelectedComponent(<PageProduct mode="add" onSubmitProduct={handleAddButtonClick}/>)
        }
    }

    const handleAddButtonClick = async (productData, modelData) => {
        console.log("Données reçues :", productData);
        

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

        if (addMode === "Nouveau"){
            await insertModel(
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
        }

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
          console.log(modelName)
          
          const model = await getModelByName(modelName);
          console.log(model)
      
          await insertAircraft(
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

      };

      

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