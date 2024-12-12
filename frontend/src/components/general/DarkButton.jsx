
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";
/* *TODO : remplacer text par children puis enlever le props text pour le mettre dans la balise Link changer le props use en onClick */

export default function DarkButton({text, use, className, destination}){
    return (
        <button className={`dark-button ${className}`} onClick={use}>
            <Link to= {destination}>
                {text}
            </Link>
        </button>
    )
} 