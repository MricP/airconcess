import React from 'react'
import MainCatalogImage from '../styles/assets/img/catalog/mainCatalogImage.jpg'

function CatalogPage() {
  return (
    <div className='main-container'>
        <img src={MainCatalogImage} className='mainCatalogImage' alt="main catalogue" /> 
        <div className="title-container">
            <h1 className='title superieur white'>Notre Catalogue</h1>
            <p className='catalog-subtitle superieur white'>Explorez notre catalogue d'avions haut de gamme, alliant performance et luxe. Trouvez l'appareil parfait pour vos besoins.</p>
        </div>
        
        <div className="filterBar-container superieur">
            <button>R</button><button>F</button><input placeholder='Rechercher un Modèle' type="text" />
        </div>
    </div>
  )
}

export default CatalogPage