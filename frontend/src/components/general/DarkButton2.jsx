import "../../styles/general/DarkButton2.css";

export default function DarkButton({text, use, className}){
    return (
        <button className={`dark-button ${className}`} onClick={use}>{text}</button>
    )
} 