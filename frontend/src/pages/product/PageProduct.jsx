import "../../styles/product/PageProduct.css";
import React, { useEffect, useState } from "react";
import ProductShowcase from "../../components/product/ProductShowcase";
import ProductDescription from "../../components/product/ProductDescription";
import Slider from "../../components/product/Slider";
import ProductMap from "../../components/product/ProductMap";
import { useLocation } from "react-router-dom";
import DarkButton from "../../components/general/DarkButton";
import { BiDownload } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";

import { getMainImage, getSliderImages, getModelDescription, getAircraftDescription, getModelName, getAircraft} from "../../services/product";
import ResultPage from "../ResultPage";

function PageProduct({mode, onSubmitProduct, model}) {
  /*################### CONSTANTES ####################*/

  const location = useLocation().pathname.split("/");
  const id = parseInt(location[location.length - 1]); // Récupération de l'ID

  /*############ INITIALISATION DES STATES ############*/

  const [isIdValid, updateIdValidity] = useState(!isNaN(id));

  const [aircraft,setAircraft] = useState(null) //Stock l'aircraft correspondant à l'id
  const [modelName, updateModelName] = useState("Inconnu") //Stock le nom du model de l'aircaft
  const [mainImg, updateMainImg] = useState({ url: "/assets/not-available.png", id: 0 });
  const [sliderImgs, updateSliderImgs] = useState([]);
  const [iconImg, setIconImage] = useState(null)

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

  /*################### REFERENCES ####################*/
  // Pour utiliser les states dans les useEffect sans détecter un changement de cette variable

  // const modelDescriptionRef = useRef(modelDescription);
  // const aircraftDescriptionRef = useRef(aircraftDescription);

  /*#################### FONCTIONS ####################*/

  /**
   * Formate un nombre pour ajouter des points comme séparateurs de milliers.
   * @param {number|string} num - Le nombre à formater.
   * @returns {string} - Le nombre formaté.
   */
  function formatNumber(num) {
    const numStr = num.toString();
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  /*###################### AUTRE ######################*/

  // Charger les données lorsque le composant est monté ou lorsque "id" change
  useEffect(() => {
    const loadDataFromDB = async () => {
      try {
        if (isNaN(id)) {// S'il n'y a pas d'id
          updateIdValidity(false);
          return;
        } else {
          const airc = await getAircraft(id);
          if(airc) { 
            setAircraft(airc);
          } else { // Si l'id ne correspond à aucun aircraft
            updateIdValidity(false);
            return;
          }
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
          const newDescription = []
          dbModelDescription.forEach((element) => {
            if(element.value) {
              const criteria = modelDescription.current.find((elt) => elt.varName === element.varName)
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
              const criteria = aircraftDescription.current.find((elt) => elt.varName === element.varName)
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
    
    loadDataFromDB();
  }
  , [id]);

  /*:::::::::::::::::::::::::::::::::::::: PARTIE ADMIN ::::::::::::::::::::::::::::::::::::::*/

  /*:::::::::::: INITIALISATION DES STATES ::::::::::::*/

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
    description: ""
  });

  const [imageData, setImageData] = useState({
    file : null,
    files : null,
    icon : null,
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

  /*:::::::::::::::::::: FONCTIONS ::::::::::::::::::::*/

  const handleSubmit = () => {
    if (onSubmitProduct) {
      onSubmitProduct(productData, modelData, imageData); // Appelle la fonction du parent
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
    setImageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setIconImage(e.target.result);
      reader.readAsDataURL(file);
      handleInputChange("icon", file)
    } else {
      setIconImage(null);
      alert("Veuillez choisir un fichier valide.");
    }
  };

  /*:::::::::::::::::::::: AUTRE ::::::::::::::::::::::*/

  useEffect(() => {
    if(model !== "Nouveau" && mode === "add"){
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
  }, [model,mode]);

  
  // Si l'id est invalide ou qu'il n'y a pas d'aircraft à afficher
  if (!isIdValid && mode !== "add") {
    return(<ResultPage message='Aucun aéronef correspondant.'/>)
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
      <ProductMap aircraft={aircraft} modelName={modelName}/>
      <Slider images={sliderImgs} mode={mode} onInputChange={handleInputChange}/>
      {mode === "add" && 
      <div className="bottom-product-page">
        {iconImg == null ? 
          <div className='label-container'>
              <label htmlFor="input-icon">
                  <div className='label-content'>
                      <BiDownload /> Insérer une icone 
                  </div> 
                  <input id="input-icon" type="file" accept="image/*" onChange={handleFileChange}/>
              </label>
          </div> :
          <div className='label-content'>
              <GrStatusGood color='green'/> Icone insérée
          </div>
        }
        <p>Description du produit</p>
        <textarea name="" id="" onChange={(e) => {handleInputChange("description", e.target.value)}}></textarea>
        
        <DarkButton className={"add-button"} onClick={handleSubmit}>Ajouter le nouveau produit</DarkButton>
      </div>}
    </main>
  );
}

export default PageProduct;

