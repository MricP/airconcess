
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";

export default function DarkButton({children, className, destination=null, rest}){
    return (
        destination===null ? 
            <button className={`dark-button ${className}`} {...rest}>
                {children}
            </button> :

            <button className={`dark-button ${className}`} {...rest}>
                <Link to={destination}>
                    {children}
                </Link>
            </button>
    )
} 