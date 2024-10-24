import React from 'react'
import Template from '../components/Template';
import ProductShowcase from '../components/ProductShowcase';

function PageProduct() {
  const images = [
    '/assets/image1.jpg',
    '/assets/image2.jpg',
    '/assets/image3.jpg',
    '/assets/image.png'
  ];
  return (
    <Template>
      <ProductShowcase productName={"Gulfstream G650ER"} imagePath={images[3]}/>
      {/* <Slider images={images}/> */}
    </Template>
  )
}

export default PageProduct;
