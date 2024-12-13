
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";
/* *TODO : remplacer text par children puis enlever le props text pour le mettre dans la balise Link changer le props use en onClick */

export default function DarkButton({children, className, destination, ...rest}){
    return (
        <button className={`dark-button ${className}`} {...rest} >
            <Link to= {destination}>
                {children}
            </Link>
        </button>
    )
} 