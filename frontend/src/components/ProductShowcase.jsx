import "../styles/ProductShowcase.css";
import ScrollDownButton from './ScrollDownButton';

const ProductShowcase = ({ imagePath, productName }) => {
  function scrollDown() {
    window.scrollTo({
        top: window.innerHeight+0.25*(window.innerHeight),
        behavior: 'smooth',
    });
}

  return (
    <div className='productShowcase-container'>
      <img className="showcase-image" src={imagePath} alt={productName + "-MainImage"} />
      <h2 className='product-name'>{productName}</h2>
      <div class="gradient-overlay"></div>
      <ScrollDownButton onClickComportment={scrollDown} color='white'/>
    </div>
  );
}

export default ProductShowcase;
