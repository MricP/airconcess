import "../../styles/product/ProductShowcase.css";
import ScrollDownButton from '../general/ScrollDownButton';
import { useState, useEffect } from "react";

const ProductShowcase = ({ imagePath, productName, mode }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [hasId, setHasId] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Met à jour l'image dans le state
      };
      reader.readAsDataURL(file)
      setHasId(false)
    } else {
      setSelectedImage(null);
      alert("Veuillez choisir une image valide.")
    }
  };

  if (mode === "add") {
    return (
      <div className="productShowcase-container" id={hasId ? "productShowcase-container-edit" : null}>
          {console.log(selectedImage)}
          {selectedImage ? (
            <img className="showcase-image" src={selectedImage} alt="Prévisualisation" />
          ) : (
            <div>
              <div className="showcase-image"></div>
            </div>
          )}
          <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="file-input">Charger une image</label>
          <input className="product-name input" type="text" defaultValue={"Nom du produit"} />
          <div className="gradient-overlay"></div>
          <ScrollDownButton
            scrollLength={window.innerHeight + 0.25 * window.innerHeight}
            colorIcon="white"
          />
      </div>
    );
  }

  return (
    <div className="productShowcase-container">
      <img className="showcase-image" src={imagePath} alt={productName + "-MainImage"} />
      <h2 className="product-name">{productName}</h2>
      <div className="gradient-overlay"></div>
      <ScrollDownButton
        scrollLength={window.innerHeight + 0.25 * window.innerHeight}
        colorIcon="white"
      />
    </div>
  );
};

export default ProductShowcase;
