import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { ProductBox } from '../component/ProductBox';
import gulfstreamG650ER from '../styles/assets/img/catalog/gulfstreamG650.svg'
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';


function CatalogPage() {

    const  numbers = [1,2,3,4,5];
    const isMobile = useMediaQuery({ maxWidth: 550 });

    return (
    <main className='main-container'> 
        <div className="title-container">
            <h1 className='title white'>Notre Catalogue</h1>
            <p className='catalog-subtitle  white'>Explorez notre catalogue d'avions haut de gamme, alliant performance et luxe. Trouvez l'appareil parfait pour vos besoins.</p> 
        </div>
        
        <div className="filterBar-container">
            <button><CiSearch className='filterIcon' size={40} color='#b5b5b5'/></button>
            <button><CiFilter className='filterIcon' size={40} color='#b5b5b5'/></button>
            <input placeholder='Rechercher un Modèle ...' type="text" />
        </div>
        <div className='catalogContent-container'>
          {!isMobile &&
            <div className='filterDescription'>
                <div className='filterDescription-title'><CiFilter size={30} color='#b5b5b5'/><h3>Liste des Filtres</h3></div>
                <ul className='editFilterList'>
                  <div className='editFilter-container'><li>Etat :</li><div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Prix :</li><div><button className='editFilterButton'><FaEdit size={20} /></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Catégorie :</li><div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Année :</li> <div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Capacité :</li> <div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                  <div className='editFilter-container'><li>Autonomie :</li> <div><button className='editFilterButton'><FaEdit size={20}/></button><button className='editFilterButton'><AiOutlineCloseSquare size={20} /></button></div></div>
                </ul>
            </div>} 
            
            
            <div className="separator"></div>
            <div className='planeContainer'>
              {numbers.map((number) =>
                  <ProductBox key={number}
                    isAvailable={true} planeImg={gulfstreamG650ER} modelName={"GULFSTREAM G650ER"} serialNumber={"SN 54267"} price={"USD $ 35 000 000"}
                    year={2019} hour={3825} capacity={19} autonomy={13890} description={"Le Gulfstream G650ER est un jet privé de luxe reconnu pour son autonomie remarquable et ses performances exceptionnelles. Capable de parcourir de longues distances à grande vitesse, il offre un intérieur spacieux et raffiné, conçu pour maximiser le confort des passagers. Ce jet allie élégance, technologie de pointe et efficacité, idéal pour les voyageurs exigeants recherchant une expérience de vol premium."} />
                  )} 
                
              <div className='chooseCatalogPage'><button><IoIosArrowBack color='#B5B5B5' size={35}/></button><p>1/12</p><button><IoIosArrowForward color='#B5B5B5' size={35}/></button></div>
            </div>  
        </div>
    </main>
  )
}



export default CatalogPage;