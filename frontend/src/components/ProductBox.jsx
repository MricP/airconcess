import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";
import "../styles/catalog/ProductBox.css";
import { useNavigate } from 'react-router-dom';
import { IoTrashBin } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";


export const ProductBox = (props) => {
  const navigate = useNavigate();
  let use = null;
//   const history = useHistory();
  if (props.use === "delete"){
    use = <IoTrashBin size={30} color='red'/>
  } else if (props.use === "edit") {
    use = <CiEdit size={30} />
  }

  const handleButtonClick = () => {
    if (props.use === "edit"){
        navigate(`/admin/edit/${props.idAircraft}`)
    }
};

  return (
      <div className='productBox-container'>
        <div className='catalog-productImage-container'>
          <div className='available-container'>{props.isAvailable === 1 ? <FaRegCircleDot color='#43A73A'/> : <FaRegCircleDot color='#ea2424'/> }<p className='catalogAvailable'>{props.isAvailable === 0 ? "INDISPONIBLE" : "DISPONIBLE"}</p></div>
          <img src={props.planeImg}/>
          <div className='imageInfo-container'>
              <p>{props.modelName}</p>
              <p>{props.serialNumber}</p>
              <p className='catalogPrice'>{props.price}</p>
          </div>
        </div>  

        <div className='catalog-productDescription-container'>
            <div className="bin">
                <button onClick={handleButtonClick}>{use}</button>
            </div>
            <div className='planeInfos-container'>
                <div className='planeInfos'>
                    <p className='infoTitle'>Année</p>
                    <p>{props.year}</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Heures</p>
                    <p>{props.hour}</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Capacité</p>
                    <p>{props.capacity} pers</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Autonomie</p>
                    <p>{props.autonomy} km</p>
                </div>
                <div className='planeInfos'>
                    <p className='infoTitle'>Type</p>
                    <p>{props.aircraftType}</p>
                </div>
            </div>
            <p>{props.description}</p>
            <div className='LearnMorebButton'><p>EN SAVOIR PLUS</p><button onClick={() => navigate(`/product/${props.idAircraft}` )}><FaArrowRightLong size={20}/></button></div>
        </div>
      </div>
  )
}

