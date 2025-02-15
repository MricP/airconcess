import React from 'react'

import { TbEdit } from "react-icons/tb";

import InfoPill from '../general/InfoPill';


import "../../styles/sub-training/ValidationStep.css"

function ValidationStep({trainers,formData,setStep}) {
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

    function handleDisplayCardNumber(){
        let initialNumber = formData.cardNumber;
        let displayNumber ="";
        for(let i = 0 ; i<initialNumber.length ; i++) {
            if(i<4 || i>initialNumber.length-3) displayNumber = displayNumber+initialNumber[i]
            else displayNumber = displayNumber+"*"
        }
        return displayNumber;
    }

    function handleDisplayTrainer(){
        let returnedVal = null;
        if(formData.trainer) {
            const trainer = trainers.filter(trainer => trainer.id === formData.trainer.value)[0];
            returnedVal = `${trainer.firstName} ${trainer.lastName}`
        }
        return returnedVal
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
                        <p className="value-container">{formData.country && formData.city ? formData.country.label+", "+formData.city.label+(formData.postalCode ? ", "+formData.postalCode : "") : "Non renseigné"}</p>
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
                        <p className="value-container">{formData.idCard ? formData.idCard.blobFile.name : "Non renseigné"}</p>
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
                        <p>Formateur</p>
                        <p className="value-container">{handleDisplayTrainer()}</p>
                    </section>
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
                    <div>
                        <p>Vos informations de paiement</p>
                        {/* <InfoPill text="Une fois le processus terminé, seul le numéro de carte et le nom du titulaire seront stockés pour votre sécurité. Aucune autre donnée sensible, comme le code PIN ou le code de sécurité, ne sera conservée. Aucun traitement supplémentaire ne sera effectué après ce processys, et aucune donnée personnelle ne sera transmise à des tiers, sauf dans le cadre d'une exigence légale ou réglementaire. En aucun cas, ces informations ne seront utilisées à d'autres fins que celles spécifiées lors de la transaction."/> */}
                    </div>
                    <div className='edit-values' onClick={()=>setStep(2)}>
                        <p>Modifier</p>
                        <TbEdit />
                    </div>
                </div>
                <div className='info-container'>
                    <section className="info-section">
                        <p>Titulaire</p>
                        <p className="value-container">{formData.cardHolder ? formData.cardHolder : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Numéro de carte</p>
                        <p className="value-container">{formData.cardNumber ? handleDisplayCardNumber() : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>Date d'expiration</p>
                        <p className="value-container">{formData.cardExpirationDate ? formData.cardExpirationDate : "Non renseigné"}</p>
                    </section>
                    <section className="info-section">
                        <p>CVV</p>
                        <p className="value-container">{formData.cvv ? formData.cvv : "Non renseigné"}</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ValidationStep