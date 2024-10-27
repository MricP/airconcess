import React from 'react'
import '../styles/ProductDescription.css'

const ProductDescription = ({modelDescription,deviceDescription}) => {
  return (
    <div className='productDescription-container'>
        <h2>SPÉCIFICATIONS</h2>
        <hr></hr>
        <div className='informations-div'>
            <div>
                <h3>À propos du modèle</h3>
                <div className='informationsList'>
                    {modelDescription.map((line) => (
                        <p key={line} >• {line}</p>
                    ))}
                </div>
            </div>
            <hr></hr>
            <div>
                <h3>À propos de l'appareil</h3>
                <div className='informationsList'>
                    {deviceDescription.map((line) => (
                        <p key={line} >• {line}</p>
                    ))}
                </div>
               
            </div>
        </div>
        <div className='button-div'>
            <button>Telecharger la fiche technique</button>
            <button>Prendre rendez-vous</button>
        </div>
    </div>
  )
}

export default ProductDescription