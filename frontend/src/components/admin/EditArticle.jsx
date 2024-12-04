import "../../styles/admin/EditArticle.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { getCatalogData } from "../../services/api";
import { ProductBox } from "../ProductBox";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function EditArticle() {

    const gulfstreamG650ER = "../assets/catalog/gulfstreamG650.svg"

    const [aircrafts, setAircrafts] = useState([]);
    const [page, setPage] = useState(1);
    const [nbAircraft, setNbAircraft] = useState(0);
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  let [filteredAircrafts, setFilteredAircrafts] = useState([]);

    useEffect(() => {
        const fetchAircrafts = async () => {
          try {
            setLoading(true);
            const response = await getCatalogData();
            const data = response.data || []; 
            setAircrafts(data);
            setFilteredAircrafts(data);
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

      const paginatedAircrafts = (filteredAircrafts|| []).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
        setPage((prevPage) => Math.max(1, prevPage - 1));
        if (catalogRef.current) {
          const { offsetTop } = catalogRef.current;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    };

    const totalPages = Math.ceil(filteredAircrafts.length / itemsPerPage);

    const handleNextPage = () => {
        if (catalogRef.current) {
          const { offsetTop } = catalogRef.current;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        } 
        if(page < (Math.floor(nbAircraft/5)+1)){
          setCurrentPage((prevPage) => prevPage + 1);
          setPage((prevPage) => prevPage + 1);

        }
       
    };
    
    return (
        <div className="edit-article">
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
                />
                ))
            ) : (
                <p>Aucun avion trouvé.</p>
            )}
                            
              <div className='chooseCatalogPage'>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                  <IoIosArrowBack color='#B5B5B5' size={35} />
                </button>
                <p>
                  {page} / {totalPages === 0 ? 1 : totalPages}
                </p>
                <button onClick={handleNextPage} disabled={page === Math.ceil(nbAircraft / 5)}>
                  <IoIosArrowForward color='#B5B5B5' size={35} />
                </button>
              </div>
        </div>
    )
}