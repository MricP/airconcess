
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";
/* *TODO : remplacer text par children puis enlever le props text pour le mettre dans la balise Link changer le props use en onClick */

export default function DarkButton({children, className, destination=null,...rest}){
    if(destination) {
        return (
            <Link className={`dark-button ${className}`} {...rest} onClick={() => window.scrollTo({top:0,behavior:'smooth'})} to={destination}>{children}</Link>
        )
    } else {
        return (
            <button className={`dark-button ${className}`} {...rest}>{children}</button>
        )
    }
} 