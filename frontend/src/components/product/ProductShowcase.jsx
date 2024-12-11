import "../../styles/product/ProductShowcase.css";
import ScrollDownButton from '../general/ScrollDownButton';

const ProductShowcase = ({ imagePath, modelName }) => {
  return (
    <div className='productShowcase-container'>
      <div className="gradient-overlay"></div>
      <img className="showcase-image" src={imagePath} alt={modelName + "-MainImage"} />
      <h2 className='product-name'>{modelName}</h2>
      <ScrollDownButton scrollLength={window.innerHeight+0.04*(window.innerHeight)} colorIcon='white'/>
    </div>
  );
}

export default ProductShowcase;
