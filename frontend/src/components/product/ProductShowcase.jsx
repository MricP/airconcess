import "../../styles/product/ProductShowcase.css";
import ScrollDownButton from '../general/ScrollDownButton';

const ProductShowcase = ({ imagePath, productName }) => {
  return (
    <div className='productShowcase-container'>
      <img className="showcase-image" src={imagePath} alt={productName + "-MainImage"} />
      <h2 className='product-name'>{productName}</h2>
      <div class="gradient-overlay"></div>
      <ScrollDownButton scrollLength={window.innerHeight+0.25*(window.innerHeight)} colorIcon='white'/>
    </div>
  );
}

export default ProductShowcase;
