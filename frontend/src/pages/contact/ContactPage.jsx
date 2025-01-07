import React, { useState } from "react";
import { submitContact } from "../../services/api";
import GrayInput from "../../components/general/GrayInput";
import GrayTextarea from "../../components/general/GrayTextarea";
import DarkButton2 from "../../components/general/DarkButton2";
import ContactPopup from "../../components/contact/ContactPopup";
import "../../styles/contact/ContactPage.css";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        consent: false,
    });

    const [popupAction, setPopupAction] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.consent) {
            setPopupAction("consentRequired");
            return;
        }

        try {
            submitContact(formData)
            .then((response) => {
                setPopupAction("messageSent");
            })
            .catch((error) => {
                console.error("Erreur:", error.message);
                setPopupAction("error");
            });
            setPopupAction("messageSent");
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire", error);
            setPopupAction("error");
        }
    };

    const closePopup = () => setPopupAction(null);

    const bgContact = "/assets/contact/bg-contact.jpg";
    return (
        <main className={`contact-page-main ${popupAction ? 'popup-open-main' : ''}`} style={{ backgroundImage: `url(${bgContact})` }}>
            {popupAction && <ContactPopup action={popupAction} closePopup={closePopup} />} 
            <div className="contact-container">
                <div className="contact-title-subtitle">
                    <h2>Nous contacter</h2>
                    <p>
                        Si vous avez des problèmes de navigation, de prise de rendez-vous,
                        ou des questions sur un aéronef qui vous intéresse, n'hésitez pas à nous contacter.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="flex-name-email-container">
                        <GrayInput
                            placeholder="Albert DUPOND"
                            value={formData.name}
                            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: "name" } })}
                            required={true}
                        />
                        <GrayInput
                            placeholder="albert.dupond@example.com"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: "email" } })}
                            required={true}
                        />
                    </div>
                    <GrayTextarea
                        placeholder="Laisser votre message ici !"
                        value={formData.message}
                        onChange={(e) => handleChange({ ...e, target: { ...e.target, name: "message" } })}
                        required={true}
                        maxLength={300}
                        rows={8}
                    />
                    <div className="flex-checkbox-max-length-text-area-container">
                        <div className="checkbox-consent">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                required={true}
                            />
                            <label htmlFor="consent">
                                Votre consentement nous importe !
                            </label>
                        </div>
                        <p className="max-length-text-area">
                            {formData.message.length}/300 caractères
                        </p>
                    </div>
                    <DarkButton2
                        text="Envoyer mon message"
                        use={handleSubmit}
                        className="submit-button"
                    />
                </form>
            </div>
        </main>
    );
}

export default ContactPage;
