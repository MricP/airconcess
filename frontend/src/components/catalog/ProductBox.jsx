import React, { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";
import "../../styles/catalog/ProductBox.css";
import { useNavigate } from 'react-router-dom';
import { IoTrashBin } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { deleteAircraft, getModelName } from '../../services/product';
import PageProduct from '../../pages/product/PageProduct';
import { updateAircraft, updateMainImage, updateSliderImages } from '../../services/product';

export const ProductBox = (props) => {
  const navigate = useNavigate();
  const [showProductPage, setShowProductPage] = useState(false);

  const icon = props.use === "delete" ? <IoTrashBin size={30} color='red'/> : <CiEdit size={30} />;

  const handleButtonClick = async () => {
    if (props.use === "edit") {
      setShowProductPage(true); // Afficher la page produit directement
    } else {
      console.log(props.aircraftId);
      const nameModel = await getModelName(props.aircraftId);
      console.log(nameModel[0]);
      const response = await deleteAircraft(props.aircraftId, nameModel[0]);
      console.log("Réponse du serveur lors de la suppression : " + response);
      window.location.reload();
    }
  };

  const handleAddButtonClick = async (productData, imageData) => {
  
          const {
              id,
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
              description
          } = productData;
      
      
          try {
              
              const resultUpdateAircraft = await updateAircraft(
                  id,
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
                  description
              );
      
              if (!resultUpdateAircraft) {
                  throw new Error("Échec de la mise à jour de l'aircraft.");
              }
      
              const { file, files, icon } = imageData;
      
              // Image principale
              if (file) {
                  updateMainImage(id, file)
              } else throw new Error("Échec de la mise à jour de l'image principale.");
      
              // Icône
              if (icon) {
                  
              } else throw new Error("Échec de l'upload de l'image icône.");
      
              // Images du slider
              if (files && files.length > 0) {
                updateMainImage(id, files)
              } else throw new Error("Échec de l'upload des images du slider.");
      
              console.log("Toutes les opérations ont été effectuées avec succès !");
              window.location.reload()
          } catch (error) {
              alert(error)
              window.location.reload()
          }
        }
  if (showProductPage) {
    return <PageProduct aircraftId={props.idAircraft} onSubmitProduct={handleAddButtonClick}  mode={"edit"}/>;
  }

  return (
      <div className='productBox-container'>
        <div className='catalog-productImage-container'>
          <div className='available-container'>
            {props.isAvailable === 1 ? <FaRegCircleDot color='#43A73A'/> : <FaRegCircleDot color='#ea2424'/> }
            <p className='catalogAvailable'>{props.isAvailable === 0 ? "INDISPONIBLE" : "DISPONIBLE"}</p>
          </div>
          <img className='catalog-planeImg' src={props.planeImg} alt="plane img"/>
          <div className='imageInfo-container'>
              <p>{props.modelName}</p>
              <p>{props.serialNumber}</p>
              <p className='catalogPrice'>{props.price}</p>
          </div>
        </div>  

        <div className='catalog-productDescription-container'>
            <div className="bin">
                <button onClick={handleButtonClick}>{icon}</button>
            </div>
            <div className='planeInfos-container'>
                <div className='planeInfos'>
                    <p className='infoTitle'>Année</p>
                    <p>{props.year}</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Heures</p>
                    <p>{props.hour}</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Capacité</p>
                    <p>{props.capacity} pers</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Autonomie</p>
                    <p>{props.autonomy} km</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Type</p>
                    <p>{props.aircraftType}</p>
                </div>
            </div>
            <p>{props.description}</p>
            <div className='LearnMorebButton'>
              <p>EN SAVOIR PLUS</p>
              <button onClick={() => navigate(`/product/${props.idAircraft}` )}>
                <FaArrowRightLong size={20}/>
              </button>
            </div>
        </div>
      </div>
  );
}
