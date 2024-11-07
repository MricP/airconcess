import React from 'react'
import '../styles/AppointmentForm.css'

function AppointmentForm() {
    return (
        <div className='appointmentForm-container'>
            <div className='form-container'>
                <h3>FORMULAIRE DE PRISE DE RENDEZ-VOUS</h3>
                <div className='error-message-div'>Veuillez corriger les erreurs ci-dessous !</div>
                <form action="">
                    <fieldset className='reason-fieldset' ><legend>Cause du rendez-vous</legend>
                        <label htmlFor="">Motif du rendez-vous*
                            <input type="text"/>
                        </label>
                        <div>
                            <label htmlFor="">Modèle de l'appareil*
                                <input type="text" />
                            </label>
                            <label htmlFor="">Numéro de série*
                                <input type="text" />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className='info-fieldset' ><legend>Vos informations</legend>
                        <label htmlFor="">Nom*
                            <input type="text"/>
                        </label>
                        <label htmlFor="">Prénom*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Numéro de téléphone*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Pays*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Ville*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Code postal*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Carte d'identité*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Justificatif de revenu*
                            <input type="text" />
                        </label>
                    </fieldset>
                    <fieldset className='rdv-fieldset' ><legend>Programmer mon rendez-vous</legend>
                        <label htmlFor="">Date*
                            <input type="text"/>
                        </label>
                        <label htmlFor="">Heure*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Lieu*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Adresse*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Pays*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Ville*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Code postal*
                            <input type="text" />
                        </label>
                        <label htmlFor="">Justificatif de revenu*
                            <input type="text" />
                        </label>
                    </fieldset>
                    <button className='submit' type="submit">Valider mon rendez-vous</button>
                </form>
            </div>
        </div>
        
    )
}

export default AppointmentForm