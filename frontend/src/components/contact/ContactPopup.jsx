import React, { useEffect, useState } from "react";
import "../../styles/contact/ContactPopup.css";
import DarkButton from "../general/DarkButton2";
import useRedirect from "../Custom-hooks";

function ContactPopup({ action, closePopup }) {
    const [message, setMessage] = useState("");
    const redirect = useRedirect();

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
                    <div onClick={() => redirect('/privacy')}>Politique de confidentialité</div>
                    <p>{message}</p>
                    <DarkButton use={closePopup} className={"popup-button"} text={"Fermer"} />
                </div>
            </div>
        </>
    );
}

export default ContactPopup;
