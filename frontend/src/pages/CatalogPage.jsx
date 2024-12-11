import React, { useRef } from 'react'
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { ProductBox } from '../components/ProductBox';
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useState } from 'react';
import "../styles/catalog/CatalogPage.css"
import { getCatalogData } from '../services/api';

function CatalogPage() {
    const gulfstreamG650ER = "../assets/catalog/gulfstreamG650.svg"

    const [aircrafts, setAircrafts] = useState([]);
    const [page, setPage] = useState(1);
    const isMobile = useMediaQuery({ maxWidth: 1130 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const catalogRef = useRef(null);
    const [searchPlane, setSearchPlane] = useState("");
    // const [isPopupVisible, setIsPopupVisible] = useState(false);
    

// déclaration des références pour les filtres
  const filterContainerRef = useRef(null)
  const stateRef = useRef(null);
  const priceRef = useRef(null);
  const yearRef = useRef(null);
  const autonomyRef = useRef(null);
  const capacityRef = useRef(null);
  const typeRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  let nbAppuie = 0;
  let [filteredAircrafts, setFilteredAircrafts] = useState([]);

  const [activeFilters, setActiveFilters] = useState({
    state: "Aucun",
    price: "Aucun",
    year: "Aucun",
    capacity: "Aucun",
    autonomy: "Aucun",
    type: "Aucun",
  });

  const totalPages = Math.ceil(filteredAircrafts.length / itemsPerPage);

  useEffect(() => {
    const fetchAircrafts = async () => {
      try {
        setLoading(true);
        const response = await getCatalogData();
        const data = response.data || []; 
        setAircrafts(data);
        setFilteredAircrafts(data);
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

    // Gestion des pages
    const handleNextPage = () => {
        if (catalogRef.current) {
          const { offsetTop } = catalogRef.current;
          window.scrollTo({ top: offsetTop - 100, behavior: "smooth" });
        } 
        if(currentPage < totalPages){
          setCurrentPage((prevPage) => prevPage + 1);
          reapplyFilters(activeFilters)
        }
        
    };

    const handlePreviousPage = () => {
        if (catalogRef.current) {
          const { offsetTop } = catalogRef.current;
          window.scrollTo({ top: offsetTop-100, behavior: "smooth" });
        }
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
        reapplyFilters(activeFilters)
        
    };

  // Gérer les filtres :

  const handleFilterRedirection = () => {
    if (!isMobile) {
      const { offsetTop } = catalogRef.current;
      window.scrollTo({ top: offsetTop - 100, behavior: "smooth" });
    } else {
      nbAppuie++;
      if(nbAppuie%2 === 1){
        filterContainerRef.current.style = "display: flex;position: absolute;z-index: 1;width: 80%;top: 90%;left:0%;right: 15%;align-item: center;box-shadow: 2px 3px 3px var(--section-color);";
      }
      else{
        filterContainerRef.current.style = "display: none;";
      }
      

    }
  };
  
  

  const reapplyFilters = (filters = activeFilters) => {
    let filtered = [...aircrafts]; 
    
    if (stateRef.current && stateRef.current.value !== "Aucun") {
      filtered = filtered.filter((aircraft) =>
        stateRef.current.value === "Disponible"
          ? aircraft.isAvailable === 1
          : aircraft.isAvailable === 0
      );
    }
  
    if (filters.price !== "Aucun") {
      if (filters.price === "-1000000") {
        filtered = filtered.filter((aircraft) => aircraft.price <= 1000000);
      } else if (filters.price === "-10000000") {
        filtered = filtered.filter((aircraft) => aircraft.price <= 10000000);
      } else if (filters.price === "-50000000") {
        filtered = filtered.filter((aircraft) => aircraft.price <= 50000000);
      } else if (filters.price === "+50000000") {
        filtered = filtered.filter((aircraft) => aircraft.price > 50000000);
      }
    }
  
    if (yearRef.current && yearRef.current.value !== "Aucun") {
      if (yearRef.current.value === "2000") {
        filtered = filtered.filter((aircraft) => aircraft.year <= 2000);
      } else if (yearRef.current.value === "2010") {
        filtered = filtered.filter(
          (aircraft) => aircraft.year <= 2010 && aircraft.year > 2000
        );
      } else if (yearRef.current.value === "2020") {
        filtered = filtered.filter(
          (aircraft) => aircraft.year <= 2020 && aircraft.year > 2010
        );
      } else if (yearRef.current.value === "NEW") {
        filtered = filtered.filter((aircraft) => aircraft.year > 2020);
      }
    }
  
    if (capacityRef.current && capacityRef.current.value !== "Aucun") {
      if (capacityRef.current.value === "0") {
        filtered = filtered.filter(
          (aircraft) => aircraft.capacity < 5 && aircraft.capacity >= 0
        );
      } else if (capacityRef.current.value === "5") {
        filtered = filtered.filter(
          (aircraft) => aircraft.capacity < 10 && aircraft.capacity >= 5
        );
      } else if (capacityRef.current.value === "10") {
        filtered = filtered.filter(
          (aircraft) => aircraft.capacity < 15 && aircraft.capacity >= 10
        );
      } else if (capacityRef.current.value === "15") {
        filtered = filtered.filter((aircraft) => aircraft.capacity >= 15);
      }
    }
  
    if (autonomyRef.current && autonomyRef.current.value !== "Aucun") {
      if (autonomyRef.current.value === "-100") {
        filtered = filtered.filter((aircraft) => aircraft.autonomy <= 100);
      } else if (autonomyRef.current.value === "-500") {
        filtered = filtered.filter(
          (aircraft) => aircraft.autonomy <= 500 && aircraft.autonomy > 100
        );
      } else if (autonomyRef.current.value === "-1000") {
        filtered = filtered.filter(
          (aircraft) => aircraft.autonomy <= 1000 && aircraft.autonomy > 500
        );
      } else if (autonomyRef.current.value === "+1000") {
        filtered = filtered.filter((aircraft) => aircraft.autonomy > 1000);
      }
    }
  
    if (typeRef.current && typeRef.current.value !== "Aucun") {
      filtered = filtered.filter(
        (aircraft) => aircraft.aircraftType === typeRef.current.value
      );
    }
    if ((currentPage - 1) * itemsPerPage >= filteredAircrafts.length) {
      setCurrentPage(Math.max(1, Math.ceil(filteredAircrafts.length / itemsPerPage)));
    }

    setFilteredAircrafts(filtered); 
    
  };
  
  const handleDeleteStateFilter = () => {
    if(stateRef.current){
      stateRef.current.value = "Aucun";
      stateRef.current.style = "display:none";
      setActiveFilters((prev) => ({ ...prev, state: "Aucun" }))
      reapplyFilters();
      
    }
  } 

  const handlePriceFilter = () => {
    if(priceRef.current){
      const newPrice = priceRef.current.value;
      setActiveFilters((prev) => ({ ...prev, price: newPrice }));
      priceRef.current.style = "display:initial";
      reapplyFilters({ ...activeFilters, price: newPrice });
    }
  } 

  const handleDeletePriceFilter = () => {
    if(priceRef.current){
      setActiveFilters((prev) => ({ ...prev, price: "Aucun" }))
      
      priceRef.current.value = "Aucun";
      priceRef.current.style = "display:none";
      setActiveFilters((prev) => {
        const updatedFilters = { ...prev, price: "Aucun" };
        reapplyFilters(updatedFilters); // Reapply avec l'état à jour
        return updatedFilters;
    });
    }
  } 

  const handleYearFilter = () => {
    if(yearRef.current){
      yearRef.current.style = "display:initial";
      reapplyFilters();
    }
  } 

  const handleDeleteYearFilter = () => {
    if(yearRef.current){
      yearRef.current.value = "Aucun";
      setActiveFilters((prev) => ({ ...prev, year: "Aucun" }))
      yearRef.current.style = "display:none";
      reapplyFilters();
    }
  } 

  const handleCapacityFilter = () => {
    if(capacityRef.current){
      capacityRef.current.style = "display:initial";
      reapplyFilters();
    }
  } 

  const handleDeleteCapacityFilter = () => {
    if(capacityRef.current){
      capacityRef.current.value = "Aucun";
      capacityRef.current.style = "display:none";
      setActiveFilters((prev) => ({ ...prev, capacity: "Aucun" }))
      reapplyFilters();
    }
  } 


  const handleAutonomyFilter = () => {
    if(autonomyRef.current){
      autonomyRef.current.style = "display:initial";
      reapplyFilters();
    }
  } 

  const handleDeleteAutonomyFilter = () => {
    if(autonomyRef.current){
      autonomyRef.current.value = "Aucun";
      autonomyRef.current.style = "display:none";
      setActiveFilters((prev) => ({ ...prev, autonomy: "Aucun" }))
      reapplyFilters();
    }
  } 

  const handleTypeFilter = () => {
    if(typeRef.current){
      typeRef.current.style = "display:initial";
      reapplyFilters();
    }
    window.history.pushState(null, "AirConcess", `/catalog/${typeRef.current.value.toLowerCase()}`)
  } 

  const handleDeleteTypeFilter = () => {
    if(typeRef.current){
      
      setActiveFilters((prev) => ({ ...prev, type: "Aucun" }))
      reapplyFilters(activeFilters)
      typeRef.current.style = "display:none";
      typeRef.current.value = "Aucun";
      
     
    } 
    
  }

  const handleFiltrageState = () => {
    if(stateRef.current){
      stateRef.current.style = "display:initial";
      reapplyFilters();
    }
  }

  // Partie recherche

  const handleSearch = (e) => {
    setSearchPlane(e.target.value.toString()); 
    setPage(1);
    setCurrentPage(1);
    reapplyFilters();
  };

  // Pagination
  const paginatedAircrafts = (filteredAircrafts|| []).slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );
  
    return (
    <main className='catalog-page'> 
        <div className="catalog-header">
            <div className="catalog-title-container">
                <h1 className="catalog-title white">Notre Catalogue</h1>
                <p className="catalog-subtitle white">
                    Explorez notre catalogue d'avions haut de gamme, alliant performance et luxe. Trouvez l'appareil parfait pour vos besoins.
                </p>
            </div>
            <div className="filterBar-container">
                <button disabled><CiSearch className='filterIcon' size={40} color='#b5b5b5'/></button>
                <button onClick={handleFilterRedirection}><CiFilter className='filterIcon' size={40} color='#b5b5b5'/></button>
                <input placeholder='Rechercher un Modèle ...' type="text" onChange={handleSearch} />
            </div>
        </div>
        
        
        <div className='catalogContent-container' ref={catalogRef}>
          {/* {!isMobile && */}
            <div className='filterDescription' ref={filterContainerRef}>
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
            </div>{/*}*/}
            
            
            <div className="catalog-separator"></div>
            <div className='planeContainer'>
            {Array.isArray(aircrafts) && aircrafts.length > 0 ? (
              paginatedAircrafts
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
                    idAircraft={plane.idAircraft}
                />
                ))
            ) : (
                <p>Aucun avion trouvé.</p>
            )}
                            
              <div className='chooseCatalogPage'>
                <button onClick={handlePreviousPage} >
                  <IoIosArrowBack color='#B5B5B5' size={35} />
                </button>
                <p>
                  {currentPage} / {totalPages === 0 ? 1 : totalPages}
                </p>
                <button onClick={handleNextPage}>
                  <IoIosArrowForward color='#B5B5B5' size={35} />
                </button>
              </div>
            </div>  
        </div>
    </main>
  )
}

export default CatalogPage;