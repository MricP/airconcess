
import {Link} from "react-router-dom";
import "../../styles/general/DarkButton.css";

export default function DarkButton({text, use, className, destination}){
    return (
        <button className={`dark-button ${className}`} onClick={use}>
            <Link to= {destination}>
                {text}
            </Link>
        </button>
    )
} 