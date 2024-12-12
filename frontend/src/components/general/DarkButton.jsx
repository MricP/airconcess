
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";

export default function DarkButton({children, className, destination, ...rest}){
    return (
        <button className={`dark-button ${className}`} {...rest}>
            <Link to={destination}>
                {children}
            </Link>
        </button>
    )
} 