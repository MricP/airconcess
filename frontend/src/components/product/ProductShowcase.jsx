import "../../styles/product/ProductShowcase.css";
import ScrollDownButton from '../general/ScrollDownButton';

const ProductShowcase = ({ imagePath, productName, mode }) => {
  const pictureDefault = "assets/admin/insertPicture.png"

  if (mode === "add"){
    return (
      <div className='productShowcase-container'>
        <img className="showcase-image" src={pictureDefault} alt={productName + "-MainImage"} />
        <input type="file" className="file-input" accept="image/*"/>
        <input className="product-name input" type="text" placeholder="Insérer le nom "/>
        <div class="gradient-overlay"></div>
        <ScrollDownButton scrollLength={window.innerHeight+0.25*(window.innerHeight)} colorIcon='white'/>
      </div>
    )
  }

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
