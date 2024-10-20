import React from 'react'
import {ProductDescription} from './ProductDescription'
import ProductImage from './ProductImage'
import gulfstreamImage from '../styles/assets/img/catalog/gulfstreamG650.svg';

export const ProductBox = () => {
  return (
    <div className='productBox-container'>
      <ProductImage isAvailable="true" planeImg={gulfstreamImage} modelName="GOLFSTREAM G650ER" serialNumber="SN 54267" price="USD $ 35 000 000" />
      <ProductDescription year={2019} hour={3825} capacity={19} autonomy={13890} description="Le Gulfstream G650ER est un jet privé de luxe reconnu pour son autonomie remarquable et ses performances exceptionnelles. Capable de parcourir de longues distances à grande vitesse, il offre un intérieur spacieux et raffiné, conçu pour maximiser le confort des passagers. Ce jet allie élégance, technologie de pointe et efficacité, idéal pour les voyageurs exigeants recherchant une expérience de vol premium." />
    </div>
  )
}

