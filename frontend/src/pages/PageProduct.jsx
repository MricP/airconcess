import React from 'react'
import Template from '../components/Template';
import ProductShowcase from '../components/pageProduct/ProductShowcase';
import ProductDescription from '../components/pageProduct/ProductDescription';
import Slider from "../components/pageProduct/Slider";
import ProductMap from '../components/pageProduct/ProductMap';

function PageProduct() {
  const images = [
    {id:1,url:'/assets/image1.jpg'},
    {id:2,url:'/assets/image2.jpg'},
    {id:3,url:'/assets/image3.jpg'},
    {id:4,url:'/assets/image.png'},
    {id:5,url:'/assets/image1.jpg'},
    {id:6,url:'/assets/image2.jpg'},
    {id:7,url:'/assets/image3.jpg'},
    {id:8,url:'/assets/image1.jpg'},
    {id:9,url:'/assets/image2.jpg'},
    {id:10,url:'/assets/image3.jpg'},
    {id:11,url:'/assets/image1.jpg'},
    {id:12,url:'/assets/image2.jpg'},
    {id:13,url:'/assets/image3.jpg'},
    {id:14,url:'/assets/image1.jpg'},
    {id:15,url:'/assets/image2.jpg'},
    {id:16,url:'/assets/image3.jpg'}
  ]

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

  return (
    <Template>
      <ProductShowcase productName={"Gulfstream G650ER"} imagePath={images[3].url}/>
      <ProductDescription modelName="Gulfstream G650ER" modelDescription={modelDescription} deviceDescription= {deviceDescription}/>
      <ProductMap/>
      <Slider images={images}/>
    </Template>
  )
}

export default PageProduct;
