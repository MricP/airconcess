
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";

export default function DarkButton({children, className, destination=null,...rest}){
    if(destination) {
        return (
            <Link className={`dark-button ${className}`} {...rest} to={destination}>{children}</Link>
        )
    } else {
        return (
            <button className={`dark-button ${className}`} {...rest}>{children}</button>
        )
    }
} 