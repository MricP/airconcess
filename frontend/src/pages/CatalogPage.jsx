import React, { useRef } from 'react'
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
    const [nbAircraft, setNbAircraft] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 1130 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const catalogRef = useRef(null);
    const [searchPlane, setSearchPlane] = useState("");

// déclaration des références pour les filtres

  const stateRef = useRef(null);
  const priceRef = useRef(null);
  const yearRef = useRef(null);
  const autonomyRef = useRef(null);
  const capacityRef = useRef(null);
  const typeRef = useRef(null);
  
  let [filteredAircrafts, setFilteredAircrafts] = useState([]);

    useEffect(() => {
        const fetchAircrafts = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://localhost/air-concess/backend/public/api.php?page=${page}`);
            setAircrafts(response.data.data);
            setFilteredAircrafts(response.data.data);
            setNbAircraft(response.data.nbAircraft); 
            setSearchPlane('');
            setError(null); 
          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            setError("Une erreur s'est produite lors du chargement des données.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchAircrafts();
      }, [page],); 

      useEffect(() => {
        const filtered = aircrafts.filter((plane) => {
            if (searchPlane.trim() === '') {
                return true; 
            }
            return plane.model.toLowerCase().includes(searchPlane.toLowerCase());
        });
    
        setFilteredAircrafts(filtered);
    }, [searchPlane, aircrafts])
      
        
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;


    const handleNextPage = () => {
        if (catalogRef.current) {
          const { offsetTop } = catalogRef.current;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        } 
        if(page < (Math.floor(nbAircraft/5)+1)){
          setPage((prevPage) => prevPage + 1);
        }
       
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(1, prevPage - 1));
        if (catalogRef.current) {
          const { offsetTop } = catalogRef.current;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    };


  // Gérer les filtres :

  const handleDeleteStateFilter = () => {
    if(stateRef.current){
      stateRef.current.value = "Aucun";
      stateRef.current.style = "display:none";
      setFilteredAircrafts(aircrafts);
    }
  } 

  const handlePriceFilter = () => {
    if(priceRef.current){
      priceRef.current.style = "display:initial";
      if(priceRef.current.value === "-1000000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.price <= 1000000));
      }
      else if(priceRef.current.value === "-10000000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.price <= 10000000))
      }
      else if(priceRef.current.value === "-50000000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.price <= 50000000))
      }
      else if(priceRef.current.value === "+50000000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.price > 50000000))
      }
      else{
        setFilteredAircrafts(aircrafts);
      }
    }
  } 

  const handleDeletePriceFilter = () => {
    if(priceRef.current){
      priceRef.current.value = "Aucun";
      priceRef.current.style = "display:none";
      setFilteredAircrafts(aircrafts);
    }
  } 

  const handleYearFilter = () => {
    if(yearRef.current){
      yearRef.current.style = "display:initial";
      if(yearRef.current.value === "2000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.year <= 2000));
      }
      else if(yearRef.current.value === "2010"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.year <= 2010 && aircraft.year > 2000))
      }
      else if(yearRef.current.value === "2020"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.year <= 2020 && aircraft.year > 2010))
      }
      else if(yearRef.current.value === "NEW"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.year > 2020))
      }
      else{
        setFilteredAircrafts(aircrafts);
      }
    }
  } 

  const handleDeleteYearFilter = () => {
    if(yearRef.current){
      yearRef.current.value = "Aucun";
      yearRef.current.style = "display:none";
      setFilteredAircrafts(aircrafts);
    }
  } 

  const handleCapacityFilter = () => {
    if(capacityRef.current){
      capacityRef.current.style = "display:initial";
      if(capacityRef.current.value === "0"){
        setFilteredAircrafts((aircrafts.filter((aircraft) => aircraft.capacity < 5 && aircraft.capacity >= 0)));
      }
      else if(capacityRef.current.value === "5"){
        setFilteredAircrafts((aircrafts.filter((aircraft) => aircraft.capacity < 10 && aircraft.capacity >= 5)));
      }
      else if(capacityRef.current.value === "10"){
        setFilteredAircrafts((aircrafts.filter((aircraft) => aircraft.capacity < 15 && aircraft.capacity >= 10)));
      }
      else if(capacityRef.current.value === "15"){
        setFilteredAircrafts((aircrafts.filter((aircraft) => aircraft.capacity >= 15)));
      }
      else{
        setFilteredAircrafts(aircrafts);
      }
    }
  } 

  const handleDeleteCapacityFilter = () => {
    if(capacityRef.current){
      capacityRef.current.value = "Aucun";
      capacityRef.current.style = "display:none";
      setFilteredAircrafts(aircrafts)
    }
  } 


  const handleAutonomyFilter = () => {
    if(autonomyRef.current){
      autonomyRef.current.style = "display:initial";
      if(autonomyRef.current.value === "-100"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.autonomy <= 100))
      }
      else if(autonomyRef.current.value === "-500"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.autonomy <= 500 && aircraft.autonomy > 100))
      }
      else if(autonomyRef.current.value === "-1000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.autonomy <= 1000 && aircraft.autonomy > 500))
      }
      else if(autonomyRef.current.value === "+1000"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.autonomy > 1000))
      }
      else{
        setFilteredAircrafts(aircrafts);
      }
    }
  } 

  const handleDeleteAutonomyFilter = () => {
    if(autonomyRef.current){
      autonomyRef.current.value = "Aucun";
      autonomyRef.current.style = "display:none";
      setFilteredAircrafts(aircrafts)
    }
  } 

  const handleTypeFilter = () => {
    if(typeRef.current){
      typeRef.current.style = "display:initial";
      if(typeRef.current.value === "Local"){
        console.log(aircrafts.filter((aircraft) => aircraft.aircraftType === "Local"));
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.aircraftType === "Local"));
      }
      else if(typeRef.current.value === "National"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.aircraftType === "National"));
      }
      else if(typeRef.current.value === "International"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.aircraftType === "International"));
      }
      else{
        setFilteredAircrafts(aircrafts);
      }
    }
  } 

  const handleDeleteTypeFilter = () => {
    if(typeRef.current){
      typeRef.current.style = "display:none";
      typeRef.current.value = "Aucun";
      setFilteredAircrafts(aircrafts)
    }
  }

  const handleFiltrageState = () => {
    if(stateRef.current){
      stateRef.current.style = "display:initial";
      if(stateRef.current.value === "Disponible"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.isAvailable === 1));
      }
      else if(stateRef.current.value === "Indisponible"){
        setFilteredAircrafts(aircrafts.filter((aircraft) => aircraft.isAvailable === 0));
      }
      else{
        setFilteredAircrafts(aircrafts);
      }
    }
  }

  // Partie recherche

  
  const handleSearch = (e) => {
    setSearchPlane(e.target.value.toString()); 
    setPage(1);
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
            <input placeholder='Rechercher un Modèle ...' type="text" ref={catalogRef} onChange={handleSearch} />
        </div>
        <div className='catalogContent-container' >
          {!isMobile &&
            <div className='filterDescription'>
                <div className='filterDescription-title'><CiFilter size={30} color='#b5b5b5'/><h3>Liste des Filtres</h3></div>
                <ul className='editFilterList'>
                  <div className='editFilter-container'>
                    <li>Etat :</li>
                    <div>
                      <select name="stateSelect" ref={stateRef} onChange={handleFiltrageState}>
                        <option value="Aucun">Aucun</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Indisponible">Indisponible</option>
                      </select>
                    <button className='editFilterButton' onClick={handleFiltrageState}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteStateFilter}><AiOutlineCloseSquare size={20} /></button></div>
                  </div>
                  <div className='editFilter-container'>
                    <li>Prix :</li>
                    <div>
                      <select name="select" ref={priceRef} onChange={handlePriceFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="-1000000">- de 1 000 000</option>
                        <option value="-10000000">- de 10 000 000</option>
                        <option value="-50000000">- de 50 000 000</option>
                        <option value="+50000000">+ de 50 000 000</option>
                      </select>
                      <button className='editFilterButton' onClick={handlePriceFilter}><FaEdit size={20} /></button><button className='editFilterButton' onClick={handleDeletePriceFilter}><AiOutlineCloseSquare size={20} /></button></div>
                    </div>
                  <div className='editFilter-container'>
                    <li>Année :</li> 
                    <div>
                      <select name="select" ref={yearRef} onChange={handleYearFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="2000">2000</option>
                        <option value="2010">2010</option>
                        <option value="2020" >2020</option>
                        <option value="NEW">NEW</option>
                      </select>
                      <button className='editFilterButton' onClick={handleYearFilter}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteYearFilter}><AiOutlineCloseSquare size={20} /></button></div>
                      </div>
                  <div className='editFilter-container'>
                    <li>Capacité :</li> 
                    <div>
                      <select name="select" ref={capacityRef} onChange={handleCapacityFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="0">+ de 0</option>
                        <option value="5">+ de 5</option>
                        <option value="10">+ de 10</option>
                        <option value="15" >+ de 15</option>
                      </select>
                      <button className='editFilterButton' onClick={handleCapacityFilter}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteCapacityFilter}><AiOutlineCloseSquare size={20} /></button></div>
                      </div>
                  <div className='editFilter-container'>
                    <li>Autonomie :</li>
                    <div>
                      <select name="select" ref={autonomyRef} onChange={handleAutonomyFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="-100">- de 100km</option>
                        <option value="-500">- de 500km</option>
                        <option value="-1000">- de 1000km</option>
                        <option value="+1000">+ de 1000km</option>
                      </select>
                      <button className='editFilterButton' onClick={handleAutonomyFilter}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteAutonomyFilter}><AiOutlineCloseSquare size={20} /></button></div>
                    </div>
                  <div className='editFilter-container'>
                    <li>Type :</li>
                    <div>
                      <select name="select" ref={typeRef} onChange={handleTypeFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="Local">Local</option>
                        <option value="National">National</option>
                        <option value="International">International</option>
                      </select>
                      <button className='editFilterButton' onClick={handleTypeFilter}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteTypeFilter}><AiOutlineCloseSquare size={20} /></button></div>
                    </div>
                </ul>
            </div>} 
            
            
            <div className="separator"></div>
            <div className='planeContainer'>
            {Array.isArray(aircrafts) && aircrafts.length > 0 ? (
              filteredAircrafts
                .map((plane) => (
                <ProductBox
                    key={plane.idAircraft}
                    isAvailable={plane.isAvailable}
                    planeImg={gulfstreamG650ER}
                    modelName={plane.model}
                    serialNumber={plane.serialNumber}
                    price={`USD $ ${plane.price}`}
                    year={plane.year}
                    hour={plane.hours}
                    capacity={plane.capacity}
                    autonomy={plane.autonomy}
                    description={plane.description}
                    aircraftType={plane.aircraftType}
                />
                ))
            ) : (
                <p>Aucun avion trouvé.</p>
            )}
                            
              <div className='chooseCatalogPage'><button><IoIosArrowBack color='#B5B5B5' size={35} onClick={handlePreviousPage}/></button><p>{page}/{Math.floor(nbAircraft/5)+1}</p><button><IoIosArrowForward color='#B5B5B5' size={35} onClick={handleNextPage}/></button></div>
            </div>  
        </div>
    </main>
  )
}

export default CatalogPage;