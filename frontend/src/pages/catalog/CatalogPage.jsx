import React, { useRef, useCallback} from 'react'
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { ProductBox } from '../../components/catalog/ProductBox';
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useState } from 'react';
import "../../styles/catalog/CatalogPage.css"
import { getCatalogData } from '../../services/api';
import { useLocation } from 'react-router-dom';

function CatalogPage() {
  const gulfstreamG650ER = "../assets/catalog/gulfstreamG650.svg"
  const location = useLocation().pathname.split("/");
  let pathtype = location[2] || '';
  const [aircrafts, setAircrafts] = useState([]);
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 1130 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const catalogRef = useRef(null);
  const [searchPlane, setSearchPlane] = useState("");    

// déclaration des références pour les filtres
  const hasFiltered = useRef(false);
  const filterContainerRef = useRef(null)
  const stateRef = useRef(null);
  const priceRef = useRef(null);
  const yearRef = useRef(null);
  const autonomyRef = useRef(null);
  const capacityRef = useRef(null);
  const typeRef = useRef(null);
  const buttonRef = useRef(null);

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
    type: "Aucun" 
  });

  const totalPages = Math.ceil(filteredAircrafts.length / itemsPerPage);

  useEffect(() => {
    if (!isMobile && filterContainerRef.current) {
      filterContainerRef.current.classList.toggle("invisible");
    }
    else if(isMobile && filterContainerRef.current){
      filterContainerRef.current.classList.toggle("invisible");
    }
  }, [isMobile]);

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
  }, [page]);



  useEffect(() => {
    const filtered = aircrafts.filter((plane) => {
        if (searchPlane.trim() === '') {
            return true; 
        }
        return plane.model_name.toLowerCase().includes(searchPlane.toLowerCase());
    });

    setFilteredAircrafts(filtered);
}, [searchPlane, aircrafts])
      


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
        filterContainerRef.current.classList.toggle("invisible");
      }
      else{
        filterContainerRef.current.classList.toggle("invisible");
      }
    }
  };

  const reapplyFilters = useCallback((filters = activeFilters) => {
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
        filtered = filtered.filter((aircraft) => aircraft.estimated_price <= 1000000);
      } else if (filters.price === "-10000000") {
        filtered = filtered.filter((aircraft) => aircraft.estimated_price <= 10000000);
      } else if (filters.price === "-50000000") {
        filtered = filtered.filter((aircraft) => aircraft.estimated_price <= 50000000);
      } else if (filters.price === "+50000000") {
        filtered = filtered.filter((aircraft) => aircraft.estimated_price > 50000000);
      }
    }
  
    if (yearRef.current && yearRef.current.value !== "Aucun") {
      if (yearRef.current.value === "2000") {
        filtered = filtered.filter((aircraft) => aircraft.manufacture_year <= 2000);
      } else if (yearRef.current.value === "2010") {
        filtered = filtered.filter(
          (aircraft) => aircraft.manufacture_year <= 2010 && aircraft.manufacture_year > 2000
        );
      } else if (yearRef.current.value === "2020") {
        filtered = filtered.filter(
          (aircraft) => aircraft.manufacture_year <= 2020 && aircraft.manufacture_year > 2010
        );
      } else if (yearRef.current.value === "NEW") {
        filtered = filtered.filter((aircraft) => aircraft.manufacture_year > 2020);
      }
    }
  
    if (capacityRef.current && capacityRef.current.value !== "Aucun") {
      if (capacityRef.current.value === "0") {
        filtered = filtered.filter(
          (aircraft) => aircraft.passenger_capacity < 5 && aircraft.passenger_capacity >= 0
        );
      } else if (capacityRef.current.value === "5") {
        filtered = filtered.filter(
          (aircraft) => aircraft.passenger_capacity < 10 && aircraft.passenger_capacity >= 5
        );
      } else if (capacityRef.current.value === "10") {
        filtered = filtered.filter(
          (aircraft) => aircraft.passenger_capacity < 15 && aircraft.passenger_capacity >= 10
        );
      } else if (capacityRef.current.value === "15") {
        filtered = filtered.filter((aircraft) => aircraft.passenger_capacity >= 15);
      }
    }
  
    if (autonomyRef.current && autonomyRef.current.value !== "Aucun") {
      if (autonomyRef.current.value === "-100") {
        filtered = filtered.filter((aircraft) => aircraft.max_range <= 100);
      } else if (autonomyRef.current.value === "-500") {
        filtered = filtered.filter(
          (aircraft) => aircraft.max_range <= 500 && aircraft.max_range + aircraft.max_range > 100
        );
      } else if (autonomyRef.current.value === "-1000") {
        filtered = filtered.filter(
          (aircraft) => aircraft.max_range <= 1000 && aircraft.max_range  > 500
        );
      } else if (autonomyRef.current.value === "+1000") {
        filtered = filtered.filter((aircraft) => aircraft.max_range > 1000);
      }
    }
  
    if (typeRef.current && typeRef.current.value !== "Aucun") {
      filtered = filtered.filter(
        (aircraft) => aircraft.range_type.toLowerCase() === typeRef.current.value
      );
    }
    setFilteredAircrafts(filtered); 
    
  }, [activeFilters, aircrafts]);

  useEffect(() => {
    if (filteredAircrafts.length > 0 && (currentPage - 1) * itemsPerPage >= filteredAircrafts.length) {
      setCurrentPage(Math.max(1, Math.ceil(filteredAircrafts.length / itemsPerPage)));
    }
  }, [filteredAircrafts.length, itemsPerPage,currentPage]); 

  const handleDeleteStateFilter = () => {
    stateRef.current.classList.add("invisible");
    if(stateRef.current){
      stateRef.current.value = "Aucun";
      
      setActiveFilters((prev) => ({ ...prev, state: "Aucun" }))
      reapplyFilters();
    }
  }

  const handlePriceFilter = () => {
    priceRef.current.classList.remove("invisible");
    if(priceRef.current){
      const newPrice = priceRef.current.value;
      setActiveFilters((prev) => ({ ...prev, price: newPrice }));
      reapplyFilters({ ...activeFilters, price: newPrice });
    }
  } 

  const handleDeletePriceFilter = () => {
    priceRef.current.classList.add("invisible");
    if(priceRef.current){
      setActiveFilters((prev) => ({ ...prev, price: "Aucun" }))
      priceRef.current.value = "Aucun";
      
      setActiveFilters((prev) => {
        const updatedFilters = { ...prev, price: "Aucun" };
        reapplyFilters(updatedFilters); 
        return updatedFilters;
    });
    }
  } 

  const handleYearFilter = () => {
    yearRef.current.classList.remove("invisible")
    if(yearRef.current){
      reapplyFilters();
    }
  } 

  const handleDeleteYearFilter = () => {
    yearRef.current.classList.add("invisible");
    if(yearRef.current){
      yearRef.current.value = "Aucun";
      setActiveFilters((prev) => ({ ...prev, year: "Aucun" }))
      reapplyFilters();
    }
  } 

  const handleCapacityFilter = () => {
    capacityRef.current.classList.remove("invisible");
    if(capacityRef.current){
      reapplyFilters();
    }
  } 

  const handleDeleteCapacityFilter = () => {
    capacityRef.current.classList.add("invisible");
    if(capacityRef.current){
      capacityRef.current.value = "Aucun";
      setActiveFilters((prev) => ({ ...prev, capacity: "Aucun" }))
      reapplyFilters();
    }
  } 


  const handleAutonomyFilter = () => {
    autonomyRef.current.classList.remove("invisible");
    if(autonomyRef.current){
      reapplyFilters();
    }
  } 

  const handleDeleteAutonomyFilter = () => {
    autonomyRef.current.classList.add("invisible");
    if(autonomyRef.current){
      autonomyRef.current.value = "Aucun";
      setActiveFilters((prev) => ({ ...prev, autonomy: "Aucun" }))
      reapplyFilters();
    }
  } 

  const handleTypeFilter = () => {
    // Assure que le select est visible
    if (typeRef.current) {
      reapplyFilters(activeFilters); // Applique les filtres actuels
      typeRef.current.classList.remove("invisible");
    }
  };
  
  useEffect(() => {
    if (typeRef.current && pathtype !== "") {
      if (!hasFiltered.current) {
        typeRef.current.value = pathtype;  
        hasFiltered.current = true; 
      }
      reapplyFilters(activeFilters); 
      typeRef.current.classList.remove("invisible");
    }
  }, [pathtype, aircrafts, reapplyFilters, activeFilters]);


    
  const handleDeleteTypeFilter = () => {
    typeRef.current.classList.add("invisible");
    if(typeRef.current){
      typeRef.current.value = "Aucun";
      setActiveFilters((prev) => ({ ...prev, type: "Aucun" }))
      reapplyFilters(activeFilters)
      
    } 
    
  }
  
  const handleFiltrageState = () => {
    stateRef.current.classList.remove("invisible");
    if(stateRef.current){
      reapplyFilters(activeFilters);
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
  
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;


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
                      <select className='invisible' name="stateSelect" ref={stateRef} onChange={handleFiltrageState}>
                        <option value="Aucun">Aucun</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Indisponible">Indisponible</option>
                      </select>
                    <button className='editFilterButton' onClick={handleFiltrageState}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteStateFilter}><AiOutlineCloseSquare size={20} /></button></div>
                  </div>
                  <div className='editFilter-container'>
                    <li>Prix :</li>
                    <div>
                      <select className='invisible' name="select" ref={priceRef} onChange={handlePriceFilter}>
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
                      <select className='invisible' name="select" ref={yearRef} onChange={handleYearFilter}>
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
                      <select className='invisible' name="select" ref={capacityRef} onChange={handleCapacityFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="0">0</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15" >+ de 15</option>
                      </select>
                      <button className='editFilterButton' onClick={handleCapacityFilter}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteCapacityFilter}><AiOutlineCloseSquare size={20} /></button></div>
                      </div>
                  <div className='editFilter-container'>
                    <li>Autonomie :</li>
                    <div>
                      <select className='invisible' name="select" ref={autonomyRef} onChange={handleAutonomyFilter}>
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
                      <select className='invisible' name="select" ref={typeRef} onChange={handleTypeFilter}>
                        <option value="Aucun">Aucun</option>
                        <option value="local">Local</option>
                        <option value="regional">Regional</option>
                        <option value="international">International</option>
                      </select>
                      <button ref={buttonRef} className='editFilterButton' onClick={handleTypeFilter}><FaEdit size={20}/></button><button className='editFilterButton' onClick={handleDeleteTypeFilter}><AiOutlineCloseSquare size={20} /></button></div>
                    </div>
                </ul>
            </div>{/*}*/}
            
            
            <div className="catalog-separator"></div>
            <div className='planeContainer'>
            {Array.isArray(aircrafts) && aircrafts.length > 0 ? (
              paginatedAircrafts
                .map((plane) => (
                <ProductBox
                    key={plane.aircraft_id}
                    isAvailable={plane.isAvailable}
                    planeImg={gulfstreamG650ER}
                    modelName={plane.model_name.toUpperCase()}
                    serialNumber={plane.serial_number}
                    price={`USD $ ${plane.estimated_price}`}
                    year={plane.manufacture_year}
                    hour={plane.flight_hours}
                    capacity={plane.passenger_capacity}
                    autonomy={plane.max_range}
                    description={plane.description}
                    aircraftType={plane.range_type}
                    idAircraft={plane.aircraft_id}
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