import "../../styles/product/ProductShowcase.css";
import ScrollDownButton from '../general/ScrollDownButton';
import { useState } from "react";


const ProductShowcase = ({ imagePath, modelName, mode, model, onInputChange }) => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [hasId, setHasId] = useState(true)

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Met à jour l'image dans le state
      };
      reader.readAsDataURL(file)
      setHasId(false)

      if (onInputChange) {
        onInputChange("file", file)
      }

    } else {
      setSelectedImage(null);
      alert("Veuillez choisir une image valide.")
    }
  };

  const handleNameChange = (event) => {
    if (onInputChange) onInputChange("modelName", event.target.value)
  };

  if (mode === "add") {
    return (
          <div className="productShowcase-container" id={hasId ? "productShowcase-container-edit" : null}>
              {selectedImage ? (
                <img className="showcase-image" src={selectedImage} alt="Prévisualisation" />
              ) : (
                <div>
                  <div className="showcase-image"></div>
                </div>
              )}
              {model === "Nouveau" ?
                <form action="">
                  <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
                  <label htmlFor="file-input">Charger une image</label>
                  <input className="product-name input" type="text" defaultValue={"Nom du produit"} onChange={handleNameChange}/>
                </form> :
                <div>
                  <form action="">
                    <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
                    <label htmlFor="file-input">Charger une image</label>  
                  </form>
                  <h2 className='product-name'>{model.model_name}</h2>  
                </div>     
              }

              <div className="gradient-overlay"></div>
              <ScrollDownButton
                scrollLength={window.innerHeight + 0.25 * window.innerHeight}
                colorIcon="white"
              />
          </div>
    );
  } else if (mode === "edit") {
      return (
        <div className="productShowcase-container" id={hasId ? "productShowcase-container-edit" : null}>
            {selectedImage ? (
                <img className="showcase-image" src={selectedImage} alt="Prévisualisation" />
              ) : (
                <img className="showcase-image" src={imagePath} alt={modelName + "-MainImage"} />
              )
            }
            <div>
              <form action="">
                <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
                <label htmlFor="file-input">Charger une image</label>  
              </form>
              <h2 className='product-name'>{modelName}</h2>  
            </div>     
            <div className="gradient-overlay"></div>
            <ScrollDownButton
              scrollLength={window.innerHeight + 0.25 * window.innerHeight}
              colorIcon="white"
            />
        </div>
      );
  }


  return (
    <div className='productShowcase-container'>
      <div className="gradient-overlay"></div>
      <img className="showcase-image" src={imagePath} alt={modelName + "-MainImage"} />
      <h2 className='product-name'>{modelName}</h2>
      <ScrollDownButton scrollLength={window.innerHeight+0.04*(window.innerHeight)} colorIcon='white'/>
    </div>
  );
};

export default ProductShowcase;
