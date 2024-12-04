import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";
import "../styles/catalog/ProductBox.css";

export const ProductBox = (props) => {
    
  return (
      <div className='productBox-container'>
        <div className='catalog-productImage-container'>
          <div className='available-container'>{props.isAvailable === 1 ? <FaRegCircleDot color='#43A73A'/> : <FaRegCircleDot color='#ea2424'/> }<p className='catalogAvailable'>{props.isAvailable == 0 ? "INDISPONIBLE" : "DISPONIBLE"}</p></div>
          <img src={props.planeImg} alt="planeImg" />
          <div className='imageInfo-container'>
              <h2>{props.modelName}</h2>
              <h3>{props.serialNumber}</h3>
              <p className='catalogPrice'>{props.price}</p>
          </div>
        </div>  

        <div className='catalog-productDescription-container'>
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
            <div className='LearnMorebButton'><p>EN SAVOIR PLUS</p><button><FaArrowRightLong size={20}/></button></div>
        </div>
      </div>
  )
}

