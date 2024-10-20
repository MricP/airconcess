import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

export const ProductDescription = (props) => {
  return (
    <div className='productDescription-container'>
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
        </div>
        <p>{props.description}</p>
        <div className='LearnMorebButton'><p>EN SAVOIR PLUS</p><button><FaArrowRightLong size={20}/></button></div>
    </div>
  )
}

export default ProductDescription;