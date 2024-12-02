import "../../styles/admin/FirstAdminComponent.css";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";




export default function FirstAdminComponent() {

    const [isClicked1, updateClicked1] = useState(false)

    const handleMenuClick1 = () => {
        updateClicked1(!isClicked1);
    };

    const [isClicked2, updateClicked2] = useState(false)

    const handleMenuClick2 = () => {
        updateClicked2(!isClicked2);
    };

    const handleElementClick = (event) => {
        const allElements = document.querySelectorAll(".element");
        allElements.forEach((el) => el.classList.remove("underline"));
        event.target.classList.add("underline")
    }

  return (
    <div className="first-admin-component">
        <div className="title-menu">
            {isClicked1 ? <FaChevronDown onClick={handleMenuClick1} className="chevron"/> : <FaChevronRight onClick={handleMenuClick1} className="chevron" />}
            <p>Articles</p>
        </div>

        {isClicked1 && 
            <div className="title-menu-child">
                <p className ="element" onClick={handleElementClick}>&#8226; Ajouter un produit</p>
                <p className ="element" onClick={handleElementClick}>&#8226; Modifier un produit</p>
                <p className ="element" onClick={handleElementClick}>&#8226; Supprimer un produit</p>
            </div>
        }

        <div className="title-menu">
            {isClicked2 ? <FaChevronDown onClick={handleMenuClick2} className="chevron"/> : <FaChevronRight onClick={handleMenuClick2} className="chevron" />}
            <p>Utilisateurs</p>
        </div>

        {isClicked2 && 
            <div className="title-menu-child">
                <p className ="element" onClick={handleElementClick}>&#8226; Ajouter un utilisateur</p>
                <p className ="element" onClick={handleElementClick}>&#8226; Modifier un utilisateur</p>
                <p className ="element" onClick={handleElementClick}>&#8226; Supprimer un utilisateur</p>
            </div>
        }
        
    </div>
  )
}
