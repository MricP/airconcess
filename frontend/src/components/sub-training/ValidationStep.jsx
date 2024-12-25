import React from 'react'

import { TbEdit } from "react-icons/tb";


import "../../styles/sub-training/ValidationStep.css"

function ValidationStep({formData,setStep}) {
    function handleDisplayPrefSlots() {
        //Map impossible car prefSlots est un object (à cause du système d'ID)
        let slots = [];
        for (let key in formData.prefSlots) {
            let hStart = formData.prefSlots[key].hourStart.split(":");
            let hEnd = formData.prefSlots[key].hourEnd.split(":");
            slots.push(<p key={key}>{"De " + hStart[0] + "h" + hStart[1] + " à " + hEnd[0] + "h" + hEnd[1]}</p>);
        }
        return slots;
    }
    
    return (
        <div className='validation-step-container'>
            <div>
                <div>
                    <p>Vos informations client</p>
                    <div className='edit-values' onClick={()=>setStep(0)}>
                        <p>Modifier</p>
                        <TbEdit />
                    </div>
                </div>
                <div className='info-container'>
                    <section className="info-section">
                        <p>Identité</p>
                        <p className="value-container">{formData.firstName && formData.lastName ? formData.firstName+" "+formData.lastName : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Lieu de résidence</p>
                        <p className="value-container">{formData.country && formData.city ? formData.country+", "+formData.city+(formData.postalCode ? ", "+formData.postalCode : "") : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Adresse</p>
                        <p className="value-container">{formData.address ? formData.address : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Adresse mail</p>
                        <p className="value-container">{formData.email ? formData.email : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Numéro de téléphone</p>
                        <p className="value-container">{formData.phone ? formData.phone : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Piece d'identité</p>
                        <p className="value-container">{formData.idCard != null ? formData.idCard[0].name : "Non renseigné"}</p>
                    </section>
                </div>
            </div>
            <div>
                <div>
                    <p>Vos préférences et disponibilités</p>
                    <div className='edit-values' onClick={()=>setStep(1)}>
                        <p>Modifier</p>
                        <TbEdit />
                    </div>
                </div>
                <div className='info-container'>
                    <section className="info-section">
                        <p>Disponibilité</p>
                        <p className="value-container">{formData.dateStart && formData.dateEnd ? "Du "+new Date(formData.dateStart).toLocaleDateString()+" au "+new Date(formData.dateEnd).toLocaleDateString() : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Plages horaires préferentielles</p>
                        {formData.prefSlots ? 
                            <div className="value-container">{handleDisplayPrefSlots()}</div> :
                            <p className="value-container">Non renseigné</p>
                        }
                    </section>
                    <section className="info-section">
                        <p>Fréquence de formation</p>
                        <p className="value-container">{formData.prefFrequency ? formData.prefFrequency+" séance(s) par semaine" : "Non renseigné"}</p>
                    </section>
                </div>
            </div>
            <div>
                <div>
                    <p>Vos informations de paiement</p>
                    <div className='edit-values' onClick={()=>setStep(2)}>
                        <p>Modifier</p>
                        <TbEdit />
                    </div>
                </div>
                <div className='info-container'>
                    <section className="info-section">
                        <p>Titulaire</p>
                        <p className="value-container">{formData.address ? formData.address : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Numéro de carte</p>
                        <p className="value-container">{formData.address ? formData.address : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Date d'expiration</p>
                        <p className="value-container">{formData.address ? formData.address : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>CCV</p>
                        <p className="value-container">{formData.address ? formData.address : "Non renseigné"}</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ValidationStep