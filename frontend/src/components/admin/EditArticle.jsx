import "../../styles/admin/EditArticle.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { getCatalogData } from "../../services/api";
import { ProductBox } from "../catalog/ProductBox";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function EditArticle(props) {
  const [aircrafts, setAircrafts] = useState([]);
  const [page, setPage] = useState(1);
  const catalogRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  let [filteredAircrafts, setFilteredAircrafts] = useState([]);

  const [pageProduct, setPageProduct] = useState(null);

  const setCurrentPageProduct = (element) => {
    setPageProduct(element)
  }

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

  const paginatedAircrafts = (filteredAircrafts || []).slice(
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
    <>
      {pageProduct ? (
        <div>{pageProduct}</div>
      ) : (
        <div className="edit-article">
          {paginatedAircrafts.length > 0 ? (
            paginatedAircrafts.map((plane) => (
              <ProductBox
                key={plane.aircraft_id}
                aircraftId={plane.aircraft_id}
                isAvailable={plane.isAvailable}
                planeImg={plane.img_URL}
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
                use={props.use}
                pageProduct = {setCurrentPageProduct}
              />
            ))
          ) : (
            <p>Aucun avion trouvé.</p>
          )}
  
          <div className="chooseCatalogPage">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <IoIosArrowBack color="#B5B5B5" size={35} />
            </button>
            <p>
              {currentPage} / {totalPages || 1}
            </p>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <IoIosArrowForward color="#B5B5B5" size={35} />
            </button>
          </div>
        </div>
      )}
    </>
  );
  
}
