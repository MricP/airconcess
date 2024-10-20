import React from 'react';

const ProductImage = (props) => {
  return (
    <div className='productImage-container'>
        <p className='catalogAvailable'>{props.isAvailable === "true" ? "Disponible" : "Indisponible"}</p>
        <img src={props.planeImg} alt="planeImg" />
        <div className='imageInfo-container'>
            <h2>{props.modelName}</h2>
            <h3>{props.serialNumber}</h3>
            <p className='catalogPrice'>{props.price}</p>
        </div>
        
    </div>
  );
}

export default ProductImage;