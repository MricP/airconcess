import "../../styles/product/PageProduct.css";
import React, { useEffect, useState } from "react";
import ProductShowcase from "../../components/product/ProductShowcase";
import ProductDescription from "../../components/product/ProductDescription";
import Slider from "../../components/product/Slider";
import ProductMap from "../../components/product/ProductMap";
import { useLocation, useNavigate } from "react-router-dom";
import DarkButton from "../../components/general/DarkButton";

import { getMainImage, getSliderImages, getModelDescription, getAircraftDescription, getModelName, getAircraft} from "../../services/product";

function PageProduct({mode, onSubmitProduct, model}) {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const id = parseInt(location[location.length - 1]); // Récupération de l'ID
  
  const [isIdValid, updateIdValidity] = useState(!isNaN(id));

  const [modelName, updateModelName] = useState("Inconnu")
  const [mainImg, updateMainImg] = useState({ url: "/assets/not-available.png", id: 0 });
  const [sliderImgs, updateSliderImgs] = useState([]);
  const [modelDescription, updateModelDescription] = useState([
      {varName:"range_type", txt:"Rayon d'action", value:"Inconnu"},
      {varName:"manufacturer", txt:"Constructeur", value:"Inconnu"},
      {varName:"passenger_capacity", txt:"Capacité ", value:"Inconnu"},
      {varName:"crew_size", txt:"Équipage", value:"Inconnu"},
      {varName:"length", txt:"Longueur" , value:"Inconnu"},
      {varName:"wingspan", txt:"Envergure" , value:"Inconnu"},
      {varName:"height", txt:"Hauteur" , value:"Inconnu"},
      {varName:"max_takeoff_weight", txt:"Poids maximum au décollage" , value:"Inconnu"},
      {varName:"engines", txt:"Moteurs" , value:"Inconnu"},
      {varName:"speed_avg", txt:"Vitesse moyenne" , value:"Inconnu"},
      {varName:"max_range", txt:"Portée maximale" , value: "Inconnu"},
      {varName:"max_altitude", txt:"Altitude maximale" , value:"Inconnu"}
  ])
  const [aircraftDescription, updateAircraftDesciption] = useState([
      {varName:"serial_number", txt:"Numéro de série", value:"Inconnu"},
      {varName:"manufacture_year", txt:"Année de fabrication", value:"Inconnu"},
      {varName:"flight_hours", txt:"Heures de vol", value:"Inconnu"},
      {varName:"configuration", txt:"Configuration", value:"Inconnu"},
      {varName:"recent_maintenance", txt:"Maintenance récente", value:"Inconnu"},
      {varName:"typical_routes", txt:"Trajets typiques", value:"Inconnu"},
      {varName:"owner", txt:"Propriétaire", value:"Inconnu"},
      {varName:"cost_per_km", txt:"Coût par kilomètre", value:"Inconnu"},
      {varName:"monthly_maintenance_cost", txt:"Coût mensuel d’entretien", value:"Inconnu"},
      {varName:"estimated_price", txt:"Prix estimé ", value:"Inconnu"},
  ])

  /**
   * Formate un nombre pour ajouter des points comme séparateurs de milliers.
   * @param {number|string} num - Le nombre à formater.
   * @returns {string} - Le nombre formaté.
   */
  function formatNumber(num) {
    const numStr = num.toString();
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  

  // Charge toutes les data à afficher en fonction de l'id de l'appareil (idAircraft)
  const loadDataFromDB = async () => {
    try {
      // S'il n'y a pas d'id ou que cet aircraft n'existe pas
      if (isNaN(id) || !(await getAircraft(id))) {
        updateIdValidity(false);
        return;
      }

      // Appels des services
      const dbModelName = await getModelName(id)
      const dbMainImg = await getMainImage(id)
      const dbSliderImgs = await getSliderImages(id)
      const dbModelDescription = await getModelDescription(id)
      const dbAircraftDescription = await getAircraftDescription(id)

      if(dbModelName) updateModelName(dbModelName)
      if(dbMainImg) updateMainImg(dbMainImg);
      if(dbSliderImgs) updateSliderImgs(dbSliderImgs);

      if(dbModelDescription) {
        console.log(dbModelDescription)
        const newDescription = []
        dbModelDescription.forEach((element) => {
          if(element.value) {
            const criteria = modelDescription.find((elt) => elt.varName === element.varName)
            if(criteria) {
              let updatedCriteria = { ...criteria, value: element.value };
              if(criteria.varName === "passenger_capacity") updatedCriteria = { ...criteria, value:"Jusqu'à "+element.value+" passagers"};
              else if(criteria.varName === "max_range") updatedCriteria = { ...criteria, value: element.value+" km"};
              newDescription.push(updatedCriteria);
            }
          }
        });
        updateModelDescription(newDescription)
      }

      if(dbAircraftDescription) {
        const newDescription = []
        dbAircraftDescription.forEach(element => {
          if(element.value) {
            const criteria = aircraftDescription.find((elt) => elt.varName === element.varName)
            if(criteria) {
              let updatedCriteria = { ...criteria, value: element.value };
              if(criteria.varName === "flight_hours") updatedCriteria = { ...criteria, value:element.value+" heures"};
              else if(criteria.varName === "estimated_price") updatedCriteria = { ...criteria, value: formatNumber(element.value)+" €"};
              newDescription.push(updatedCriteria)
            }
          }
        });
        
        updateAircraftDesciption(newDescription)
      }
      
    } catch (error) {
      console.error(
        "Error response : ",
        error.response?.data?.message || "Unknown error"
      );
    }
  };

  // Charger les données lorsque le composant est monté ou lorsque `id` change
  useEffect(() => {
    loadDataFromDB();
  }, [id]);

  const [productData, setProductData] = useState({
    serialNumber: "",
    manufactureYear: "",
    flightHours: "",
    configuration: "",
    recentMaintenance: "",
    typicalRoutes: "",
    owner: "",
    costPerKm: "",
    monthlyMaintenanceCost: "",
    estimatedPrice: "",
    isAvailable: 1,
  });

  const [mainImageData, setMainImageData] = useState({
    file : null,
  });

  const [sliderImageData, setSliderImageData] = useState({
    files : null,
  });

  const [modelData, setModelData] = useState({
    addMode: "Nouveau",
    modelName: "",
    rangeType: "",
    manufacturer: "",
    passengerCapacity: "",
    engines: "", 
    speedAvg: "", 
    maxRange: "", 
    maxAltitude: "", 
    crewSize: "", 
    length: "", 
    wingspan: "", 
    height: "", 
    maxTakeoffWeight: "",
  });

  useEffect(() => {
    if(model != "Nouveau" && mode == "add"){
      setModelData({
        addMode: "",
        modelName: model.model_name,
        rangeType: "",
        manufacturer: "",
        passengerCapacity: "",
        engines: "", 
        speedAvg: "", 
        maxRange: "", 
        maxAltitude: "", 
        crewSize: "", 
        length: "", 
        wingspan: "", 
        height: "", 
        maxTakeoffWeight: "",
      })
    }
  }, [model]);

  const handleSubmit = () => {
    if (onSubmitProduct) {
      onSubmitProduct(productData, modelData, mainImageData, sliderImageData); // Appelle la fonction du parent
    }
  };

  const handleInputChange = (field, value) => {
    setModelData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setMainImageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setSliderImageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  // Si l'id est invalide ou qu'il n'y a pas d'aircraft à afficher
  if (!isIdValid && mode !== "add") {
    return (
      <main>
        <h2>Aucun aéronef correspondant.</h2>
        <button onClick={() => navigate("/")}>Retourner vers l'accueil</button>
      </main>
    );
  }
  return (
    <main className="page-product">
      <ProductShowcase
        modelName={modelName}
        imagePath={mainImg.url}
        mode={mode}
        model={model}
        onInputChange={handleInputChange}
      />
      <ProductDescription
        aircraftId={id}
        modelName={modelName}
        modelDescription={modelDescription}
        aircraftDescription={aircraftDescription}
        mode={mode}
        onInputChange={handleInputChange}
        modelSelected={model}
      />
      <ProductMap/>
      <Slider images={sliderImgs} mode={mode} onInputChange={handleInputChange}/>
      {mode === "add" && <div className="bottom-product-page"><DarkButton className={"add-button"} onClick={handleSubmit}>Ajouter le nouveau produit</DarkButton></div>}
    </main>
  );
}

export default PageProduct;

