import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { ProductBox } from '../components/ProductBox';
import gulfstreamG650ER from '../styles/assets/img/catalog/gulfstreamG650.svg'
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


function CatalogPage() {

    const [aircrafts, setAircrafts] = useState([]);
    const [page, setPage] = useState(1);
    const isMobile = useMediaQuery({ maxWidth: 750 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchAircrafts = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://localhost/air-concess/backend/public/api.php`);
            setAircrafts(response.data.data); 
            setError(null); 
          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            setError("Une erreur s'est produite lors du chargement des données.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchAircrafts();
      }, [page]); 

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    const handleNextPage = () => {
        if(page < 5){
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
    <main className='main-container'> 
        <div className="title-container">
            <h1 className='title white'>Notre Catalogue</h1>
            <p className='catalog-subtitle  white'>Explorez notre catalogue d'avions haut de gamme, alliant performance et luxe. Trouvez l'appareil parfait pour vos besoins.</p> 
        </div>
        
        <div className="filterBar-container">
            <button><CiSearch className='filterIcon' size={40} color='#b5b5b5'/></button>
            <button><CiFilter className='filterIcon' size={40} color='#b5b5b5'/></button>
            <input placeholder='Rechercher un Modèle ...' type="text" />
        </div>
        <div className='catalogContent-container'>
          {!isMobile &&
            <div className='filterDescription'>
                <div className='filterDescription-title'><CiFilter size={30} color='#b5b5b5'/><h3>Liste des Filtres</h3></div>
                <ul className='editFilterList'>
                  <div className='editFilter-container'><li>Etat :</li><div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Prix :</li><div><button className='editFilterButton'><FaEdit size={20} /></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Catégorie :</li><div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Année :</li> <div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Capacité :</li> <div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Autonomie :</li> <div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                </ul>
            </div>} 
            
            
            <div className="separator"></div>
            <div className='planeContainer'>
            {Array.isArray(aircrafts) && aircrafts.length > 0 ? (
                aircrafts.map((aircraft) => (
                <ProductBox
                    key={aircraft.idAircraft}
                    isAvailable={aircraft.isAvailable}
                    planeImg={gulfstreamG650ER}
                    modelName={aircraft.model}
                    serialNumber={aircraft.serialNumber}
                    price={`USD $ ${aircraft.price}`}
                    year={aircraft.year}
                    hour={aircraft.hours}
                    capacity={aircraft.capacity}
                    autonomy={aircraft.autonomy}
                    description={aircraft.description}
                />
                ))
            ) : (
                <p>Aucun avion trouvé.</p>
            )}
                            
              <div className='chooseCatalogPage'><button><IoIosArrowBack color='#B5B5B5' size={35} onClick={handlePreviousPage}/></button><p>{page}/5</p><button><IoIosArrowForward color='#B5B5B5' size={35} onClick={handleNextPage}/></button></div>
            </div>  
        </div>
    </main>
  )
}

export default CatalogPage;