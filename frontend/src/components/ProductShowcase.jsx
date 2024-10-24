import "../styles/ProductShowcase.css";
import ScrollDownButton from './ScrollDownButton';

const ProductShowcase = ({ imagePath, productName }) => {


  return (
    <div className='container'>
      <img className="showcase-image" src={imagePath} alt={productName + "-MainImage"} />
      <h2 className='product-name'>{productName}</h2>
      <div class="gradient-overlay"></div>
      <ScrollDownButton color='white'/>
    </div>
  );
}

export default ProductShowcase;
