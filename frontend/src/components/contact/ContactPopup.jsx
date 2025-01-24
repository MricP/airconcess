import React, { useEffect, useState } from "react";
import "../../styles/contact/ContactPopup.css";
import DarkButton from "../general/DarkButton2";

function ContactPopup({ action, closePopup }) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        switch (action) {
            case "consentRequired":
                setMessage("Vous devez cocher la case de consentement.");
                break;
            case "messageSent":
                setMessage("Votre message a bien été envoyé.");
                break;
            case "error":
                setMessage("Une erreur s'est produite. Veuillez réessayer.");
                break;
            default:
                setMessage("");
        }
    }, [action]);

    return (
        <>
            <div className="popup-overlay" onClick={closePopup}></div>
            <div className="popup">
                <div className="popup-content">
                    <p>{message}</p>
                    <DarkButton use={closePopup} className={"popup-button"} text={"Fermer"} />
                </div>
            </div>
        </>
    );
}

export default ContactPopup;
