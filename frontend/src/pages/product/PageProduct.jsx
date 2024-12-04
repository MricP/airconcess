import React, { useEffect, useState } from "react";
import ProductShowcase from "../../components/product/ProductShowcase";
import ProductDescription from "../../components/product/ProductDescription";
import Slider from "../../components/product/Slider";
import ProductMap from "../../components/product/ProductMap";
import { useLocation, useNavigate } from "react-router-dom";

import { getMainImage, getSliderImages } from "../../services/product";

function PageProduct() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const id = parseInt(location[location.length - 1]); // Récupération de l'ID
  const [isIdValid, updateIdValidity] = useState(!isNaN(id));

  const [mainImg, updateMainImg] = useState({ url: "", id: 0 });
  const [sliderImgs, updateSliderImgs] = useState([]); // Initialisation avec un tableau vide

  // Données de description fictives
  const modelDescription = [
    "Rôle : Jet privé d'affaires à long rayon d'action",
    "Constructeur : Gulfstream Aerospace",
    "Capacité : Jusqu'à 19 passagers",
    "Équipage : 2 pilotes",
    "Longueur : 30,41 m",
    "Envergure : 30,36 m",
    "Hauteur : 7,82 m",
    "Poids maximum au décollage (MTOW) : 103 600 lb (47 000 kg)",
    "Moteurs : Deux réacteurs Rolls-Royce BR725 A1-12",
    "Vitesse de croisière : Mach 0.85 (environ 904 km/h)",
    "Portée maximale : 13 890 km (7 500 miles nautiques) avec 8 passagers",
    "Altitude maximale : 51 000 pieds (15 545 mètres)",
    "Prix estimé : Environ 66 millions de dollars "
  ];

  const deviceDescription = [
    "Numéro de série : 6205",
    "Année de fabrication : 2020",
    "Kilométrage total (heures de vol) : 3 500 heures de vol (environ 2,7 millions de kilomètres parcourus)",
    "Configuration : 14 sièges avec une configuration en 3 zones distinctes (salon, salle de conférence, chambre privée)",
    "Maintenance récente : Révision complète effectuée à 3 000 heures de vol",
    "Vitesse moyenne observée en croisière : Mach 0.85",
    "Trajets typiques : Vols intercontinentaux tels que New York - Dubaï ou Londres - Tokyo",
    "Propriétaire : Grande entreprise multinationale (fictif)",
    "Coût par kilomètre : X €",
    "Coût mensuel d’entretien : X €"
  ];

  // Fonction pour récupérer les images principales et du slider
  const handleGetImages = async () => {
    try {
      if (isNaN(id)) {
        updateIdValidity(false);
        return;
      }

      // Appels des services
      const mainImage = await getMainImage(id);
      console.log(mainImage)
      const sliderImages = await getSliderImages(id);
      console.log(sliderImages)

      // Mise à jour des états
      updateMainImg(mainImage);
      //updateSliderImgs(sliderImages);
    } catch (error) {
      console.error(
        "Error response:",
        error.response?.data?.message || "Unknown error"
      );
    }
  };

  // Charger les images lorsque le composant est monté ou lorsque `id` change
  useEffect(() => {
    handleGetImages();
  }, [id]);


  // Si l'id est invalide ou qu'aucun 
  if (!isIdValid) {
    return (
      <main>
        <h2>Aucun aéronef correspondant.</h2>
        <button onClick={() => navigate("/")}>Retourner vers l'accueil</button>
      </main>
    );
  }
  return (
    <main>
      <ProductShowcase
        productName={"Gulfstream G650ER"}
        imagePath={mainImg.url}
      />
      <ProductDescription
        modelName="Gulfstream G650ER"
        modelDescription={modelDescription}
        deviceDescription={deviceDescription}
      />
      <ProductMap />
      <Slider images={sliderImgs} />
    </main>
  );
}

export default PageProduct;

