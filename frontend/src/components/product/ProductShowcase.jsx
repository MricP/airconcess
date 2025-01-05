import "../../styles/product/ProductShowcase.css";
import ScrollDownButton from '../general/ScrollDownButton';
import { useState } from "react";
import { uploadImage } from "../../services/product";

const ProductShowcase = ({ imagePath, modelName, mode, model, onInputChange }) => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [hasId, setHasId] = useState(true)

  const handleFileChange = async (event) => {
    const nameInput = document.getElementById("nameProduct");
    const file = event.target.files[0];
    const name = nameInput ? nameInput.value : "test";

    if (file && file.type.startsWith("image/")) {
      try {
        console.log("Fichier sélectionné :", file);
        console.log("Nom du produit :", name);

        const response = await uploadImage(file, name); // Passe le fichier ici
        console.log("Réponse du serveur :", response);

        if (response.success) {
          setSelectedImage(response.filePath); // Utilise le chemin renvoyé par le serveur
          setHasId(false);
        } else {
          alert(response.message || "Erreur lors du téléchargement.");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite lors de l'envoi du fichier.");
      }
    } else {
      alert("Veuillez choisir une image valide.");
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
                  <input id="nameProduct" className="product-name input" type="text" defaultValue={"Nom du produit"} onChange={handleNameChange}/>
                </form> :
                <div>
                  <form action="">
                    <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
                    <label htmlFor="file-input">Charger une image</label>  
                  </form>
                  <h2 id="nameProduct" className='product-name'>{model.model_name}</h2>  
                </div>     
              }

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
