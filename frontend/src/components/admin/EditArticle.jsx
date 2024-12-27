import "../../styles/admin/EditArticle.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { getCatalogData } from "../../services/api";
import { ProductBox } from "../ProductBox";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function EditArticle(props) {

    const gulfstreamG650ER = "../assets/catalog/gulfstreamG650.svg"

    const [aircrafts, setAircrafts] = useState([]);
    const [page, setPage] = useState(1);
    const catalogRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  let [filteredAircrafts, setFilteredAircrafts] = useState([]);

    useEffect(() => {
        const fetchAircrafts = async () => {
          try {
            const response = await getCatalogData();
            const data = response.data || []; 
            setAircrafts(data);
            setFilteredAircrafts(data);
          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
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
        setCurrentPage((prevPage) => prevPage + 1);
        setPage((prevPage) => prevPage + 1);
    };
    
    return (
        <div className="edit-article">
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
                    hour={`${plane.flight_hours.split(" ")[0]} ${plane.flight_hours.split(" ")[1]}`}
                    capacity={plane.passenger_capacity.split(" ")[1]}
                    autonomy={`${plane.max_range.split(" ")[0]} ${plane.max_range.split(" ")[1]}`}
                    description={plane.Description}
                    aircraftType={plane.range_type}
                    use = {props.use}
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
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  <IoIosArrowForward color='#B5B5B5' size={35} />
                </button>
              </div>
        </div>
    )
}