import "../../styles/admin/FirstAdminComponent.css";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";




export default function FirstAdminComponent() {

    const [isClicked, updateClicked] = useState(false)

    const handleMenuClick = () => {
        updateClicked(!isClicked);
    };

  return (
    <div className="first-admin-component">
        <div className="title-menu">
            {isClicked ? <FaChevronDown onClick={handleMenuClick} className="chevron"/> : <FaChevronRight onClick={handleMenuClick} className="chevron" />}
            <p>Articles</p>
        </div>

        {isClicked && 
            <div className="title-menu-child">
                <p>&#8226; Ajouter un produit</p>
                <p>&#8226; Modifier un produit</p>
                <p>&#8226; Supprimer un produit</p>
            </div>
        }
        
    </div>
  )
}
