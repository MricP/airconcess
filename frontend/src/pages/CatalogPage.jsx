import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

function CatalogPage() {
  return (
    <main className='main-container'> 
        <div className="title-container">
            <h1 className='title  white'>Notre Catalogue</h1>
            <p className='catalog-subtitle  white'>Explorez notre catalogue d'avions haut de gamme, alliant performance et luxe. Trouvez l'appareil parfait pour vos besoins.</p> 
        </div>
        
        <div className="filterBar-container">
            <button><CiSearch className='filterIcon' size={40} color='#b5b5b5'/></button>
            <button><CiFilter className='filterIcon' size={40} color='#b5b5b5'/></button>
            <input placeholder='Rechercher un Modèle ...' type="text" />
        </div>
    </main>
  )
}

export default CatalogPage